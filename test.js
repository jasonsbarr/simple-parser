import { lexer, rule } from "@jasonsbarr/lexer";
import { createParser } from "./src/parser.js";

const keywords = [
  "true",
  "false",
  "null",
  "lam",
  "if",
  "else",
  "then",
  "let",
  "in",
  "end",
  "def",
];

const lexRules = keywords
  .map((k) => rule("Keyword", k.toUpperCase(), k))
  .concat([
    rule("WS", "WS", String.raw`\s+`),
    rule("Number", "NUMBER", String.raw`\d+`),
    rule("String", "STRING", String.raw`"(?:\\.|[^\\"])*"?`),
    rule("Symbol", "ARROW", String.raw`->`),
    rule("Symbol", "INC", String.raw`\+\+`),
    rule("Symbol", "PLUS", String.raw`\+`),
    rule("Symbol", "MINUS", String.raw`-`),
    rule("Symbol", "EXP", String.raw`\*\*`),
    rule("Symbol", "MUL", String.raw`\*`),
    rule("Symbol", "DIV", String.raw`/`),
    rule("Punc", "DOT", String.raw`\.`),
    rule("Punc", "LPAREN", String.raw`\(`),
    rule("Punc", "RPAREN", String.raw`\)`),
    rule("Punc", "LBRACK", String.raw`\[`),
    rule("Punc", "RBRACK", String.raw`\]`),
    rule("Punc", "COMMA", String.raw`,`),
    rule("Symbol", "ASSIGN", String.raw`=`),
    rule("Symbol", "IDENT", String.raw`[a-zA-Z_][\w]*`),
  ]);

const lex = lexer(lexRules);

const filterWs = (tokens) => [...tokens].filter((t) => t.type !== "WS");

export const tokenize = (input) =>
  filterWs(lex.compile().input(input).tokenize());

const operators = [
  {
    type: "oper",
    id: "numberLiteral",
    nToken: "NUMBER",
    lToken: null,
    oToken: null,
    prec: 0,
    assoc: "NONE",
    affix: "NONE",
    arity: "NONE",
  },
  {
    type: "oper",
    id: "stringLiteral",
    nToken: "STRING",
    lToken: null,
    oToken: null,
    prec: 0,
    assoc: "NONE",
    affix: "NONE",
    arity: "NONE",
  },
  {
    type: "oper",
    id: "trueLiteral",
    nToken: "TRUE",
    lToken: null,
    oToken: null,
    prec: 0,
    assoc: "NONE",
    affix: "NONE",
    arity: "NONE",
  },
  {
    type: "oper",
    id: "falseLiteral",
    nToken: "FALSE",
    lToken: null,
    oToken: null,
    prec: 0,
    assoc: "NONE",
    affix: "NONE",
    arity: "NONE",
  },
  {
    type: "oper",
    id: "nullLiteral",
    nToken: "NULL",
    lToken: null,
    oToken: null,
    prec: 0,
    assoc: "NONE",
    affix: "NONE",
    arity: "NONE",
  },
  {
    type: "oper",
    id: "identifier",
    nToken: "IDENT",
    lToken: null,
    oToken: null,
    prec: 0,
    assoc: "NONE",
    affix: "NONE",
    arity: "NONE",
  },
  {
    type: "oper",
    id: "plus",
    nToken: null,
    lToken: "PLUS",
    oToken: null,
    prec: 30,
    assoc: "LEFT",
    affix: "INFIX",
    arity: "BINARY",
  },
  {
    type: "oper",
    id: "minus",
    nToken: null,
    lToken: "MINUS",
    oToken: null,
    prec: 30,
    assoc: "LEFT",
    affix: "INFIX",
    arity: "BINARY",
  },
  {
    type: "oper",
    id: "mul",
    nToken: null,
    lToken: "MUL",
    oToken: null,
    prec: 40,
    assoc: "LEFT",
    affix: "INFIX",
    arity: "BINARY",
  },
  {
    type: "oper",
    id: "div",
    nToken: null,
    lToken: "DIV",
    oToken: null,
    prec: 40,
    assoc: "LEFT",
    affix: "INFIX",
    arity: "BINARY",
  },
  {
    type: "oper",
    id: "exp",
    nToken: null,
    lToken: "EXP",
    oToken: null,
    prec: 45,
    assoc: "RIGHT",
    affix: "INFIX",
    arity: "BINARY",
  },
  {
    type: "oper",
    id: "uPlus",
    nToken: "PLUS",
    lToken: null,
    oToken: null,
    prec: 50,
    assoc: "RIGHT",
    affix: "PREFIX",
    arity: "UNARY",
  },
  {
    type: "oper",
    id: "uMinus",
    nToken: "MINUS",
    lToken: null,
    oToken: null,
    prec: 50,
    assoc: "RIGHT",
    affix: "PREFIX",
    arity: "UNARY",
  },
  {
    type: "oper",
    id: "parentheses",
    nToken: "LPAREN",
    lToken: null,
    oToken: "RPAREN",
    prec: 100,
    assoc: "NONE",
    affix: "MATCHFIX",
    arity: "UNARY",
  },
  {
    type: "oper",
    id: "ifElse",
    nToken: null,
    lToken: "IF",
    oToken: "ELSE",
    prec: 5,
    assoc: "LEFT",
    affix: "INFIX",
    arity: "TERNARY",
  },
  {
    type: "oper",
    id: "ifThenElse",
    nToken: "IF",
    lToken: "THEN",
    oToken: "ELSE",
    prec: 5,
    assoc: "LEFT",
    affix: "MIXFIX",
    arity: "TERNARY",
  },
  {
    type: "oper",
    id: "increment",
    nToken: null,
    lToken: "INC",
    oToken: null,
    prec: 60,
    assoc: "LEFT",
    affix: "POSTFIX",
    arity: "UNARY",
  },
  {
    type: "oper",
    id: "lambda",
    nToken: "LAM",
    lToken: "ARROW",
    oToken: null,
    prec: 5,
    assoc: "LEFT",
    affix: "MIXFIX",
    arity: "BINARY",
  },
  {
    type: "oper",
    id: "memberAccess",
    nToken: null,
    lToken: "DOT",
    oToken: null,
    prec: 90,
    assoc: "LEFT",
    affix: "INFIX",
    arity: "BINARY",
  },
  {
    type: "oper",
    id: "call",
    nToken: null,
    lToken: "LPAREN",
    oToken: "RPAREN",
    prec: 90,
    assoc: "LEFT",
    affix: "MATCHFIX",
    arity: "BINARY",
  },
  {
    type: "oper",
    id: "list",
    nToken: "LBRACK",
    lToken: null,
    oToken: "RBRACK",
    prec: 100,
    assoc: "NONE",
    affix: "MATCHFIX",
    arity: "UNARY",
  },
  {
    type: "oper",
    id: "let",
    nToken: "LET",
    lToken: "IN",
    oToken: null,
    prec: 5,
    assoc: "NONE",
    affix: "MIXFIX",
    arity: "BINARY",
  },
  {
    type: "sequence",
    id: "Comma",
    name: "COMMA",
  },
  {
    type: "assign",
    id: "Assign",
    name: "ASSIGN",
  },
];

const rules = `
# function definition
# note that params:identifier will also parse a comma-separated sequence of identifiers
functionDef DEF name:IDENT LPAREN params:identifier RPAREN stat+ END
`;

const parser = createParser(operators, { rules });

export const parse = (input) => parser(tokenize(input));
