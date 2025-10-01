import "./chunk-NDCU4QXK.js";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "./chunk-Y7DE4VZV.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-EWCK6T2S.js";
import "./chunk-G6LDYIDB.js";
import {
  PrimeTemplate,
  SharedModule,
  UniqueComponentId
} from "./chunk-YP3ZOBBB.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewEncapsulation,
  setClassMetadata,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction4,
  ɵɵpureFunction6,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-ULPXJIQO.js";
import "./chunk-P6U2JBMQ.js";
import "./chunk-35ENWJA4.js";

// node_modules/primeng/fesm2022/primeng-stepper.mjs
var _c0 = (a0, a1, a2, a3) => ({
  index: a0,
  active: a1,
  highlighted: a2,
  class: "p-stepper-action",
  headerClass: "p-stepper-action",
  numberClass: "p-stepper-number",
  titleClass: "p-stepper-title",
  onClick: a3
});
function StepperHeader_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function StepperHeader_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, StepperHeader_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 2);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", ɵɵpureFunction4(2, _c0, ctx_r0.index, ctx_r0.active, ctx_r0.highlighted, ctx_r0.onClick));
  }
}
function StepperHeader_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-button", 3);
    ɵɵlistener("click", function StepperHeader_ng_template_1_Template_p_button_click_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.onClick.emit($event, ctx_r0.index));
    });
    ɵɵelementStart(1, "span", 4);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementStart(3, "span", 5);
    ɵɵtext(4);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("id", ctx_r0.id)("tabindex", ctx_r0.disabled ? -1 : void 0)("aria-controls", ctx_r0.ariaControls);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.index + 1);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.getStepProp);
  }
}
var _c1 = (a0, a1, a2, a3) => ({
  index: a0,
  active: a1,
  highlighted: a2,
  class: a3
});
function StepperSeparator_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function StepperSeparator_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, StepperSeparator_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 2);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", ɵɵpureFunction4(2, _c1, ctx_r0.index, ctx_r0.active, ctx_r0.highlighted, ctx_r0.separatorClass));
  }
}
function StepperSeparator_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 3);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ctx_r0.separatorClass);
  }
}
var _c2 = (a0, a1, a2, a3, a4, a5) => ({
  index: a0,
  active: a1,
  highlighted: a2,
  onClick: a3,
  prevCallback: a4,
  nextCallback: a5
});
function StepperContent_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function StepperContent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, StepperContent_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 2);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.template)("ngTemplateOutletContext", ɵɵpureFunction6(2, _c2, ctx_r0.index, ctx_r0.active, ctx_r0.highlighted, ctx_r0.onClick, ctx_r0.prevCallback, ctx_r0.nextCallback));
  }
}
function StepperContent_2_ng_template_0_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function StepperContent_2_ng_template_0_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, StepperContent_2_ng_template_0_ng_container_0_ng_container_1_Template, 1, 0, "ng-container", 3);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.stepperPanel);
  }
}
function StepperContent_2_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, StepperContent_2_ng_template_0_ng_container_0_Template, 2, 1, "ng-container", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngIf", ctx_r0.stepperPanel);
  }
}
function StepperContent_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, StepperContent_2_ng_template_0_Template, 1, 1, "ng-template");
  }
}
var _c3 = ["*"];
var _c4 = (a0, a1) => ({
  "p-highlight": a0,
  "p-disabled": a1
});
var _c5 = (a0) => ({
  "p-stepper-panel-active": a0
});
var _c6 = (a0) => ({
  transitionParams: a0
});
var _c7 = (a0) => ({
  value: "visible",
  params: a0
});
var _c8 = (a0) => ({
  value: "hidden",
  params: a0
});
function Stepper_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Stepper_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Stepper_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 4);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.startTemplate);
  }
}
function Stepper_ng_container_2_ng_template_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "p-stepperSeparator", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    const step_r5 = ctx_r3.$implicit;
    const index_r3 = ctx_r3.index;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("template", step_r5.separatorTemplate)("separatorClass", "p-stepper-separator")("stepperPanel", step_r5)("index", index_r3)("active", ctx_r0.isStepActive(index_r3))("highlighted", index_r3 < ctx_r0.activeStep);
  }
}
function Stepper_ng_container_2_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 8)(1, "p-stepperHeader", 9);
    ɵɵlistener("onClick", function Stepper_ng_container_2_ng_template_2_Template_p_stepperHeader_onClick_1_listener($event) {
      const index_r3 = ɵɵrestoreView(_r2).index;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onItemClick($event, index_r3));
    });
    ɵɵelementEnd();
    ɵɵtemplate(2, Stepper_ng_container_2_ng_template_2_ng_container_2_Template, 2, 6, "ng-container", 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const step_r5 = ctx.$implicit;
    const index_r3 = ctx.index;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("key", ctx_r0.getStepKey(step_r5, index_r3))("ngClass", ɵɵpureFunction2(20, _c4, ctx_r0.isStepActive(index_r3), ctx_r0.isItemDisabled(index_r3)))("data-pc-name", ctx_r0.stepperPanel)("data-p-highlight", ctx_r0.isStepActive(index_r3))("data-p-disabled", ctx_r0.isItemDisabled(index_r3))("data-pc-index", index_r3)("data-p-active", ctx_r0.isStepActive(index_r3));
    ɵɵattribute("aria-current", ctx_r0.isStepActive(index_r3) ? "step" : void 0);
    ɵɵadvance();
    ɵɵclassMap("p-stepper-action");
    ɵɵproperty("id", ctx_r0.getStepHeaderActionId(index_r3))("template", step_r5.headerTemplate)("stepperPanel", step_r5)("getStepProp", ctx_r0.getStepProp(step_r5, "header"))("index", index_r3)("disabled", ctx_r0.isItemDisabled(index_r3))("active", ctx_r0.isStepActive(index_r3))("highlighted", index_r3 < ctx_r0.activeStep)("aria-controls", ctx_r0.getStepContentId(index_r3));
    ɵɵadvance();
    ɵɵproperty("ngIf", index_r3 !== ctx_r0.stepperPanels.length - 1);
  }
}
function Stepper_ng_container_2_ng_template_4_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "p-stepperContent", 11);
    ɵɵlistener("onClick", function Stepper_ng_container_2_ng_template_4_ng_container_0_Template_p_stepperContent_onClick_1_listener($event) {
      ɵɵrestoreView(_r6);
      const index_r7 = ɵɵnextContext().index;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onItemClick($event, index_r7));
    })("nextCallback", function Stepper_ng_container_2_ng_template_4_ng_container_0_Template_p_stepperContent_nextCallback_1_listener($event) {
      ɵɵrestoreView(_r6);
      const index_r7 = ɵɵnextContext().index;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.nextCallback($event, index_r7));
    })("prevCallback", function Stepper_ng_container_2_ng_template_4_ng_container_0_Template_p_stepperContent_prevCallback_1_listener($event) {
      ɵɵrestoreView(_r6);
      const index_r7 = ɵɵnextContext().index;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.prevCallback($event, index_r7));
    });
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r7 = ɵɵnextContext();
    const step_r9 = ctx_r7.$implicit;
    const index_r7 = ctx_r7.index;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("id", ctx_r0.getStepContentId(index_r7))("template", step_r9.contentTemplate)("orientation", ctx_r0.orientation)("stepperPanel", step_r9)("index", index_r7)("active", ctx_r0.isStepActive(index_r7))("highlighted", index_r7 < ctx_r0.activeStep)("ariaLabelledby", ctx_r0.getStepHeaderActionId(index_r7));
  }
}
function Stepper_ng_container_2_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Stepper_ng_container_2_ng_template_4_ng_container_0_Template, 2, 8, "ng-container", 2);
  }
  if (rf & 2) {
    const index_r7 = ctx.index;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngIf", ctx_r0.isStepActive(index_r7));
  }
}
function Stepper_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "ul", 5);
    ɵɵtemplate(2, Stepper_ng_container_2_ng_template_2_Template, 3, 23, "ng-template", 6);
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 7);
    ɵɵtemplate(4, Stepper_ng_container_2_ng_template_4_Template, 1, 1, "ng-template", 6);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r0.panels)("ngForTrackBy", ctx_r0.trackByFn);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r0.panels)("ngForTrackBy", ctx_r0.trackByFn);
  }
}
function Stepper_ng_template_3_ng_template_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "p-stepperSeparator", 10);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r11 = ɵɵnextContext();
    const step_r13 = ctx_r11.$implicit;
    const index_r11 = ctx_r11.index;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("template", step_r13.separatorTemplate)("separatorClass", "p-stepper-separator")("stepperPanel", step_r13)("index", index_r11)("active", ctx_r0.isStepActive(index_r11))("highlighted", index_r11 < ctx_r0.activeStep);
  }
}
function Stepper_ng_template_3_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 12)(1, "div", 13)(2, "p-stepperHeader", 9);
    ɵɵlistener("onClick", function Stepper_ng_template_3_ng_template_0_Template_p_stepperHeader_onClick_2_listener($event) {
      const index_r11 = ɵɵrestoreView(_r10).index;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onItemClick($event, index_r11));
    });
    ɵɵelementEnd()();
    ɵɵelementStart(3, "div", 14);
    ɵɵtemplate(4, Stepper_ng_template_3_ng_template_0_ng_container_4_Template, 2, 6, "ng-container", 2);
    ɵɵelementStart(5, "p-stepperContent", 11);
    ɵɵlistener("onClick", function Stepper_ng_template_3_ng_template_0_Template_p_stepperContent_onClick_5_listener($event) {
      const index_r11 = ɵɵrestoreView(_r10).index;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onItemClick($event, index_r11));
    })("nextCallback", function Stepper_ng_template_3_ng_template_0_Template_p_stepperContent_nextCallback_5_listener($event) {
      const index_r11 = ɵɵrestoreView(_r10).index;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.nextCallback($event, index_r11));
    })("prevCallback", function Stepper_ng_template_3_ng_template_0_Template_p_stepperContent_prevCallback_5_listener($event) {
      const index_r11 = ɵɵrestoreView(_r10).index;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.prevCallback($event, index_r11));
    });
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const step_r13 = ctx.$implicit;
    const index_r11 = ctx.index;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("key", ctx_r0.getStepKey(step_r13, index_r11))("ngClass", ɵɵpureFunction1(30, _c5, ctx_r0.orientation === "vertical" && ctx_r0.isStepActive(index_r11)))("data-pc-name", "stepperpanel")("data-p-highlight", ctx_r0.isStepActive(index_r11))("data-p-disabled", ctx_r0.isItemDisabled(index_r11))("data-pc-index", index_r11)("data-p-active", ctx_r0.isStepActive(index_r11));
    ɵɵattribute("aria-current", ctx_r0.isStepActive(index_r11) ? "step" : void 0);
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction2(32, _c4, ctx_r0.isStepActive(index_r11), ctx_r0.isItemDisabled(index_r11)));
    ɵɵadvance();
    ɵɵclassMap("p-stepper-action");
    ɵɵproperty("id", ctx_r0.getStepHeaderActionId(index_r11))("template", step_r13.headerTemplate)("stepperPanel", step_r13)("getStepProp", ctx_r0.getStepProp(step_r13, "header"))("index", index_r11)("disabled", ctx_r0.isItemDisabled(index_r11))("active", ctx_r0.isStepActive(index_r11))("highlighted", index_r11 < ctx_r0.activeStep)("aria-controls", ctx_r0.getStepContentId(index_r11));
    ɵɵadvance();
    ɵɵproperty("@tabContent", ctx_r0.isStepActive(index_r11) ? ɵɵpureFunction1(37, _c7, ɵɵpureFunction1(35, _c6, ctx_r0.transitionOptions)) : ɵɵpureFunction1(41, _c8, ɵɵpureFunction1(39, _c6, ctx_r0.transitionOptions)));
    ɵɵadvance();
    ɵɵproperty("ngIf", index_r11 !== ctx_r0.stepperPanels.length - 1);
    ɵɵadvance();
    ɵɵproperty("id", ctx_r0.getStepContentId(index_r11))("template", step_r13.contentTemplate)("orientation", ctx_r0.orientation)("stepperPanel", step_r13)("index", index_r11)("active", ctx_r0.isStepActive(index_r11))("highlighted", index_r11 < ctx_r0.activeStep)("ariaLabelledby", ctx_r0.getStepHeaderActionId(index_r11));
  }
}
function Stepper_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Stepper_ng_template_3_ng_template_0_Template, 6, 43, "ng-template", 6);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngForOf", ctx_r0.panels)("ngForTrackBy", ctx_r0.trackByFn);
  }
}
function Stepper_ng_container_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function Stepper_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Stepper_ng_container_5_ng_container_1_Template, 1, 0, "ng-container", 4);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.endTemplate);
  }
}
var StepperHeader = class _StepperHeader {
  id;
  template;
  stepperPanel;
  index;
  disabled;
  active;
  highlighted;
  getStepProp;
  ariaControls;
  onClick = new EventEmitter();
  static ɵfac = function StepperHeader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StepperHeader)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _StepperHeader,
    selectors: [["p-stepperHeader"]],
    hostAttrs: [1, "p-element"],
    inputs: {
      id: "id",
      template: "template",
      stepperPanel: "stepperPanel",
      index: "index",
      disabled: "disabled",
      active: "active",
      highlighted: "highlighted",
      getStepProp: "getStepProp",
      ariaControls: "ariaControls"
    },
    outputs: {
      onClick: "onClick"
    },
    standalone: false,
    decls: 3,
    vars: 2,
    consts: [["buttonRef", ""], [4, "ngIf", "ngIfElse"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["role", "tab", 1, "p-stepper-action", 3, "click", "id", "tabindex", "aria-controls"], [1, "p-stepper-number"], [1, "p-stepper-title"]],
    template: function StepperHeader_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, StepperHeader_ng_container_0_Template, 2, 7, "ng-container", 1)(1, StepperHeader_ng_template_1_Template, 5, 5, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      }
      if (rf & 2) {
        const buttonRef_r3 = ɵɵreference(2);
        ɵɵproperty("ngIf", ctx.template)("ngIfElse", buttonRef_r3);
      }
    },
    dependencies: [NgIf, NgTemplateOutlet],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperHeader, [{
    type: Component,
    args: [{
      selector: "p-stepperHeader",
      template: `
        <ng-container *ngIf="template; else buttonRef">
            <ng-container
                *ngTemplateOutlet="
                    template;
                    context: {
                        index: index,
                        active: active,
                        highlighted: highlighted,
                        class: 'p-stepper-action',
                        headerClass: 'p-stepper-action',
                        numberClass: 'p-stepper-number',
                        titleClass: 'p-stepper-title',
                        onClick: onClick
                    }
                "
            ></ng-container>
        </ng-container>
        <ng-template #buttonRef>
            <p-button [id]="id" class="p-stepper-action" role="tab" [tabindex]="disabled ? -1 : undefined" [aria-controls]="ariaControls" (click)="onClick.emit($event, index)">
                <span class="p-stepper-number">{{ index + 1 }}</span>
                <span class="p-stepper-title">{{ getStepProp }}</span>
            </p-button>
        </ng-template>
    `,
      host: {
        class: "p-element"
      }
    }]
  }], null, {
    id: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    stepperPanel: [{
      type: Input
    }],
    index: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    active: [{
      type: Input
    }],
    highlighted: [{
      type: Input
    }],
    getStepProp: [{
      type: Input
    }],
    ariaControls: [{
      type: Input
    }],
    onClick: [{
      type: Output
    }]
  });
})();
var StepperSeparator = class _StepperSeparator {
  template;
  separatorClass;
  stepperPanel;
  index;
  active;
  highlighted;
  static ɵfac = function StepperSeparator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StepperSeparator)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _StepperSeparator,
    selectors: [["p-stepperSeparator"]],
    hostAttrs: [1, "p-stepper-separator"],
    inputs: {
      template: "template",
      separatorClass: "separatorClass",
      stepperPanel: "stepperPanel",
      index: "index",
      active: "active",
      highlighted: "highlighted"
    },
    standalone: false,
    decls: 3,
    vars: 2,
    consts: [["span", ""], [4, "ngIf", "ngIfElse"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["aria-hidden", "true"]],
    template: function StepperSeparator_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵtemplate(0, StepperSeparator_ng_container_0_Template, 2, 7, "ng-container", 1)(1, StepperSeparator_ng_template_1_Template, 1, 2, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      }
      if (rf & 2) {
        const span_r2 = ɵɵreference(2);
        ɵɵproperty("ngIf", ctx.template)("ngIfElse", span_r2);
      }
    },
    dependencies: [NgIf, NgTemplateOutlet],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperSeparator, [{
    type: Component,
    args: [{
      selector: "p-stepperSeparator",
      template: `
        <ng-container *ngIf="template; else span">
            <ng-container *ngTemplateOutlet="template; context: { index: index, active: active, highlighted: highlighted, class: separatorClass }"></ng-container>
        </ng-container>
        <ng-template #span>
            <span [class]="separatorClass" aria-hidden="true"></span>
        </ng-template>
    `,
      host: {
        class: "p-stepper-separator"
      }
    }]
  }], null, {
    template: [{
      type: Input
    }],
    separatorClass: [{
      type: Input
    }],
    stepperPanel: [{
      type: Input
    }],
    index: [{
      type: Input
    }],
    active: [{
      type: Input
    }],
    highlighted: [{
      type: Input
    }]
  });
})();
var StepperContent = class _StepperContent {
  id;
  orientation;
  template;
  ariaLabelledby;
  stepperPanel;
  index;
  active;
  highlighted;
  onClick = new EventEmitter();
  prevCallback = new EventEmitter();
  nextCallback = new EventEmitter();
  static ɵfac = function StepperContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StepperContent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _StepperContent,
    selectors: [["p-stepperContent"]],
    hostVars: 6,
    hostBindings: function StepperContent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("p-stepper-content", true)("p-element", true)("p-toggleable-content", ctx.orientation === "vertical");
      }
    },
    inputs: {
      id: "id",
      orientation: "orientation",
      template: "template",
      ariaLabelledby: "ariaLabelledby",
      stepperPanel: "stepperPanel",
      index: "index",
      active: "active",
      highlighted: "highlighted"
    },
    outputs: {
      onClick: "onClick",
      prevCallback: "prevCallback",
      nextCallback: "nextCallback"
    },
    standalone: false,
    decls: 3,
    vars: 6,
    consts: [["role", "tabpanel", "data-pc-name", "stepperpanel", 3, "id"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [4, "ngTemplateOutlet"]],
    template: function StepperContent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵtemplate(1, StepperContent_ng_container_1_Template, 2, 9, "ng-container", 1)(2, StepperContent_2_Template, 1, 0, null, 1);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵproperty("id", ctx.id);
        ɵɵattribute("data-pc-index", ctx.index)("data-p-active", ctx.active)("aria-labelledby", ctx.ariaLabelledby);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.template);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.template);
      }
    },
    dependencies: [NgIf, NgTemplateOutlet],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperContent, [{
    type: Component,
    args: [{
      selector: "p-stepperContent",
      template: ` <div [id]="id" role="tabpanel" data-pc-name="stepperpanel" [attr.data-pc-index]="index" [attr.data-p-active]="active" [attr.aria-labelledby]="ariaLabelledby">
        <ng-container *ngIf="template">
            <ng-container *ngTemplateOutlet="template; context: { index: index, active: active, highlighted: highlighted, onClick: onClick, prevCallback: prevCallback, nextCallback: nextCallback }"></ng-container>
        </ng-container>
        <ng-template *ngIf="!template">
            <ng-container *ngIf="stepperPanel">
                <ng-container *ngTemplateOutlet="stepperPanel"></ng-container>
            </ng-container>
        </ng-template>
    </div>`,
      host: {
        "[class.p-stepper-content]": "true",
        "[class.p-element]": "true",
        "[class.p-toggleable-content]": "orientation === 'vertical'"
      }
    }]
  }], null, {
    id: [{
      type: Input
    }],
    orientation: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    ariaLabelledby: [{
      type: Input
    }],
    stepperPanel: [{
      type: Input
    }],
    index: [{
      type: Input
    }],
    active: [{
      type: Input
    }],
    highlighted: [{
      type: Input
    }],
    onClick: [{
      type: Output
    }],
    prevCallback: [{
      type: Output
    }],
    nextCallback: [{
      type: Output
    }]
  });
})();
var StepperPanel = class _StepperPanel {
  header;
  templates;
  headerTemplate;
  startTemplate;
  contentTemplate;
  separatorTemplate;
  endTemplate;
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "header":
          this.headerTemplate = item.template;
          break;
        case "content":
          this.contentTemplate = item.template;
          break;
        case "separator":
          this.separatorTemplate = item.template;
          break;
      }
    });
  }
  static ɵfac = function StepperPanel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StepperPanel)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _StepperPanel,
    selectors: [["p-stepperPanel"]],
    contentQueries: function StepperPanel_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    hostAttrs: [1, "p-element"],
    inputs: {
      header: "header"
    },
    standalone: false,
    ngContentSelectors: _c3,
    decls: 1,
    vars: 0,
    template: function StepperPanel_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperPanel, [{
    type: Component,
    args: [{
      selector: "p-stepperPanel",
      template: ` <ng-content></ng-content> `,
      host: {
        class: "p-element"
      }
    }]
  }], null, {
    header: [{
      type: Input
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var Stepper = class _Stepper {
  /**
   * Active step index of stepper.
   * @group Props
   */
  activeStep = 0;
  /**
   * Orientation of the stepper.
   * @group Props
   */
  orientation = "horizontal";
  /**
   * Whether the steps are clickable or not.
   * @group Props
   */
  linear = false;
  /**
   * Transition options of the animation.
   * @group Props
   */
  transitionOptions = "400ms cubic-bezier(0.86, 0, 0.07, 1)";
  stepperPanels;
  templates;
  onClick = new EventEmitter();
  /**
   * Emitted when the value changes.
   * @param {ActiveStepChangeEvent} event - custom change event.
   * @group Emits
   */
  activeStepChange = new EventEmitter();
  headerTemplate;
  startTemplate;
  separatorTemplate;
  endTemplate;
  id = UniqueComponentId();
  panels;
  isStepActive(index) {
    return this.activeStep === index;
  }
  getStepProp(step) {
    if (step?.header) {
      return step.header;
    }
    if (step?.content) {
      return step.content;
    }
    return void 0;
  }
  getStepKey(step, index) {
    return this.getStepProp(step) || index;
  }
  getStepHeaderActionId(index) {
    return `${this.id}_${index}_header_action`;
  }
  getStepContentId(index) {
    return `${this.id}_${index}_content`;
  }
  updateActiveStep(event, index) {
    this.activeStep = index;
    this.activeStepChange.emit(this.activeStep);
  }
  onItemClick(event, index) {
    if (this.linear) {
      event.preventDefault();
      return;
    }
    if (index !== this.activeStep) {
      this.updateActiveStep(event, index);
    }
  }
  isItemDisabled(index) {
    return this.linear && !this.isStepActive(index);
  }
  prevCallback(event, index) {
    if (index !== 0) {
      this.updateActiveStep(event, index - 1);
    }
  }
  nextCallback(event, index) {
    if (index !== this.stepperPanels.length - 1) {
      this.updateActiveStep(event, index + 1);
    }
  }
  trackByFn(index) {
    return index;
  }
  ngAfterContentInit() {
    this.panels = this.stepperPanels.toArray();
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "start":
          this.startTemplate = item.template;
          break;
        case "end":
          this.endTemplate = item.template;
          break;
        default:
          break;
      }
    });
  }
  static ɵfac = function Stepper_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Stepper)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Stepper,
    selectors: [["p-stepper"]],
    contentQueries: function Stepper_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, StepperPanel, 4);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.stepperPanels = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    hostVars: 6,
    hostBindings: function Stepper_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("p-stepper", true)("p-component", true)("p-stepper-vertical", ctx.orientation === "vertical");
      }
    },
    inputs: {
      activeStep: "activeStep",
      orientation: "orientation",
      linear: "linear",
      transitionOptions: "transitionOptions"
    },
    outputs: {
      onClick: "onClick",
      activeStepChange: "activeStepChange"
    },
    standalone: false,
    decls: 6,
    vars: 4,
    consts: [["vertical", ""], ["role", "tablist"], [4, "ngIf"], [4, "ngIf", "ngIfElse"], [4, "ngTemplateOutlet"], [1, "p-stepper-nav"], ["ngFor", "", 3, "ngForOf", "ngForTrackBy"], [1, "p-stepper-panels"], ["role", "presentation", 1, "p-stepper-header", 3, "key", "ngClass", "data-pc-name", "data-p-highlight", "data-p-disabled", "data-pc-index", "data-p-active"], [3, "onClick", "id", "template", "stepperPanel", "getStepProp", "index", "disabled", "active", "highlighted", "aria-controls"], [3, "template", "separatorClass", "stepperPanel", "index", "active", "highlighted"], [3, "onClick", "nextCallback", "prevCallback", "id", "template", "orientation", "stepperPanel", "index", "active", "highlighted", "ariaLabelledby"], [1, "p-stepper-panel", 3, "key", "ngClass", "data-pc-name", "data-p-highlight", "data-p-disabled", "data-pc-index", "data-p-active"], [1, "p-stepper-header", 3, "ngClass"], [1, "p-stepper-toggleable-content"]],
    template: function Stepper_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 1);
        ɵɵtemplate(1, Stepper_ng_container_1_Template, 2, 1, "ng-container", 2)(2, Stepper_ng_container_2_Template, 5, 4, "ng-container", 3)(3, Stepper_ng_template_3_Template, 1, 2, "ng-template", null, 0, ɵɵtemplateRefExtractor)(5, Stepper_ng_container_5_Template, 2, 1, "ng-container", 2);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        const vertical_r14 = ɵɵreference(4);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.startTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.orientation === "horizontal")("ngIfElse", vertical_r14);
        ɵɵadvance(3);
        ɵɵproperty("ngIf", ctx.endTemplate);
      }
    },
    dependencies: [NgClass, NgForOf, NgIf, NgTemplateOutlet, StepperContent, StepperHeader, StepperSeparator],
    styles: ["@layer primeng{.p-stepper-vertical .p-stepper-panel>.p-stepper-toggleable-content{overflow:hidden}.p-stepper-vertical .p-stepper-panel-active>.p-stepper-toggleable-content:not(.ng-animating){overflow:inherit}}\n"],
    encapsulation: 2,
    data: {
      animation: [trigger("tabContent", [state("hidden", style({
        height: "0",
        visibility: "hidden"
      })), state("visible", style({
        height: "*",
        visibility: "visible"
      })), transition("visible <=> hidden", [animate("250ms cubic-bezier(0.86, 0, 0.07, 1)")]), transition("void => *", animate(0))])]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Stepper, [{
    type: Component,
    args: [{
      selector: "p-stepper",
      template: `
        <div role="tablist">
            <ng-container *ngIf="startTemplate">
                <ng-container *ngTemplateOutlet="startTemplate"></ng-container>
            </ng-container>
            <ng-container *ngIf="orientation === 'horizontal'; else vertical">
                <ul class="p-stepper-nav">
                    <ng-template ngFor let-step [ngForOf]="panels" let-index="index" [ngForTrackBy]="trackByFn">
                        <li
                            [key]="getStepKey(step, index)"
                            class="p-stepper-header"
                            [ngClass]="{
                                'p-highlight': isStepActive(index),
                                'p-disabled': isItemDisabled(index)
                            }"
                            [attr.aria-current]="isStepActive(index) ? 'step' : undefined"
                            role="presentation"
                            [data-pc-name]="stepperPanel"
                            [data-p-highlight]="isStepActive(index)"
                            [data-p-disabled]="isItemDisabled(index)"
                            [data-pc-index]="index"
                            [data-p-active]="isStepActive(index)"
                        >
                            <p-stepperHeader
                                [id]="getStepHeaderActionId(index)"
                                [template]="step.headerTemplate"
                                [stepperPanel]="step"
                                [getStepProp]="getStepProp(step, 'header')"
                                [index]="index"
                                [disabled]="isItemDisabled(index)"
                                [active]="isStepActive(index)"
                                [highlighted]="index < activeStep"
                                [class]="'p-stepper-action'"
                                [aria-controls]="getStepContentId(index)"
                                (onClick)="onItemClick($event, index)"
                            ></p-stepperHeader>

                            <ng-container *ngIf="index !== stepperPanels.length - 1">
                                <p-stepperSeparator [template]="step.separatorTemplate" [separatorClass]="'p-stepper-separator'" [stepperPanel]="step" [index]="index" [active]="isStepActive(index)" [highlighted]="index < activeStep" />
                            </ng-container>
                        </li>
                    </ng-template>
                </ul>
                <div class="p-stepper-panels">
                    <ng-template ngFor let-step [ngForOf]="panels" let-index="index" [ngForTrackBy]="trackByFn">
                        <ng-container *ngIf="isStepActive(index)">
                            <p-stepperContent
                                [id]="getStepContentId(index)"
                                [template]="step.contentTemplate"
                                [orientation]="orientation"
                                [stepperPanel]="step"
                                [index]="index"
                                [active]="isStepActive(index)"
                                [highlighted]="index < activeStep"
                                [ariaLabelledby]="getStepHeaderActionId(index)"
                                (onClick)="onItemClick($event, index)"
                                (nextCallback)="nextCallback($event, index)"
                                (prevCallback)="prevCallback($event, index)"
                            />
                        </ng-container>
                    </ng-template>
                </div>
            </ng-container>
            <ng-template #vertical>
                <ng-template ngFor let-step [ngForOf]="panels" let-index="index" [ngForTrackBy]="trackByFn">
                    <div
                        [key]="getStepKey(step, index)"
                        class="p-stepper-panel"
                        [ngClass]="{
                            'p-stepper-panel-active': orientation === 'vertical' && isStepActive(index)
                        }"
                        [attr.aria-current]="isStepActive(index) ? 'step' : undefined"
                        [data-pc-name]="'stepperpanel'"
                        [data-p-highlight]="isStepActive(index)"
                        [data-p-disabled]="isItemDisabled(index)"
                        [data-pc-index]="index"
                        [data-p-active]="isStepActive(index)"
                    >
                        <div
                            class="p-stepper-header "
                            [ngClass]="{
                                'p-highlight': isStepActive(index),
                                'p-disabled': isItemDisabled(index)
                            }"
                        >
                            <p-stepperHeader
                                [id]="getStepHeaderActionId(index)"
                                [template]="step.headerTemplate"
                                [stepperPanel]="step"
                                [getStepProp]="getStepProp(step, 'header')"
                                [index]="index"
                                [disabled]="isItemDisabled(index)"
                                [active]="isStepActive(index)"
                                [highlighted]="index < activeStep"
                                [class]="'p-stepper-action'"
                                [aria-controls]="getStepContentId(index)"
                                (onClick)="onItemClick($event, index)"
                            ></p-stepperHeader>
                        </div>

                        <div class="p-stepper-toggleable-content" [@tabContent]="isStepActive(index) ? { value: 'visible', params: { transitionParams: transitionOptions } } : { value: 'hidden', params: { transitionParams: transitionOptions } }">
                            <ng-container *ngIf="index !== stepperPanels.length - 1">
                                <p-stepperSeparator [template]="step.separatorTemplate" [separatorClass]="'p-stepper-separator'" [stepperPanel]="step" [index]="index" [active]="isStepActive(index)" [highlighted]="index < activeStep" />
                            </ng-container>
                            <p-stepperContent
                                [id]="getStepContentId(index)"
                                [template]="step.contentTemplate"
                                [orientation]="orientation"
                                [stepperPanel]="step"
                                [index]="index"
                                [active]="isStepActive(index)"
                                [highlighted]="index < activeStep"
                                [ariaLabelledby]="getStepHeaderActionId(index)"
                                (onClick)="onItemClick($event, index)"
                                (nextCallback)="nextCallback($event, index)"
                                (prevCallback)="prevCallback($event, index)"
                            />
                        </div>
                    </div>
                </ng-template>
            </ng-template>
            <ng-container *ngIf="endTemplate">
                <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
            </ng-container>
        </div>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "[class.p-stepper]": "true",
        "[class.p-component]": "true",
        "[class.p-stepper-vertical]": "orientation === 'vertical'"
      },
      animations: [trigger("tabContent", [state("hidden", style({
        height: "0",
        visibility: "hidden"
      })), state("visible", style({
        height: "*",
        visibility: "visible"
      })), transition("visible <=> hidden", [animate("250ms cubic-bezier(0.86, 0, 0.07, 1)")]), transition("void => *", animate(0))])],
      styles: ["@layer primeng{.p-stepper-vertical .p-stepper-panel>.p-stepper-toggleable-content{overflow:hidden}.p-stepper-vertical .p-stepper-panel-active>.p-stepper-toggleable-content:not(.ng-animating){overflow:inherit}}\n"]
    }]
  }], null, {
    activeStep: [{
      type: Input
    }],
    orientation: [{
      type: Input
    }],
    linear: [{
      type: Input
    }],
    transitionOptions: [{
      type: Input
    }],
    stepperPanels: [{
      type: ContentChildren,
      args: [StepperPanel]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }],
    onClick: [{
      type: Output
    }],
    activeStepChange: [{
      type: Output
    }]
  });
})();
var StepperModule = class _StepperModule {
  static ɵfac = function StepperModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StepperModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _StepperModule,
    declarations: [Stepper, StepperPanel, StepperPanel, StepperContent, StepperHeader, StepperSeparator],
    imports: [CommonModule, SharedModule],
    exports: [Stepper, StepperPanel, StepperContent, StepperHeader, StepperSeparator, SharedModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SharedModule],
      exports: [Stepper, StepperPanel, StepperContent, StepperHeader, StepperSeparator, SharedModule],
      declarations: [Stepper, StepperPanel, StepperPanel, StepperContent, StepperHeader, StepperSeparator]
    }]
  }], null, null);
})();
export {
  Stepper,
  StepperContent,
  StepperHeader,
  StepperModule,
  StepperPanel,
  StepperSeparator
};
//# sourceMappingURL=primeng_stepper.js.map
