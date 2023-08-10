import * as driver_js from 'driver.js';
import { Config, DriveStep } from 'driver.js';

type UseDriverStepType = DriveStep & {
    order?: number;
};
declare function useDriver(defaultConfig?: Config): {
    isActive: () => boolean | undefined;
    reset: () => void | undefined;
    refresh: () => void | undefined;
    getConfig: () => Config | undefined;
    getState: () => driver_js.State | undefined;
    setConfig: (config: Config) => void | undefined;
    setSteps: (steps: DriveStep[]) => void | undefined;
    getActiveIndex: () => number | undefined;
    isFirstStep: () => boolean | undefined;
    isLastStep: () => boolean | undefined;
    getActiveStep: () => DriveStep | undefined;
    getActiveElement: () => Element | undefined;
    getPreviousElement: () => Element | undefined;
    getPreviousStep: () => DriveStep | undefined;
    moveNext: () => void | undefined;
    movePrevious: () => void | undefined;
    moveTo: (index: number) => void | undefined;
    hasNextStep: () => false | DriveStep | undefined;
    hasPreviousStep: () => false | DriveStep | undefined;
    highlight: (step: DriveStep) => void | undefined;
    destroy: () => void | undefined;
    register: (step: UseDriverStepType) => {
        ref: (element: HTMLElement | null) => void;
    };
    drive: () => void;
};

export { useDriver as default };
