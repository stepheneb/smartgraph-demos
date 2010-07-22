/*
 * g.Raphael 0.4.1 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.fn.g.barchart=function(C,A,a,d,O,u){u=u||{};
var P={round:"round",sharp:"sharp",soft:"soft"}[u.type]||"square",n=parseFloat(u.gutter||"20%"),M=this.set(),v=this.set(),e=this.set(),r=this.set(),w=Math.max.apply(Math,O),N=[],c=this,B=0,F=u.colors||this.g.colors,q=O.length;
if(this.raphael.is(O[0],"array")){w=[];B=q;q=0;for(var K=O.length;K--;){v.push(this.set());
w.push(Math.max.apply(Math,O[K]));q=Math.max(q,O[K].length)}if(u.stacked){for(var K=q;
K--;){var l=0;for(var J=O.length;J--;){l+=+O[J][K]||0}N.push(l)}}for(var K=O.length;
K--;){if(O[K].length<q){for(var J=q;J--;){O[K].push(0)}}}w=Math.max.apply(Math,u.stacked?N:w)
}w=(u.to)||w;var D=a/(q*(100+n)+n)*100,b=D*n/100,g=u.vgutter==null?20:u.vgutter,t=[],k=C+b,f=(d-2*g)/w;
if(!u.stretch){b=Math.round(b);D=Math.floor(D)}!u.stacked&&(D/=B||1);for(var K=0;
K<q;K++){t=[];for(var J=0;J<(B||1);J++){var L=Math.round((B?O[J][K]:O[K])*f),m=A+d-g-L,H=this.g.finger(Math.round(k+D/2),m+L,D,L,true,P).attr({stroke:"none",fill:F[B?J:K]});
if(B){v[J].push(H)}else{v.push(H)}H.y=m;H.x=Math.round(k+D/2);H.w=D;H.h=L;H.value=B?O[J][K]:O[K];
if(!u.stacked){k+=D}else{t.push(H)}}if(u.stacked){var I;r.push(I=this.rect(t[0].x-t[0].w/2,A,D,d).attr(this.g.shim));
I.bars=this.set();var o=0;for(var E=t.length;E--;){t[E].toFront()}for(var E=0,p=t.length;
E<p;E++){var H=t[E],z,L=(o+H.value)*f,G=this.g.finger(H.x,A+d-g-!!o*0.5,D,L,true,P,1);
I.bars.push(H);o&&H.attr({path:G});H.h=L;H.y=A+d-g-!!o*0.5-L;e.push(z=this.rect(H.x-H.w/2,H.y,D,H.value*f).attr(this.g.shim));
z.bar=H;z.value=H.value;o+=H.value}k+=D}k+=b}r.toFront();k=C+b;if(!u.stacked){for(var K=0;
K<q;K++){for(var J=0;J<(B||1);J++){var z;e.push(z=this.rect(Math.round(k),A+g,D,d-g).attr(this.g.shim));
z.bar=B?v[J][K]:v[K];z.value=z.bar.value;k+=D}k+=b}}M.label=function(y,S){y=y||[];
this.labels=c.set();var T,h=-Infinity;if(u.stacked){for(var x=0;x<q;x++){var Q=0;
for(var s=0;s<(B||1);s++){Q+=B?O[s][x]:O[x];if(s==B-1){var U=c.g.labelise(y[x],Q,w);
T=c.g.text(v[x*(B||1)+s].x,A+d-g/2,U).insertBefore(e[x*(B||1)+s]);var R=T.getBBox();
if(R.x-7<h){T.remove()}else{this.labels.push(T);h=R.x+R.width}}}}}else{for(var x=0;
x<q;x++){for(var s=0;s<(B||1);s++){var U=c.g.labelise(B?y[s]&&y[s][x]:y[x],B?O[s][x]:O[x],w);
T=c.g.text(v[x*(B||1)+s].x,S?A+d-g/2:v[x*(B||1)+s].y-10,U).insertBefore(e[x*(B||1)+s]);
var R=T.getBBox();if(R.x-7<h){T.remove()}else{this.labels.push(T);h=R.x+R.width}}}}return this
};M.hover=function(i,h){r.hide();e.show();e.mouseover(i).mouseout(h);return this};
M.hoverColumn=function(i,h){e.hide();r.show();h=h||function(){};r.mouseover(i).mouseout(h);
return this};M.click=function(h){r.hide();e.show();e.click(h);return this};M.each=function(j){if(!Raphael.is(j,"function")){return this
}for(var h=e.length;h--;){j.call(e[h])}return this};M.eachColumn=function(j){if(!Raphael.is(j,"function")){return this
}for(var h=r.length;h--;){j.call(r[h])}return this};M.clickColumn=function(h){e.hide();
r.show();r.click(h);return this};M.push(v,e,r);M.bars=v;M.covers=e;return M};Raphael.fn.g.hbarchart=function(n,l,B,w,c,r){r=r||{};
var e={round:"round",sharp:"sharp",soft:"soft"}[r.type]||"square",f=parseFloat(r.gutter||"20%"),u=this.set(),A=this.set(),h=this.set(),E=this.set(),M=Math.max.apply(Math,c),a=[],o=this,C=0,m=r.colors||this.g.colors,H=c.length;
if(this.raphael.is(c[0],"array")){M=[];C=H;H=0;for(var G=c.length;G--;){A.push(this.set());
M.push(Math.max.apply(Math,c[G]));H=Math.max(H,c[G].length)}if(r.stacked){for(var G=H;
G--;){var p=0;for(var F=c.length;F--;){p+=+c[F][G]||0}a.push(p)}}for(var G=c.length;
G--;){if(c[G].length<H){for(var F=H;F--;){c[G].push(0)}}}M=Math.max.apply(Math,r.stacked?a:M)
}M=(r.to)||M;var J=Math.floor(w/(H*(100+f)+f)*100),k=Math.floor(J*f/100),g=[],b=l+k,d=(B-1)/M;
!r.stacked&&(J/=C||1);for(var G=0;G<H;G++){g=[];for(var F=0;F<(C||1);F++){var L=C?c[F][G]:c[G],I=this.g.finger(n,b+J/2,Math.round(L*d),J-1,false,e).attr({stroke:"none",fill:m[C?F:G]});
if(C){A[F].push(I)}else{A.push(I)}I.x=n+Math.round(L*d);I.y=b+J/2;I.w=Math.round(L*d);
I.h=J;I.value=+L;if(!r.stacked){b+=J}else{g.push(I)}}if(r.stacked){var q=this.rect(n,g[0].y-g[0].h/2,B,J).attr(this.g.shim);
E.push(q);q.bars=this.set();var v=0;for(var t=g.length;t--;){g[t].toFront()}for(var t=0,D=g.length;
t<D;t++){var I=g[t],K,L=Math.round((v+I.value)*d),z=this.g.finger(n,I.y,L,J-1,false,e,1);
q.bars.push(I);v&&I.attr({path:z});I.w=L;I.x=n+L;h.push(K=this.rect(n+v*d,I.y-I.h/2,I.value*d,J).attr(this.g.shim));
K.bar=I;v+=I.value}b+=J}b+=k}E.toFront();b=l+k;if(!r.stacked){for(var G=0;G<H;G++){for(var F=0;
F<(C||1);F++){var K=this.rect(n,b,B,J).attr(this.g.shim);h.push(K);K.bar=C?A[F][G]:A[G];
K.value=K.bar.value;b+=J}b+=k}}u.label=function(R,P){R=R||[];this.labels=o.set();
for(var O=0;O<H;O++){for(var N=0;N<C;N++){var y=o.g.labelise(C?R[N]&&R[N][O]:R[O],C?c[N][O]:c[O],M);
var Q=P?A[O*(C||1)+N].x-J/2+3:n+5,x=P?"end":"start",s;this.labels.push(s=o.g.text(Q,A[O*(C||1)+N].y,y).attr({"text-anchor":x}).insertBefore(h[0]));
if(s.getBBox().x<n+5){s.attr({x:n+5,"text-anchor":"start"})}else{A[O*(C||1)+N].label=s
}}}return this};u.hover=function(j,i){E.hide();h.show();i=i||function(){};h.mouseover(j).mouseout(i);
return this};u.hoverColumn=function(j,i){h.hide();E.show();i=i||function(){};E.mouseover(j).mouseout(i);
return this};u.each=function(s){if(!Raphael.is(s,"function")){return this}for(var j=h.length;
j--;){s.call(h[j])}return this};u.eachColumn=function(s){if(!Raphael.is(s,"function")){return this
}for(var j=E.length;j--;){s.call(E[j])}return this};u.click=function(i){E.hide();
h.show();h.click(i);return this};u.clickColumn=function(i){h.hide();E.show();E.click(i);
return this};u.push(A,h,E);u.bars=A;u.covers=h;return u};
/*
 * g.Raphael 0.4.1 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.fn.g.dotchart=function(K,J,a,f,w,v,r,F){function Q(b){+b[0]&&(b[0]=c.g.axis(K+q,J+q,a-2*q,B,n,F.axisxstep||Math.floor((a-2*q)/20),2,F.axisxlabels||null,F.axisxtype||"t"));
+b[1]&&(b[1]=c.g.axis(K+a-q,J+f-q,f-2*q,A,m,F.axisystep||Math.floor((f-2*q)/20),3,F.axisylabels||null,F.axisytype||"t"));
+b[2]&&(b[2]=c.g.axis(K+q,J+f-q+E,a-2*q,B,n,F.axisxstep||Math.floor((a-2*q)/20),0,F.axisxlabels||null,F.axisxtype||"t"));
+b[3]&&(b[3]=c.g.axis(K+q-E,J+f-q,f-2*q,A,m,F.axisystep||Math.floor((f-2*q)/20),1,F.axisylabels||null,F.axisytype||"t"))
}F=F||{};var u=this.g.snapEnds(Math.min.apply(Math,w),Math.max.apply(Math,w),w.length-1),B=u.from,n=u.to,q=F.gutter||10,I=this.g.snapEnds(Math.min.apply(Math,v),Math.max.apply(Math,v),v.length-1),A=I.from,m=I.to,z=Math.max(w.length,v.length,r.length),t=this.g.markers[F.symbol]||"disc",G=this.set(),s=this.set(),D=F.max||100,p=Math.max.apply(Math,r),o=[],c=this,N=Math.sqrt(p/Math.PI)*2/D;
for(var O=0;O<z;O++){o[O]=Math.min(Math.sqrt(r[O]/Math.PI)*2/N,D)}q=Math.max.apply(Math,o.concat(q));
var C=this.set(),E=Math.max.apply(Math,o);if(F.axis){var l=(F.axis+"").split(/[,\s]+/);
Q(l);var P=[],S=[];for(var O=0,H=l.length;O<H;O++){var T=l[O].all?l[O].all.getBBox()[["height","width"][O%2]]:0;
P[O]=T+q;S[O]=T}q=Math.max.apply(Math,P.concat(q));for(var O=0,H=l.length;O<H;O++){if(l[O].all){l[O].remove();
l[O]=1}}Q(l);for(var O=0,H=l.length;O<H;O++){if(l[O].all){C.push(l[O].all)}}G.axis=C
}var M=(a-q*2)/((n-B)||1),L=(f-q*2)/((m-A)||1);for(var O=0,H=v.length;O<H;O++){var e=this.raphael.is(t,"array")?t[O]:t,j=K+q+(w[O]-B)*M,h=J+f-q-(v[O]-A)*L;
e&&o[O]&&s.push(this.g[e](j,h,o[O]).attr({fill:F.heat?this.g.colorValue(o[O],E):Raphael.fn.g.colors[0],"fill-opacity":F.opacity?o[O]/D:1,stroke:"none"}))
}var d=this.set();for(var O=0,H=v.length;O<H;O++){var j=K+q+(w[O]-B)*M,h=J+f-q-(v[O]-A)*L;
d.push(this.circle(j,h,E).attr(this.g.shim));F.href&&F.href[O]&&d[O].attr({href:F.href[O]});
d[O].r=+o[O].toFixed(3);d[O].x=+j.toFixed(3);d[O].y=+h.toFixed(3);d[O].X=w[O];d[O].Y=v[O];
d[O].value=r[O]||0;d[O].dot=s[O]}G.covers=d;G.series=s;G.push(s,C,d);G.hover=function(g,b){d.mouseover(g).mouseout(b);
return this};G.click=function(b){d.click(b);return this};G.each=function(g){if(!Raphael.is(g,"function")){return this
}for(var b=d.length;b--;){g.call(d[b])}return this};G.href=function(k){var g;for(var b=d.length;
b--;){g=d[b];if(g.X==k.x&&g.Y==k.y&&g.value==k.value){g.attr({href:k.href})}}};return G
};
/*
 * g.Raphael 0.4.1 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.fn.g.linechart=function(J,I,a,c,s,r,C){function B(y,Y){var x=y.length/Y,V=0,i=x,X=0,W=[];
while(V<y.length){i--;if(i<0){X+=y[V]*(1+i);W.push(X/x);X=y[V++]*-i;i+=x}else{X+=y[V++]
}}return W}C=C||{};if(!this.raphael.is(s[0],"array")){s=[s]}if(!this.raphael.is(r[0],"array")){r=[r]
}var O=Array.prototype.concat.apply([],s),M=Array.prototype.concat.apply([],r),o=this.g.snapEnds(Math.min.apply(Math,O),Math.max.apply(Math,O),s[0].length-1),v=o.from,h=o.to,l=C.gutter||10,P=(a-l*2)/(h-v),G=this.g.snapEnds(Math.min.apply(Math,M),Math.max.apply(Math,M),r[0].length-1),u=G.from,g=G.to,N=(c-l*2)/(g-u),t=Math.max(s[0].length,r[0].length),n=C.symbol||"",K=C.colors||Raphael.fn.g.colors,H=this,p=null,k=null,T=this.set(),L=[];
for(var S=0,E=r.length;S<E;S++){t=Math.max(t,r[S].length)}var U=this.set();for(var S=0,E=r.length;
S<E;S++){if(C.shade){U.push(this.path().attr({stroke:"none",fill:K[S],opacity:C.nostroke?1:0.3}))
}if(r[S].length>a-2*l){r[S]=B(r[S],a-2*l);t=a-2*l}if(s[S]&&s[S].length>a-2*l){s[S]=B(s[S],a-2*l)
}}var w=this.set();if(C.axis){var f=(C.axis+"").split(/[,\s]+/);+f[0]&&w.push(this.g.axis(J+l,I+l,a-2*l,v,h,C.axisxstep||Math.floor((a-2*l)/20),2));
+f[1]&&w.push(this.g.axis(J+a-l,I+c-l,c-2*l,u,g,C.axisystep||Math.floor((c-2*l)/20),3));
+f[2]&&w.push(this.g.axis(J+l,I+c-l,a-2*l,v,h,C.axisxstep||Math.floor((a-2*l)/20),0));
+f[3]&&w.push(this.g.axis(J+l,I+c-l,c-2*l,u,g,C.axisystep||Math.floor((c-2*l)/20),1))
}var F=this.set(),Q=this.set(),m;for(var S=0,E=r.length;S<E;S++){if(!C.nostroke){F.push(m=this.path().attr({stroke:K[S],"stroke-width":C.width||2,"stroke-linejoin":"round","stroke-linecap":"round","stroke-dasharray":C.dash||""}))
}var b=this.raphael.is(n,"array")?n[S]:n,z=this.set();L=[];for(var R=0,q=r[S].length;
R<q;R++){var e=J+l+((s[S]||s[0])[R]-v)*P;var d=I+c-l-(r[S][R]-u)*N;(Raphael.is(b,"array")?b[R]:b)&&z.push(this.g[Raphael.fn.g.markers[this.raphael.is(b,"array")?b[R]:b]](e,d,(C.width||2)*3).attr({fill:K[S],stroke:"none"}));
L=L.concat([R?"L":"M",e,d])}Q.push(z);if(C.shade){U[S].attr({path:L.concat(["L",e,I+c-l,"L",J+l+((s[S]||s[0])[0]-v)*P,I+c-l,"z"]).join(",")})
}!C.nostroke&&m.attr({path:L.join(",")})}function D(ae){var ab=[];for(var ac=0,ag=s.length;
ac<ag;ac++){ab=ab.concat(s[ac])}ab.sort();var ah=[],Y=[];for(var ac=0,ag=ab.length;
ac<ag;ac++){ab[ac]!=ab[ac-1]&&ah.push(ab[ac])&&Y.push(J+l+(ab[ac]-v)*P)}ab=ah;ag=ab.length;
var W=ae||H.set();for(var ac=0;ac<ag;ac++){var V=Y[ac]-(Y[ac]-(Y[ac-1]||J))/2,af=((Y[ac+1]||J+a)-Y[ac])/2+(Y[ac]-(Y[ac-1]||J))/2,x;
ae?(x={}):W.push(x=H.rect(V-1,I,Math.max(af+1,1),c).attr({stroke:"none",fill:"#000",opacity:0}));
x.values=[];x.symbols=H.set();x.y=[];x.x=Y[ac];x.axis=ab[ac];for(var aa=0,ad=r.length;
aa<ad;aa++){ah=s[aa]||s[0];for(var Z=0,y=ah.length;Z<y;Z++){if(ah[Z]==ab[ac]){x.values.push(r[aa][Z]);
x.y.push(I+c-l-(r[aa][Z]-u)*N);x.symbols.push(T.symbols[aa][Z])}}}ae&&ae.call(x)}!ae&&(p=W)
}function A(ac){var W=ac||H.set(),x;for(var aa=0,ae=r.length;aa<ae;aa++){for(var Z=0,ab=r[aa].length;
Z<ab;Z++){var V=J+l+((s[aa]||s[0])[Z]-v)*P,ad=J+l+((s[aa]||s[0])[Z?Z-1:1]-v)*P,y=I+c-l-(r[aa][Z]-u)*N;
ac?(x={}):W.push(x=H.circle(V,y,Math.abs(ad-V)/2).attr({stroke:"none",fill:"#000",opacity:0}));
x.x=V;x.y=y;x.value=r[aa][Z];x.line=T.lines[aa];x.shade=T.shades[aa];x.symbol=T.symbols[aa][Z];
x.symbols=T.symbols[aa];x.axis=(s[aa]||s[0])[Z];ac&&ac.call(x)}}!ac&&(k=W)}T.push(F,U,Q,w,p,k);
T.lines=F;T.shades=U;T.symbols=Q;T.axis=w;T.hoverColumn=function(j,i){!p&&D();p.mouseover(j).mouseout(i);
return this};T.clickColumn=function(i){!p&&D();p.click(i);return this};T.hrefColumn=function(W){var X=H.raphael.is(arguments[0],"array")?arguments[0]:arguments;
if(!(arguments.length-1)&&typeof W=="object"){for(var j in W){for(var y=0,V=p.length;
y<V;y++){if(p[y].axis==j){p[y].attr("href",W[j])}}}}!p&&D();for(var y=0,V=X.length;
y<V;y++){p[y]&&p[y].attr("href",X[y])}return this};T.hover=function(j,i){!k&&A();
k.mouseover(j).mouseout(i);return this};T.click=function(i){!k&&A();k.click(i);return this
};T.each=function(i){A(i);return this};T.eachColumn=function(i){D(i);return this};
return T};Raphael.fn.g.piechart=function(e,d,o,b,l){l=l||{};var k=this,m=[],g=this.set(),n=this.set(),j=this.set(),u=[],w=b.length,x=0,A=0,z=0,c=9,y=true;
n.covers=g;if(w==1){j.push(this.circle(e,d,o).attr({fill:this.g.colors[0],stroke:l.stroke||"#fff","stroke-width":l.strokewidth==null?1:l.strokewidth}));
g.push(this.circle(e,d,o).attr(this.g.shim));A=b[0];b[0]={value:b[0],order:0,valueOf:function(){return this.value
}};j[0].middle={x:e,y:d};j[0].mangle=180}else{function t(F,E,i,H,D,M){var J=Math.PI/180,B=F+i*Math.cos(-H*J),p=F+i*Math.cos(-D*J),G=F+i/2*Math.cos(-(H+(D-H)/2)*J),L=E+i*Math.sin(-H*J),K=E+i*Math.sin(-D*J),C=E+i/2*Math.sin(-(H+(D-H)/2)*J),I=["M",F,E,"L",B,L,"A",i,i,0,+(Math.abs(D-H)>180),1,p,K,"z"];
I.middle={x:G,y:C};return I}for(var v=0;v<w;v++){A+=b[v];b[v]={value:b[v],order:v,valueOf:function(){return this.value
}}}b.sort(function(p,i){return i.value-p.value});for(v=0;v<w;v++){if(y&&b[v]*360/A<=1.5){c=v;
y=false}if(v>c){y=false;b[c].value+=b[v];b[c].others=true;z=b[c].value}}w=Math.min(c+1,b.length);
z&&b.splice(w)&&(b[c].others=true);for(v=0;v<w;v++){var f=x-360*b[v]/A/2;if(!v){x=90-f;
f=x-360*b[v]/A/2}if(l.init){var h=t(e,d,1,x,x-360*b[v]/A).join(",")}var s=t(e,d,o,x,x-=360*b[v]/A);
var q=this.path(l.init?h:s).attr({fill:l.colors&&l.colors[v]||this.g.colors[v]||"#666",stroke:l.stroke||"#fff","stroke-width":(l.strokewidth==null?1:l.strokewidth),"stroke-linejoin":"round"});
q.value=b[v];q.middle=s.middle;q.mangle=f;m.push(q);j.push(q);l.init&&q.animate({path:s.join(",")},(+l.init-1)||1000,">")
}for(v=0;v<w;v++){q=k.path(m[v].attr("path")).attr(this.g.shim);l.href&&l.href[v]&&q.attr({href:l.href[v]});
q.attr=function(){};g.push(q);j.push(q)}}n.hover=function(C,r){r=r||function(){};
var B=this;for(var p=0;p<w;p++){(function(D,E,i){var F={sector:D,cover:E,cx:e,cy:d,mx:D.middle.x,my:D.middle.y,mangle:D.mangle,r:o,value:b[i],total:A,label:B.labels&&B.labels[i]};
E.mouseover(function(){C.call(F)}).mouseout(function(){r.call(F)})})(j[p],g[p],p)
}return this};n.each=function(B){var r=this;for(var p=0;p<w;p++){(function(C,D,i){var E={sector:C,cover:D,cx:e,cy:d,x:C.middle.x,y:C.middle.y,mangle:C.mangle,r:o,value:b[i],total:A,label:r.labels&&r.labels[i]};
B.call(E)})(j[p],g[p],p)}return this};n.click=function(B){var r=this;for(var p=0;
p<w;p++){(function(C,D,i){var E={sector:C,cover:D,cx:e,cy:d,mx:C.middle.x,my:C.middle.y,mangle:C.mangle,r:o,value:b[i],total:A,label:r.labels&&r.labels[i]};
D.click(function(){B.call(E)})})(j[p],g[p],p)}return this};n.inject=function(i){i.insertBefore(g[0])
};var a=function(G,B,r,p){var K=e+o+o/5,J=d,F=J+10;G=G||[];p=(p&&p.toLowerCase&&p.toLowerCase())||"east";
r=k.g.markers[r&&r.toLowerCase()]||"disc";n.labels=k.set();for(var E=0;E<w;E++){var L=j[E].attr("fill"),C=b[E].order,D;
b[E].others&&(G[C]=B||"Others");G[C]=k.g.labelise(G[C],b[E],A);n.labels.push(k.set());
n.labels[E].push(k.g[r](K+5,F,5).attr({fill:L,stroke:"none"}));n.labels[E].push(D=k.text(K+20,F,G[C]||b[C]).attr(k.g.txtattr).attr({fill:l.legendcolor||"#000","text-anchor":"start"}));
g[E].label=n.labels[E];F+=D.getBBox().height*1.2}var H=n.labels.getBBox(),I={east:[0,-H.height/2],west:[-H.width-2*o-20,-H.height/2],north:[-o-H.width/2,-o-H.height-10],south:[-o-H.width/2,o+10]}[p];
n.labels.translate.apply(n.labels,I);n.push(n.labels)};if(l.legend){a(l.legend,l.legendothers,l.legendmark,l.legendpos)
}n.push(j,g);n.series=j;n.covers=g;return n};if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("raphael_views/g_raphael")
};