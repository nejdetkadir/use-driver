"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => useDriver
});
module.exports = __toCommonJS(src_exports);
var import_react = require("react");
var import_driver = require("driver.js");
function useDriver(defaultConfig) {
  const [currentDriver, setCurrentDriver] = (0, import_react.useState)(null);
  const [steps, setSteps] = (0, import_react.useState)([]);
  (0, import_react.useEffect)(() => {
    if (currentDriver) {
      currentDriver.refresh();
    } else {
      setCurrentDriver((0, import_driver.driver)());
    }
    currentDriver == null ? void 0 : currentDriver.setConfig(defaultConfig || {});
    return () => {
      if (currentDriver) {
        currentDriver.destroy();
        setCurrentDriver(null);
      }
    };
  }, [import_driver.driver, defaultConfig]);
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
