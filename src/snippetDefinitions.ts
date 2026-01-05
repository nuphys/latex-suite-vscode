/**
 * Built-in snippet definitions for LaTeX Suite
 */

export interface SnippetDefinition {
    trigger: string;
    replacement: string;
    mode: 'immediate' | 'delimiter' | 'manual';
    mathOnly?: boolean;
}

/**
 * Default built-in snippets
 */
export const builtinSnippets: SnippetDefinition[] = [
    // Greek letters (immediate expansion in math mode)
    { trigger: ';a', replacement: '\\alpha', mode: 'immediate', mathOnly: true },
    { trigger: ';b', replacement: '\\beta', mode: 'immediate', mathOnly: true },
    { trigger: ';g', replacement: '\\gamma', mode: 'immediate', mathOnly: true },
    { trigger: ';d', replacement: '\\delta', mode: 'immediate', mathOnly: true },
    { trigger: ';e', replacement: '\\epsilon', mode: 'immediate', mathOnly: true },
    { trigger: ';z', replacement: '\\zeta', mode: 'immediate', mathOnly: true },
    { trigger: ';t', replacement: '\\theta', mode: 'immediate', mathOnly: true },
    { trigger: ';k', replacement: '\\kappa', mode: 'immediate', mathOnly: true },
    { trigger: ';l', replacement: '\\lambda', mode: 'immediate', mathOnly: true },
    { trigger: ';m', replacement: '\\mu', mode: 'immediate', mathOnly: true },
    { trigger: ';n', replacement: '\\nu', mode: 'immediate', mathOnly: true },
    { trigger: ';x', replacement: '\\xi', mode: 'immediate', mathOnly: true },
    { trigger: ';p', replacement: '\\pi', mode: 'immediate', mathOnly: true },
    { trigger: ';r', replacement: '\\rho', mode: 'immediate', mathOnly: true },
    { trigger: ';s', replacement: '\\sigma', mode: 'immediate', mathOnly: true },
    { trigger: ';o', replacement: '\\omega', mode: 'immediate', mathOnly: true },
    
    // Capital Greek letters
    { trigger: ';G', replacement: '\\Gamma', mode: 'immediate', mathOnly: true },
    { trigger: ';D', replacement: '\\Delta', mode: 'immediate', mathOnly: true },
    { trigger: ';T', replacement: '\\Theta', mode: 'immediate', mathOnly: true },
    { trigger: ';L', replacement: '\\Lambda', mode: 'immediate', mathOnly: true },
    { trigger: ';X', replacement: '\\Xi', mode: 'immediate', mathOnly: true },
    { trigger: ';P', replacement: '\\Pi', mode: 'immediate', mathOnly: true },
    { trigger: ';S', replacement: '\\Sigma', mode: 'immediate', mathOnly: true },
    { trigger: ';O', replacement: '\\Omega', mode: 'immediate', mathOnly: true },
    
    // Fractions and templates (delimiter mode)
    { trigger: 'ff', replacement: '\\frac{${1}}{${2}}$0', mode: 'delimiter', mathOnly: true },
    { trigger: 'sum', replacement: '\\sum_{${1:i}}^{${2:n}} $0', mode: 'delimiter', mathOnly: true },
    { trigger: 'prod', replacement: '\\prod_{${1:i}}^{${2:n}} $0', mode: 'delimiter', mathOnly: true },
    { trigger: 'lim', replacement: '\\lim_{${1:n \\to \\infty}} $0', mode: 'delimiter', mathOnly: true },
    { trigger: 'int', replacement: '\\int_{${1:a}}^{${2:b}} ${3} \\, d${4:x}$0', mode: 'delimiter', mathOnly: true },
    
    // Subscripts and superscripts (immediate)
    { trigger: '__', replacement: '_{${1}}$0', mode: 'immediate', mathOnly: true },
    { trigger: 'sq', replacement: '^{2}', mode: 'immediate', mathOnly: true },
    { trigger: 'cb', replacement: '^{3}', mode: 'immediate', mathOnly: true },
    
    // Common math operators
    { trigger: '!=', replacement: '\\neq', mode: 'immediate', mathOnly: true },
    { trigger: '<=', replacement: '\\leq', mode: 'immediate', mathOnly: true },
    { trigger: '>=', replacement: '\\geq', mode: 'immediate', mathOnly: true },
    { trigger: '~=', replacement: '\\approx', mode: 'immediate', mathOnly: true },
    { trigger: 'xx', replacement: '\\times', mode: 'immediate', mathOnly: true },
    { trigger: '...', replacement: '\\ldots', mode: 'immediate', mathOnly: true },
    
    // Text mode shortcuts (delimiter)
    { trigger: 'beg', replacement: '\\begin{${1:environment}}\n\t$0\n\\end{${1:environment}}', mode: 'delimiter', mathOnly: false },
];
