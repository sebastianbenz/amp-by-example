!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}function n(e){return e.scopes[e.scopes.length-1]}var r=t(["and","or","not","is"]),i=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in"],o=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];e.registerHelper("hintWords","python",i.concat(o)),e.defineMode("python",function(a,s){function l(e,t){if(e.sol()&&(t.indent=e.indentation()),e.sol()&&"py"==n(t).type){var r=n(t).offset;if(e.eatSpace()){var i=e.indentation();return i>r?p(t):i<r&&d(e,t)&&(t.errorToken=!0),null}var o=c(e,t);return r>0&&d(e,t)&&(o+=" "+h),o}return c(e,t)}function c(e,t){if(e.eatSpace())return null;var n=e.peek();if("#"==n)return e.skipToEnd(),"comment";if(e.match(/^[0-9\.]/,!1)){var i=!1;if(e.match(/^\d*\.\d+(e[\+\-]?\d+)?/i)&&(i=!0),e.match(/^\d+\.\d*/)&&(i=!0),e.match(/^\.\d+/)&&(i=!0),i)return e.eat(/J/i),"number";var o=!1;if(e.match(/^0x[0-9a-f]+/i)&&(o=!0),e.match(/^0b[01]+/i)&&(o=!0),e.match(/^0o[0-7]+/i)&&(o=!0),e.match(/^[1-9]\d*(e[\+\-]?\d+)?/)&&(e.eat(/J/i),o=!0),e.match(/^0(?![\dx])/i)&&(o=!0),o)return e.eat(/L/i),"number"}return e.match(E)?(t.tokenize=u(e.current()),t.tokenize(e,t)):e.match(v)||e.match(g)?"punctuation":e.match(y)||e.match(z)?"operator":e.match(b)?"punctuation":"."==t.lastToken&&e.match(F)?"property":e.match(T)||e.match(r)?"keyword":e.match(O)?"builtin":e.match(/^(self|cls)\b/)?"variable-2":e.match(F)?"def"==t.lastToken||"class"==t.lastToken?"def":"variable":(e.next(),h)}function u(e){function t(t,i){for(;!t.eol();)if(t.eatWhile(/[^'"\\]/),t.eat("\\")){if(t.next(),n&&t.eol())return r}else{if(t.match(e))return i.tokenize=l,r;t.eat(/['"]/)}if(n){if(s.singleLineStringErrors)return h;i.tokenize=l}return r}for(;"rub".indexOf(e.charAt(0).toLowerCase())>=0;)e=e.substr(1);var n=1==e.length,r="string";return t.isString=!0,t}function p(e){for(;"py"!=n(e).type;)e.scopes.pop();e.scopes.push({offset:n(e).offset+a.indentUnit,type:"py",align:null})}function f(e,t,n){var r=e.match(/^([\s\[\{\(]|#.*)*$/,!1)?null:e.column()+1;t.scopes.push({offset:t.indent+x,type:n,align:r})}function d(e,t){for(var r=e.indentation();n(t).offset>r;){if("py"!=n(t).type)return!0;t.scopes.pop()}return n(t).offset!=r}function m(e,t){e.sol()&&(t.beginningOfLine=!0);var r=t.tokenize(e,t),i=e.current();if(t.beginningOfLine&&"@"==i)return e.match(F,!1)?"meta":w?"operator":h;/\S/.test(i)&&(t.beginningOfLine=!1),"variable"!=r&&"builtin"!=r||"meta"!=t.lastToken||(r="meta"),"pass"!=i&&"return"!=i||(t.dedent+=1),"lambda"==i&&(t.lambda=!0),":"!=i||t.lambda||"py"!=n(t).type||p(t);var o=1==i.length?"[({".indexOf(i):-1;if(o!=-1&&f(e,t,"])}".slice(o,o+1)),o="])}".indexOf(i),o!=-1){if(n(t).type!=i)return h;t.indent=t.scopes.pop().offset-x}return t.dedent>0&&e.eol()&&"py"==n(t).type&&(t.scopes.length>1&&t.scopes.pop(),t.dedent-=1),r}var h="error",b=s.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.]/,y=s.doubleOperators||/^([!<>]==|<>|<<|>>|\/\/|\*\*)/,g=s.doubleDelimiters||/^(\+=|\-=|\*=|%=|\/=|&=|\|=|\^=)/,v=s.tripleDelimiters||/^(\/\/=|>>=|<<=|\*\*=)/,x=s.hangingIndent||a.indentUnit,k=i,_=o;void 0!=s.extra_keywords&&(k=k.concat(s.extra_keywords)),void 0!=s.extra_builtins&&(_=_.concat(s.extra_builtins));var w=s.version&&3==parseInt(s.version,10);if(w){var z=s.singleOperators||/^[\+\-\*\/%&|\^~<>!@]/,F=s.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;k=k.concat(["nonlocal","False","True","None","async","await"]),_=_.concat(["ascii","bytes","exec","print"]);var E=new RegExp("^(([rbuf]|(br))?('{3}|\"{3}|['\"]))","i")}else{var z=s.singleOperators||/^[\+\-\*\/%&|\^~<>!]/,F=s.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/;k=k.concat(["exec","print"]),_=_.concat(["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","False","True","None"]);var E=new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))","i")}var T=t(k),O=t(_),A={startState:function(e){return{tokenize:l,scopes:[{offset:e||0,type:"py",align:null}],indent:e||0,lastToken:null,lambda:!1,dedent:0}},token:function(e,t){var n=t.errorToken;n&&(t.errorToken=!1);var r=m(e,t);return r&&"comment"!=r&&(t.lastToken="keyword"==r||"punctuation"==r?e.current():r),"punctuation"==r&&(r=null),e.eol()&&t.lambda&&(t.lambda=!1),n?r+" "+h:r},indent:function(t,r){if(t.tokenize!=l)return t.tokenize.isString?e.Pass:0;var i=n(t),o=i.type==r.charAt(0);return null!=i.align?i.align-(o?1:0):i.offset-(o?x:0)},electricInput:/^\s*[\}\]\)]$/,closeBrackets:{triples:"'\""},lineComment:"#",fold:"indent"};return A}),e.defineMIME("text/x-python","python");var a=function(e){return e.split(" ")};e.defineMIME("text/x-cython",{name:"python",extra_keywords:a("by cdef cimport cpdef ctypedef enum exceptextern gil include nogil property publicreadonly struct union DEF IF ELIF ELSE")})});