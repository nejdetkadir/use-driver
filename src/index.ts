import { useState, useEffect } from "react";
import { driver } from "driver.js";
import type {
  Config,
  DriveStep as DriveStepType,
  Driver as DriverType,
} from "driver.js";

type UseDriverStepType = DriveStepType & { order?: number };

export const useDriver = (defaultConfig?: Config) => {
  const [currentDriver, setCurrentDriver] = useState<DriverType | null>(null);
  const [steps, setSteps] = useState<UseDriverStepType[]>([]);

  useEffect(() => {
    if (currentDriver) {
      currentDriver.refresh();
    } else {
      setCurrentDriver(driver());
    }

    currentDriver?.setConfig(defaultConfig || {});

    return () => {
      if (currentDriver) {
        currentDriver.destroy();
        setCurrentDriver(null);
      }
    };
  }, [driver, defaultConfig]);

  const drive = () => {
    if (currentDriver) {
      currentDriver.setSteps(
        steps.sort(
          (a: UseDriverStepType, b: UseDriverStepType) => a.order! - b.order!
        )
      );
      currentDriver.drive();
    } else {
      console.warn("Driver was not initialized");
    }
  };

  function addStep(step: UseDriverStepType) {
    if (steps.find((s: UseDriverStepType) => s.element === step.element)) {
      return;
    }

    setSteps([...steps, step]);
  }

  const register = (step: UseDriverStepType) => {
    return {
      ref: (element: HTMLElement | null) => {
        if (element) {
          step.element = element;
          addStep(step);
        }
      },
    };
  };

  return {
    register,
    ...{
      isActive: () => currentDriver?.isActive(),
      drive,
      reset: () => currentDriver?.destroy(),
      refresh: () => currentDriver?.refresh(),
      getConfig: () => currentDriver?.getConfig(),
      getState: () => currentDriver?.getState(),
      setConfig: (config: Config) => currentDriver?.setConfig(config),
      setSteps: (steps: DriveStepType[]) => currentDriver?.setSteps(steps),
      getActiveIndex: () => currentDriver?.getActiveIndex(),
      isFirstStep: () => currentDriver?.isFirstStep(),
      isLastStep: () => currentDriver?.isLastStep(),
      getActiveStep: () => currentDriver?.getActiveStep(),
      getActiveElement: () => currentDriver?.getActiveElement(),
      getPreviousElement: () => currentDriver?.getPreviousElement(),
      getPreviousStep: () => currentDriver?.getPreviousStep(),
      moveNext: () => currentDriver?.moveNext(),
      movePrevious: () => currentDriver?.movePrevious(),
      moveTo: (index: number) => currentDriver?.moveTo(index),
      hasNextStep: () => currentDriver?.hasNextStep(),
      hasPreviousStep: () => currentDriver?.hasPreviousStep(),
      highlight: (step: DriveStepType) => currentDriver?.highlight(step),
      destroy: () => currentDriver?.destroy(),
    },
  };
};
