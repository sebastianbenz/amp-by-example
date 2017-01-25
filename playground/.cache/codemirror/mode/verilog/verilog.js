!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e,t){var r=2,i=-1,a=0,l=e.indentation();switch(t.tlvCurCtlFlowChar){case"\\":l=0;break;case"|":if("@"==t.tlvPrevPrevCtlFlowChar){a=-2;break}n[t.tlvPrevCtlFlowChar]&&(a=1);break;case"M":if("@"==t.tlvPrevPrevCtlFlowChar){a=-2;break}n[t.tlvPrevCtlFlowChar]&&(a=1);break;case"@":"S"==t.tlvPrevCtlFlowChar&&(a=-1),"|"==t.tlvPrevCtlFlowChar&&(a=1);break;case"S":"@"==t.tlvPrevCtlFlowChar&&(a=1),n[t.tlvPrevCtlFlowChar]&&(a=1)}var o=r;return i=l+a*o,i>=0?i:l}e.defineMode("verilog",function(t,n){function r(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}function i(e,t){var n,r=e.peek();if(g[r]&&0!=(n=g[r](e,t)))return n;if(g.tokenBase&&0!=(n=g.tokenBase(e,t)))return n;if(/[,;:\.]/.test(r))return v=e.next(),null;if(y.test(r))return v=e.next(),"bracket";if("`"==r)return e.next(),e.eatWhile(/[\w\$_]/)?"def":null;if("$"==r)return e.next(),e.eatWhile(/[\w\$_]/)?"meta":null;if("#"==r)return e.next(),e.eatWhile(/[\d_.]/),"def";if('"'==r)return e.next(),t.tokenize=a(r),t.tokenize(e,t);if("/"==r){if(e.next(),e.eat("*"))return t.tokenize=l,l(e,t);if(e.eat("/"))return e.skipToEnd(),"comment";e.backUp(1)}if(e.match(q)||e.match(_)||e.match(F)||e.match(z)||e.match(P)||e.match(b)||e.match(q))return"number";if(e.eatWhile(k))return"meta";if(e.eatWhile(/[\w\$_]/)){var i=e.current();return x[i]?(I[i]&&(v="newblock"),$[i]&&(v="newstatement"),f=i,"keyword"):"variable"}return e.next(),null}function a(e){return function(t,n){for(var r,a=!1,l=!1;null!=(r=t.next());){if(r==e&&!a){l=!0;break}a=!a&&"\\"==r}return(l||!a&&!w)&&(n.tokenize=i),"string"}}function l(e,t){for(var n,r=!1;n=e.next();){if("/"==n&&r){t.tokenize=i;break}r="*"==n}return"comment"}function o(e,t,n,r,i){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=i}function s(e,t,n){var r=e.indented,i=new o(r,t,n,null,e.context);return e.context=i}function c(e){var t=e.context.type;return")"!=t&&"]"!=t&&"}"!=t||(e.indented=e.context.indented),e.context=e.context.prev}function u(e,t){if(e==t)return!0;var n=t.split(";");for(var r in n)if(e==n[r])return!0;return!1}function d(){var e=[];for(var t in I)if(I[t]){var n=I[t].split(";");for(var r in n)e.push(n[r])}var i=new RegExp("[{}()\\[\\]]|("+e.join("|")+")$");return i}var v,f,p=t.indentUnit,C=n.statementIndentUnit||p,m=n.dontAlignCalls,h=n.noIndentKeywords||[],w=n.multiLineStrings,g=n.hooks||{},x=r("accept_on alias always always_comb always_ff always_latch and assert assign assume automatic before begin bind bins binsof bit break buf bufif0 bufif1 byte case casex casez cell chandle checker class clocking cmos config const constraint context continue cover covergroup coverpoint cross deassign default defparam design disable dist do edge else end endcase endchecker endclass endclocking endconfig endfunction endgenerate endgroup endinterface endmodule endpackage endprimitive endprogram endproperty endspecify endsequence endtable endtask enum event eventually expect export extends extern final first_match for force foreach forever fork forkjoin function generate genvar global highz0 highz1 if iff ifnone ignore_bins illegal_bins implements implies import incdir include initial inout input inside instance int integer interconnect interface intersect join join_any join_none large let liblist library local localparam logic longint macromodule matches medium modport module nand negedge nettype new nexttime nmos nor noshowcancelled not notif0 notif1 null or output package packed parameter pmos posedge primitive priority program property protected pull0 pull1 pulldown pullup pulsestyle_ondetect pulsestyle_onevent pure rand randc randcase randsequence rcmos real realtime ref reg reject_on release repeat restrict return rnmos rpmos rtran rtranif0 rtranif1 s_always s_eventually s_nexttime s_until s_until_with scalared sequence shortint shortreal showcancelled signed small soft solve specify specparam static string strong strong0 strong1 struct super supply0 supply1 sync_accept_on sync_reject_on table tagged task this throughout time timeprecision timeunit tran tranif0 tranif1 tri tri0 tri1 triand trior trireg type typedef union unique unique0 unsigned until until_with untyped use uwire var vectored virtual void wait wait_order wand weak weak0 weak1 while wildcard wire with within wor xnor xor"),k=/[\+\-\*\/!~&|^%=?:]/,y=/[\[\]{}()]/,b=/\d[0-9_]*/,_=/\d*\s*'s?d\s*\d[0-9_]*/i,F=/\d*\s*'s?b\s*[xz01][xz01_]*/i,z=/\d*\s*'s?o\s*[xz0-7][xz0-7_]*/i,P=/\d*\s*'s?h\s*[0-9a-fxz?][0-9a-fxz?_]*/i,q=/(\d[\d_]*(\.\d[\d_]*)?E-?[\d_]+)|(\d[\d_]*\.\d[\d_]*)/i,A=/^((\w+)|[)}\]])/,S=/[)}\]]/,j=r("case checker class clocking config function generate interface module packageprimitive program property specify sequence table task"),I={};for(var M in j)I[M]="end"+M;I.begin="end",I.casex="endcase",I.casez="endcase",I.do="while",I.fork="join;join_any;join_none",I.covergroup="endgroup";for(var E in h){var M=h[E];I[M]&&(I[M]=void 0)}var $=r("always always_comb always_ff always_latch assert assign assume else export for foreach forever if import initial repeat while");return{electricInput:d(),startState:function(e){var t={tokenize:null,context:new o((e||0)-p,0,"top",!1),indented:0,startOfLine:!0};return g.startState&&g.startState(t),t},token:function(e,t){var n=t.context;if(e.sol()&&(null==n.align&&(n.align=!1),t.indented=e.indentation(),t.startOfLine=!0),g.token&&g.token(e,t),e.eatSpace())return null;v=null,f=null;var r=(t.tokenize||i)(e,t);if("comment"==r||"meta"==r||"variable"==r)return r;if(null==n.align&&(n.align=!0),v==n.type)c(t);else if(";"==v&&"statement"==n.type||n.type&&u(f,n.type))for(n=c(t);n&&"statement"==n.type;)n=c(t);else if("{"==v)s(t,e.column(),"}");else if("["==v)s(t,e.column(),"]");else if("("==v)s(t,e.column(),")");else if(n&&"endcase"==n.type&&":"==v)s(t,e.column(),"statement");else if("newstatement"==v)s(t,e.column(),"statement");else if("newblock"==v)if("function"!=f||!n||"statement"!=n.type&&"endgroup"!=n.type)if("task"==f&&n&&"statement"==n.type);else{var a=I[f];s(t,e.column(),a)}else;return t.startOfLine=!1,r},indent:function(t,n){if(t.tokenize!=i&&null!=t.tokenize)return e.Pass;if(g.indent){var r=g.indent(t);if(r>=0)return r}var a=t.context,l=n&&n.charAt(0);"statement"==a.type&&"}"==l&&(a=a.prev);var o=!1,s=n.match(A);return s&&(o=u(s[0],a.type)),"statement"==a.type?a.indented+("{"==l?0:C):S.test(a.type)&&a.align&&!m?a.column+(o?0:1):")"!=a.type||o?a.indented+(o?0:p):a.indented+C},blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//"}}),e.defineMIME("text/x-verilog",{name:"verilog"}),e.defineMIME("text/x-systemverilog",{name:"verilog"});var n={">":"property","->":"property","-":"hr","|":"link","?$":"qualifier","?*":"qualifier","@-":"variable-3","@":"variable-3","?":"qualifier"};e.defineMIME("text/x-tlv",{name:"verilog",hooks:{"\\":function(e,n){var r=0,i=!1,a=e.string;return e.sol()&&(/\\SV/.test(e.string)||/\\TLV/.test(e.string))&&(a=/\\TLV_version/.test(e.string)?"\\TLV_version":e.string,e.skipToEnd(),"\\SV"==a&&n.vxCodeActive&&(n.vxCodeActive=!1),(/\\TLV/.test(a)&&!n.vxCodeActive||"\\TLV_version"==a&&n.vxCodeActive)&&(n.vxCodeActive=!0),i="keyword",n.tlvCurCtlFlowChar=n.tlvPrevPrevCtlFlowChar=n.tlvPrevCtlFlowChar="",1==n.vxCodeActive&&(n.tlvCurCtlFlowChar="\\",r=t(e,n)),n.vxIndentRq=r),i},tokenBase:function(e,r){var i=0,a=!1,l=/[\[\]=:]/,o={"**":"variable-2","*":"variable-2",$$:"variable",$:"variable","^^":"attribute","^":"attribute"},s=e.peek(),c=r.tlvCurCtlFlowChar;return 1==r.vxCodeActive&&(/[\[\]{}\(\);\:]/.test(s)?(a="meta",e.next()):"/"==s?(e.next(),e.eat("/")?(e.skipToEnd(),a="comment",r.tlvCurCtlFlowChar="S"):e.backUp(1)):"@"==s?(a=n[s],r.tlvCurCtlFlowChar="@",e.next(),e.eatWhile(/[\w\$_]/)):e.match(/\b[mM]4+/,!0)?(e.skipTo("("),a="def",r.tlvCurCtlFlowChar="M"):"!"==s&&e.sol()?(a="comment",e.next()):l.test(s)?(e.eatWhile(l),a="operator"):"#"==s?(r.tlvCurCtlFlowChar=""==r.tlvCurCtlFlowChar?s:r.tlvCurCtlFlowChar,e.next(),e.eatWhile(/[+-]\d/),a="tag"):o.propertyIsEnumerable(s)?(a=o[s],r.tlvCurCtlFlowChar=""==r.tlvCurCtlFlowChar?"S":r.tlvCurCtlFlowChar,e.next(),e.match(/[a-zA-Z_0-9]+/)):(a=n[s]||!1)&&(r.tlvCurCtlFlowChar=""==r.tlvCurCtlFlowChar?s:r.tlvCurCtlFlowChar,e.next(),e.match(/[a-zA-Z_0-9]+/)),r.tlvCurCtlFlowChar!=c&&(i=t(e,r),r.vxIndentRq=i)),a},token:function(e,t){1==t.vxCodeActive&&e.sol()&&""!=t.tlvCurCtlFlowChar&&(t.tlvPrevPrevCtlFlowChar=t.tlvPrevCtlFlowChar,t.tlvPrevCtlFlowChar=t.tlvCurCtlFlowChar,t.tlvCurCtlFlowChar="")},indent:function(e){return 1==e.vxCodeActive?e.vxIndentRq:-1},startState:function(e){e.tlvCurCtlFlowChar="",e.tlvPrevCtlFlowChar="",e.tlvPrevPrevCtlFlowChar="",e.vxCodeActive=!0,e.vxIndentRq=0}}})});