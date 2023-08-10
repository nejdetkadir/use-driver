var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/index.ts
import { useState, useEffect } from "react";
import { driver } from "driver.js";
function useDriver(defaultConfig) {
  const [currentDriver, setCurrentDriver] = useState(null);
  const [steps, setSteps] = useState([]);
  useEffect(() => {
    if (currentDriver) {
      currentDriver.refresh();
    } else {
      setCurrentDriver(driver());
    }
    currentDriver == null ? void 0 : currentDriver.setConfig(defaultConfig || {});
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
          (a, b) => a.order - b.order
        )
      );
      currentDriver.drive();
    }
  };
  function addStep(step) {
    if (steps.find((s) => s.element === step.element)) {
      return;
    }
    setSteps([...steps, step]);
  }
  const register = (step) => {
    return {
      ref: (element) => {
        if (element) {
          step.element = element;
          addStep(step);
        }
      }
    };
  };
  return __spreadValues({
    register,
    drive
  }, {
    isActive: () => currentDriver == null ? void 0 : currentDriver.isActive(),
    reset: () => currentDriver == null ? void 0 : currentDriver.destroy(),
    refresh: () => currentDriver == null ? void 0 : currentDriver.refresh(),
    getConfig: () => currentDriver == null ? void 0 : currentDriver.getConfig(),
    getState: () => currentDriver == null ? void 0 : currentDriver.getState(),
    setConfig: (config) => currentDriver == null ? void 0 : currentDriver.setConfig(config),
    setSteps: (steps2) => currentDriver == null ? void 0 : currentDriver.setSteps(steps2),
    getActiveIndex: () => currentDriver == null ? void 0 : currentDriver.getActiveIndex(),
    isFirstStep: () => currentDriver == null ? void 0 : currentDriver.isFirstStep(),
    isLastStep: () => currentDriver == null ? void 0 : currentDriver.isLastStep(),
    getActiveStep: () => currentDriver == null ? void 0 : currentDriver.getActiveStep(),
    getActiveElement: () => currentDriver == null ? void 0 : currentDriver.getActiveElement(),
    getPreviousElement: () => currentDriver == null ? void 0 : currentDriver.getPreviousElement(),
    getPreviousStep: () => currentDriver == null ? void 0 : currentDriver.getPreviousStep(),
    moveNext: () => currentDriver == null ? void 0 : currentDriver.moveNext(),
    movePrevious: () => currentDriver == null ? void 0 : currentDriver.movePrevious(),
    moveTo: (index) => currentDriver == null ? void 0 : currentDriver.moveTo(index),
    hasNextStep: () => currentDriver == null ? void 0 : currentDriver.hasNextStep(),
    hasPreviousStep: () => currentDriver == null ? void 0 : currentDriver.hasPreviousStep(),
    highlight: (step) => currentDriver == null ? void 0 : currentDriver.highlight(step),
    destroy: () => currentDriver == null ? void 0 : currentDriver.destroy()
  });
}
export {
  useDriver as default
};
