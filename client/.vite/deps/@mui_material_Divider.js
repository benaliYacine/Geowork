"use client";
import {
  _objectWithoutPropertiesLoose,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_objectWithoutPropertiesLoose,
  init_styled,
  init_useThemeProps,
  require_colorManipulator,
  require_prop_types,
  styled_default,
  useThemeProps
} from "./chunk-AV45KL6R.js";
import {
  clsx_default,
  init_clsx
} from "./chunk-H2D4EMZ6.js";
import {
  require_jsx_runtime
} from "./chunk-AANCVKBC.js";
import {
  _extends,
  init_extends
} from "./chunk-IB7FZ6MA.js";
import {
  require_react
} from "./chunk-UM3JHGVO.js";
import {
  __toESM
} from "./chunk-CEQRFMJQ.js";

// node_modules/@mui/material/Divider/Divider.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
var import_colorManipulator = __toESM(require_colorManipulator());
init_styled();
init_useThemeProps();

// node_modules/@mui/material/Divider/dividerClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getDividerUtilityClass(slot) {
  return generateUtilityClass("MuiDivider", slot);
}
var dividerClasses = generateUtilityClasses("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
var dividerClasses_default = dividerClasses;

// node_modules/@mui/material/Divider/Divider.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["absolute", "children", "className", "component", "flexItem", "light", "orientation", "role", "textAlign", "variant"];
var useUtilityClasses = (ownerState) => {
  const {
    absolute,
    children,
    classes,
    flexItem,
    light,
    orientation,
    textAlign,
    variant
  } = ownerState;
  const slots = {
    root: ["root", absolute && "absolute", variant, light && "light", orientation === "vertical" && "vertical", flexItem && "flexItem", children && "withChildren", children && orientation === "vertical" && "withChildrenVertical", textAlign === "right" && orientation !== "vertical" && "textAlignRight", textAlign === "left" && orientation !== "vertical" && "textAlignLeft"],
    wrapper: ["wrapper", orientation === "vertical" && "wrapperVertical"]
  };
  return composeClasses(slots, getDividerUtilityClass, classes);
};
var DividerRoot = styled_default("div", {
  name: "MuiDivider",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.absolute && styles.absolute, styles[ownerState.variant], ownerState.light && styles.light, ownerState.orientation === "vertical" && styles.vertical, ownerState.flexItem && styles.flexItem, ownerState.children && styles.withChildren, ownerState.children && ownerState.orientation === "vertical" && styles.withChildrenVertical, ownerState.textAlign === "right" && ownerState.orientation !== "vertical" && styles.textAlignRight, ownerState.textAlign === "left" && ownerState.orientation !== "vertical" && styles.textAlignLeft];
  }
})(({
  theme,
  ownerState
}) => _extends({
  margin: 0,
  // Reset browser default style.
  flexShrink: 0,
  borderWidth: 0,
  borderStyle: "solid",
  borderColor: (theme.vars || theme).palette.divider,
  borderBottomWidth: "thin"
}, ownerState.absolute && {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%"
}, ownerState.light && {
  borderColor: theme.vars ? `rgba(${theme.vars.palette.dividerChannel} / 0.08)` : (0, import_colorManipulator.alpha)(theme.palette.divider, 0.08)
}, ownerState.variant === "inset" && {
  marginLeft: 72
}, ownerState.variant === "middle" && ownerState.orientation === "horizontal" && {
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2)
}, ownerState.variant === "middle" && ownerState.orientation === "vertical" && {
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1)
}, ownerState.orientation === "vertical" && {
  height: "100%",
  borderBottomWidth: 0,
  borderRightWidth: "thin"
}, ownerState.flexItem && {
  alignSelf: "stretch",
  height: "auto"
}), ({
  ownerState
}) => _extends({}, ownerState.children && {
  display: "flex",
  whiteSpace: "nowrap",
  textAlign: "center",
  border: 0,
  "&::before, &::after": {
    content: '""',
    alignSelf: "center"
  }
}), ({
  theme,
  ownerState
}) => _extends({}, ownerState.children && ownerState.orientation !== "vertical" && {
  "&::before, &::after": {
    width: "100%",
    borderTop: `thin solid ${(theme.vars || theme).palette.divider}`
  }
}), ({
  theme,
  ownerState
}) => _extends({}, ownerState.children && ownerState.orientation === "vertical" && {
  flexDirection: "column",
  "&::before, &::after": {
    height: "100%",
    borderLeft: `thin solid ${(theme.vars || theme).palette.divider}`
  }
}), ({
  ownerState
}) => _extends({}, ownerState.textAlign === "right" && ownerState.orientation !== "vertical" && {
  "&::before": {
    width: "90%"
  },
  "&::after": {
    width: "10%"
  }
}, ownerState.textAlign === "left" && ownerState.orientation !== "vertical" && {
  "&::before": {
    width: "10%"
  },
  "&::after": {
    width: "90%"
  }
}));
var DividerWrapper = styled_default("span", {
  name: "MuiDivider",
  slot: "Wrapper",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.wrapper, ownerState.orientation === "vertical" && styles.wrapperVertical];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: "inline-block",
  paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
  paddingRight: `calc(${theme.spacing(1)} * 1.2)`
}, ownerState.orientation === "vertical" && {
  paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
  paddingBottom: `calc(${theme.spacing(1)} * 1.2)`
}));
var Divider = React.forwardRef(function Divider2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiDivider"
  });
  const {
    absolute = false,
    children,
    className,
    component = children ? "div" : "hr",
    flexItem = false,
    light = false,
    orientation = "horizontal",
    role = component !== "hr" ? "separator" : void 0,
    textAlign = "center",
    variant = "fullWidth"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = _extends({}, props, {
    absolute,
    component,
    flexItem,
    light,
    orientation,
    role,
    textAlign,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(DividerRoot, _extends({
    as: component,
    className: clsx_default(classes.root, className),
    role,
    ref,
    ownerState
  }, other, {
    children: children ? (0, import_jsx_runtime.jsx)(DividerWrapper, {
      className: classes.wrapper,
      ownerState,
      children
    }) : null
  }));
});
Divider.muiSkipListHighlight = true;
true ? Divider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: import_prop_types.default.bool,
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: import_prop_types.default.bool,
  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   * @deprecated Use <Divider sx={{ opacity: 0.6 }} /> (or any opacity or color) instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  light: import_prop_types.default.bool,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
  /**
   * @ignore
   */
  role: import_prop_types.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: import_prop_types.default.oneOf(["center", "left", "right"]),
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["fullWidth", "inset", "middle"]), import_prop_types.default.string])
} : void 0;
var Divider_default = Divider;
export {
  Divider_default as default,
  dividerClasses_default as dividerClasses,
  getDividerUtilityClass
};
//# sourceMappingURL=@mui_material_Divider.js.map
