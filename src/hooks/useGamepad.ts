import { useEffect, useCallback, useRef } from 'react';

export type GamepadButton = 
  | 'a' | 'b' | 'x' | 'y'
  | 'up' | 'down' | 'left' | 'right'
  | 'start' | 'back'
  | 'lb' | 'rb' | 'lt' | 'rt';

interface GamepadState {
  buttons: Record<GamepadButton, boolean>;
  leftStick: { x: number; y: number };
  rightStick: { x: number; y: number };
}

interface UseGamepadOptions {
  onButtonPress?: (button: GamepadButton) => void;
  onNavigate?: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  enabled?: boolean;
  repeatDelay?: number; // ms before repeating navigation
  repeatRate?: number;  // ms between repeats
}

const BUTTON_MAP: Record<number, GamepadButton> = {
  0: 'a',      // A / Cross
  1: 'b',      // B / Circle
  2: 'x',      // X / Square
  3: 'y',      // Y / Triangle
  4: 'lb',     // Left Bumper
  5: 'rb',     // Right Bumper
  6: 'lt',     // Left Trigger
  7: 'rt',     // Right Trigger
  8: 'back',   // Back / Select
  9: 'start',  // Start
  12: 'up',    // D-Pad Up
  13: 'down',  // D-Pad Down
  14: 'left',  // D-Pad Left
  15: 'right', // D-Pad Right
};

const STICK_THRESHOLD = 0.5;
const DEFAULT_REPEAT_DELAY = 400;
const DEFAULT_REPEAT_RATE = 150;

export function useGamepad({
  onButtonPress,
  onNavigate,
  onConfirm,
  onCancel,
  enabled = true,
  repeatDelay = DEFAULT_REPEAT_DELAY,
  repeatRate = DEFAULT_REPEAT_RATE,
}: UseGamepadOptions = {}) {
  const prevState = useRef<GamepadState | null>(null);
  const repeatTimers = useRef<Record<string, NodeJS.Timeout>>({});
  const lastNavigateTime = useRef<Record<string, number>>({});
  const isFirstPress = useRef<Record<string, boolean>>({});
  const frameRef = useRef<number>();

  const getGamepadState = useCallback((): GamepadState | null => {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0] || gamepads[1] || gamepads[2] || gamepads[3];
    
    if (!gamepad) return null;

    const buttons: Record<GamepadButton, boolean> = {
      a: false, b: false, x: false, y: false,
      up: false, down: false, left: false, right: false,
      start: false, back: false,
      lb: false, rb: false, lt: false, rt: false,
    };

    // Map buttons
    gamepad.buttons.forEach((button, index) => {
      const mappedButton = BUTTON_MAP[index];
      if (mappedButton) {
        buttons[mappedButton] = button.pressed;
      }
    });

    // Get stick values
    const leftStick = {
      x: gamepad.axes[0] || 0,
      y: gamepad.axes[1] || 0,
    };
    const rightStick = {
      x: gamepad.axes[2] || 0,
      y: gamepad.axes[3] || 0,
    };

    // Map left stick to directions
    if (leftStick.y < -STICK_THRESHOLD) buttons.up = true;
    if (leftStick.y > STICK_THRESHOLD) buttons.down = true;
    if (leftStick.x < -STICK_THRESHOLD) buttons.left = true;
    if (leftStick.x > STICK_THRESHOLD) buttons.right = true;

    return { buttons, leftStick, rightStick };
  }, []);

  const handleNavigation = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    const now = Date.now();
    const lastTime = lastNavigateTime.current[direction] || 0;
    const isFirst = isFirstPress.current[direction];
    
    const delay = isFirst ? repeatDelay : repeatRate;
    
    if (now - lastTime >= delay) {
      onNavigate?.(direction);
      lastNavigateTime.current[direction] = now;
      isFirstPress.current[direction] = false;
    }
  }, [onNavigate, repeatDelay, repeatRate]);

  const pollGamepad = useCallback(() => {
    if (!enabled) {
      frameRef.current = requestAnimationFrame(pollGamepad);
      return;
    }

    const state = getGamepadState();
    
    if (state) {
      const prev = prevState.current;

      // Check for button presses (rising edge)
      if (prev) {
        // A button - Confirm
        if (state.buttons.a && !prev.buttons.a) {
          onButtonPress?.('a');
          onConfirm?.();
        }
        
        // B button - Cancel
        if (state.buttons.b && !prev.buttons.b) {
          onButtonPress?.('b');
          onCancel?.();
        }

        // Other buttons
        (['x', 'y', 'start', 'back', 'lb', 'rb', 'lt', 'rt'] as GamepadButton[]).forEach(btn => {
          if (state.buttons[btn] && !prev.buttons[btn]) {
            onButtonPress?.(btn);
          }
        });

        // Navigation with repeat
        const directions: ('up' | 'down' | 'left' | 'right')[] = ['up', 'down', 'left', 'right'];
        directions.forEach(dir => {
          if (state.buttons[dir]) {
            if (!prev.buttons[dir]) {
              // First press
              isFirstPress.current[dir] = true;
              lastNavigateTime.current[dir] = 0;
            }
            handleNavigation(dir);
          } else {
            // Released
            isFirstPress.current[dir] = true;
          }
        });
      }

      prevState.current = state;
    }

    frameRef.current = requestAnimationFrame(pollGamepad);
  }, [enabled, getGamepadState, onButtonPress, onConfirm, onCancel, handleNavigation]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(pollGamepad);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      Object.values(repeatTimers.current).forEach(clearTimeout);
    };
  }, [pollGamepad]);

  // Also support keyboard for testing (WASD + Enter + Escape)
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          onNavigate?.('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          onNavigate?.('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          onNavigate?.('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          onNavigate?.('right');
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onConfirm?.();
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          onCancel?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onNavigate, onConfirm, onCancel]);

  return {
    getGamepadState,
    isGamepadConnected: () => {
      const gamepads = navigator.getGamepads();
      return !!(gamepads[0] || gamepads[1] || gamepads[2] || gamepads[3]);
    },
  };
}



