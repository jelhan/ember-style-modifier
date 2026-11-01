import Modifier from 'ember-modifier';
import type * as CSS from 'csstype';
type CSSStyles = Partial<CSS.Properties> | Partial<CSS.PropertiesHyphen> | {
    readonly [key: `--${string}`]: string;
};
export interface StyleModifierSignature {
    Element: Element & ElementCSSInlineStyle;
    Args: {
        Positional: CSSStyles[];
        Named: CSSStyles;
    };
}
export default class StyleModifier extends Modifier<StyleModifierSignature> {
    existingStyles: Set<string>;
    setStyles(element: StyleModifierSignature['Element'], newStyles: [string, string][]): void;
    modify(element: StyleModifierSignature['Element'], positional: [CSSStyles] | [], named: CSSStyles): void;
}
export {};
//# sourceMappingURL=style.d.ts.map