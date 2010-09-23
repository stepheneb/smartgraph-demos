Raphael.fn.g.barchart=function(X,Z,au,aq,i,ad){ad=ad||{};var h={round:"round",sharp:"sharp",soft:"soft"}[ad.type]||"square",aj=parseFloat(ad.gutter||"20%"),s=this.set(),ac=this.set(),ap=this.set(),af=this.set(),ab=Math.max.apply(Math,i),j=[],ar=this,Y=0,U=ad.colors||this.g.colors,ag=i.length;
if(this.raphael.is(i[0],"array")){ab=[];Y=ag;ag=0;for(var y=i.length;y--;){ac.push(this.set());
ab.push(Math.max.apply(Math,i[y]));ag=Math.max(ag,i[y].length)}if(ad.stacked){for(var y=ag;
y--;){var al=0;for(var Q=i.length;Q--;){al+=+i[Q][y]||0}j.push(al)}}for(var y=i.length;
y--;){if(i[y].length<ag){for(var Q=ag;Q--;){i[y].push(0)}}}ab=Math.max.apply(Math,ad.stacked?j:ab)
}ab=(ad.to)||ab;var W=au/(ag*(100+aj)+aj)*100,at=W*aj/100,an=ad.vgutter==null?20:ad.vgutter,ae=[],am=X+at,ao=(aq-2*an)/ab;
if(!ad.stretch){at=Math.round(at);W=Math.floor(W)}!ad.stacked&&(W/=Y||1);for(var y=0;
y<ag;y++){ae=[];for(var Q=0;Q<(Y||1);Q++){var x=Math.round((Y?i[Q][y]:i[y])*ao),ak=Z+aq-an-x,S=this.g.finger(Math.round(am+W/2),ak+x,W,x,true,h).attr({stroke:"none",fill:U[Y?Q:y]});
if(Y){ac[Q].push(S)}else{ac.push(S)}S.y=ak;S.x=Math.round(am+W/2);S.w=W;S.h=x;S.value=Y?i[Q][y]:i[y];
if(!ad.stacked){am+=W}else{ae.push(S)}}if(ad.stacked){var R;af.push(R=this.rect(ae[0].x-ae[0].w/2,Z,W,aq).attr(this.g.shim));
R.bars=this.set();var ai=0;for(var V=ae.length;V--;){ae[V].toFront()}for(var V=0,ah=ae.length;
V<ah;V++){var S=ae[V],aa,x=(ai+S.value)*ao,T=this.g.finger(S.x,Z+aq-an-!!ai*0.5,W,x,true,h,1);
R.bars.push(S);ai&&S.attr({path:T});S.h=x;S.y=Z+aq-an-!!ai*0.5-x;ap.push(aa=this.rect(S.x-S.w/2,S.y,W,S.value*ao).attr(this.g.shim));
aa.bar=S;aa.value=S.value;ai+=S.value}am+=W}am+=at}af.toFront();am=X+at;if(!ad.stacked){for(var y=0;
y<ag;y++){for(var Q=0;Q<(Y||1);Q++){var aa;ap.push(aa=this.rect(Math.round(am),Z+an,W,aq-an).attr(this.g.shim));
aa.bar=Y?ac[Q][y]:ac[y];aa.value=aa.bar.value;am+=W}am+=at}}s.label=function(k,c){k=k||[];
this.labels=ar.set();var b,g=-Infinity;if(ad.stacked){for(var l=0;l<ag;l++){var f=0;
for(var m=0;m<(Y||1);m++){f+=Y?i[m][l]:i[l];if(m==Y-1){var a=ar.g.labelise(k[l],f,ab);
b=ar.g.text(ac[l*(Y||1)+m].x,Z+aq-an/2,a).insertBefore(ap[l*(Y||1)+m]);var e=b.getBBox();
if(e.x-7<g){b.remove()}else{this.labels.push(b);g=e.x+e.width}}}}}else{for(var l=0;
l<ag;l++){for(var m=0;m<(Y||1);m++){var a=ar.g.labelise(Y?k[m]&&k[m][l]:k[l],Y?i[m][l]:i[l],ab);
b=ar.g.text(ac[l*(Y||1)+m].x,c?Z+aq-an/2:ac[l*(Y||1)+m].y-10,a).insertBefore(ap[l*(Y||1)+m]);
var e=b.getBBox();if(e.x-7<g){b.remove()}else{this.labels.push(b);g=e.x+e.width}}}}return this
};s.hover=function(a,b){af.hide();ap.show();ap.mouseover(a).mouseout(b);return this
};s.hoverColumn=function(a,b){ap.hide();af.show();b=b||function(){};af.mouseover(a).mouseout(b);
return this};s.click=function(a){af.hide();ap.show();ap.click(a);return this};s.each=function(a){if(!Raphael.is(a,"function")){return this
}for(var b=ap.length;b--;){a.call(ap[b])}return this};s.eachColumn=function(a){if(!Raphael.is(a,"function")){return this
}for(var b=af.length;b--;){a.call(af[b])}return this};s.clickColumn=function(a){ap.hide();
af.show();af.click(a);return this};s.push(ac,ap,af);s.bars=ac;s.covers=ap;return s
};Raphael.fn.g.hbarchart=function(ae,ag,aa,P,an,Y){Y=Y||{};var al={round:"round",sharp:"sharp",soft:"soft"}[Y.type]||"square",ak=parseFloat(Y.gutter||"20%"),T=this.set(),ac=this.set(),ai=this.set(),V=this.set(),i=Math.max.apply(Math,an),ap=[],ad=this,X=0,af=Y.colors||this.g.colors,O=an.length;
if(this.raphael.is(an[0],"array")){i=[];X=O;O=0;for(var R=an.length;R--;){ac.push(this.set());
i.push(Math.max.apply(Math,an[R]));O=Math.max(O,an[R].length)}if(Y.stacked){for(var R=O;
R--;){var ab=0;for(var S=an.length;S--;){ab+=+an[S][R]||0}ap.push(ab)}}for(var R=an.length;
R--;){if(an[R].length<O){for(var S=O;S--;){an[R].push(0)}}}i=Math.max.apply(Math,Y.stacked?ap:i)
}i=(Y.to)||i;var y=Math.floor(P/(O*(100+ak)+ak)*100),ah=Math.floor(y*ak/100),aj=[],ao=ag+ah,am=(aa-1)/i;
!Y.stacked&&(y/=X||1);for(var R=0;R<O;R++){aj=[];for(var S=0;S<(X||1);S++){var j=X?an[S][R]:an[R],N=this.g.finger(ae,ao+y/2,Math.round(j*am),y-1,false,al).attr({stroke:"none",fill:af[X?S:R]});
if(X){ac[S].push(N)}else{ac.push(N)}N.x=ae+Math.round(j*am);N.y=ao+y/2;N.w=Math.round(j*am);
N.h=y;N.value=+j;if(!Y.stacked){ao+=y}else{aj.push(N)}}if(Y.stacked){var Z=this.rect(ae,aj[0].y-aj[0].h/2,aa,y).attr(this.g.shim);
V.push(Z);Z.bars=this.set();var Q=0;for(var U=aj.length;U--;){aj[U].toFront()}for(var U=0,W=aj.length;
U<W;U++){var N=aj[U],x,j=Math.round((Q+N.value)*am),s=this.g.finger(ae,N.y,j,y-1,false,al,1);
Z.bars.push(N);Q&&N.attr({path:s});N.w=j;N.x=ae+j;ai.push(x=this.rect(ae+Q*am,N.y-N.h/2,N.value*am,y).attr(this.g.shim));
x.bar=N;Q+=N.value}ao+=y}ao+=ah}V.toFront();ao=ag+ah;if(!Y.stacked){for(var R=0;R<O;
R++){for(var S=0;S<(X||1);S++){var x=this.rect(ae,ao,aa,y).attr(this.g.shim);ai.push(x);
x.bar=X?ac[S][R]:ac[R];x.value=x.bar.value;ao+=y}ao+=ah}}T.label=function(c,f){c=c||[];
this.labels=ad.set();for(var g=0;g<O;g++){for(var h=0;h<X;h++){var k=ad.g.labelise(X?c[h]&&c[h][g]:c[g],X?an[h][g]:an[g],i);
var e=f?ac[g*(X||1)+h].x-y/2+3:ae+5,a=f?"end":"start",b;this.labels.push(b=ad.g.text(e,ac[g*(X||1)+h].y,k).attr({"text-anchor":a}).insertBefore(ai[0]));
if(b.getBBox().x<ae+5){b.attr({x:ae+5,"text-anchor":"start"})}else{ac[g*(X||1)+h].label=b
}}}return this};T.hover=function(a,b){V.hide();ai.show();b=b||function(){};ai.mouseover(a).mouseout(b);
return this};T.hoverColumn=function(a,b){ai.hide();V.show();b=b||function(){};V.mouseover(a).mouseout(b);
return this};T.each=function(b){if(!Raphael.is(b,"function")){return this}for(var a=ai.length;
a--;){b.call(ai[a])}return this};T.eachColumn=function(b){if(!Raphael.is(b,"function")){return this
}for(var a=V.length;a--;){b.call(V[a])}return this};T.click=function(a){V.hide();
ai.show();ai.click(a);return this};T.clickColumn=function(a){ai.hide();V.show();V.click(a);
return this};T.push(ac,ai,V);T.bars=ac;T.covers=ai;return T};
/*
 * g.Raphael 0.4.1 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.fn.g.barchart=function(E,C,a,e,Q,w){w=w||{};
var R={round:"round",sharp:"sharp",soft:"soft"}[w.type]||"square",o=parseFloat(w.gutter||"20%"),O=this.set(),z=this.set(),f=this.set(),u=this.set(),A=Math.max.apply(Math,Q),P=[],c=this,D=0,H=w.colors||this.g.colors,t=Q.length;
if(this.raphael.is(Q[0],"array")){A=[];D=t;t=0;for(var M=Q.length;M--;){z.push(this.set());
A.push(Math.max.apply(Math,Q[M]));t=Math.max(t,Q[M].length)}if(w.stacked){for(var M=t;
M--;){var m=0;for(var L=Q.length;L--;){m+=+Q[L][M]||0}P.push(m)}}for(var M=Q.length;
M--;){if(Q[M].length<t){for(var L=t;L--;){Q[M].push(0)}}}A=Math.max.apply(Math,w.stacked?P:A)
}A=(w.to)||A;var F=a/(t*(100+o)+o)*100,b=F*o/100,k=w.vgutter==null?20:w.vgutter,v=[],l=E+b,g=(e-2*k)/A;
if(!w.stretch){b=Math.round(b);F=Math.floor(F)}!w.stacked&&(F/=D||1);for(var M=0;
M<t;M++){v=[];for(var L=0;L<(D||1);L++){var N=Math.round((D?Q[L][M]:Q[M])*g),n=C+e-k-N,J=this.g.finger(Math.round(l+F/2),n+N,F,N,true,R).attr({stroke:"none",fill:H[D?L:M]});
if(D){z[L].push(J)}else{z.push(J)}J.y=n;J.x=Math.round(l+F/2);J.w=F;J.h=N;J.value=D?Q[L][M]:Q[M];
if(!w.stacked){l+=F}else{v.push(J)}}if(w.stacked){var K;u.push(K=this.rect(v[0].x-v[0].w/2,C,F,e).attr(this.g.shim));
K.bars=this.set();var p=0;for(var G=v.length;G--;){v[G].toFront()}for(var G=0,q=v.length;
G<q;G++){var J=v[G],B,N=(p+J.value)*g,I=this.g.finger(J.x,C+e-k-!!p*0.5,F,N,true,R,1);
K.bars.push(J);p&&J.attr({path:I});J.h=N;J.y=C+e-k-!!p*0.5-N;f.push(B=this.rect(J.x-J.w/2,J.y,F,J.value*g).attr(this.g.shim));
B.bar=J;B.value=J.value;p+=J.value}l+=F}l+=b}u.toFront();l=E+b;if(!w.stacked){for(var M=0;
M<t;M++){for(var L=0;L<(D||1);L++){var B;f.push(B=this.rect(Math.round(l),C+k,F,e-k).attr(this.g.shim));
B.bar=D?z[L][M]:z[M];B.value=B.bar.value;l+=F}l+=b}}O.label=function(y,U){y=y||[];
this.labels=c.set();var V,h=-Infinity;if(w.stacked){for(var x=0;x<t;x++){var S=0;
for(var s=0;s<(D||1);s++){S+=D?Q[s][x]:Q[x];if(s==D-1){var W=c.g.labelise(y[x],S,A);
V=c.g.text(z[x*(D||1)+s].x,C+e-k/2,W).insertBefore(f[x*(D||1)+s]);var T=V.getBBox();
if(T.x-7<h){V.remove()}else{this.labels.push(V);h=T.x+T.width}}}}}else{for(var x=0;
x<t;x++){for(var s=0;s<(D||1);s++){var W=c.g.labelise(D?y[s]&&y[s][x]:y[x],D?Q[s][x]:Q[x],A);
V=c.g.text(z[x*(D||1)+s].x,U?C+e-k/2:z[x*(D||1)+s].y-10,W).insertBefore(f[x*(D||1)+s]);
var T=V.getBBox();if(T.x-7<h){V.remove()}else{this.labels.push(V);h=T.x+T.width}}}}return this
};O.hover=function(i,h){u.hide();f.show();f.mouseover(i).mouseout(h);return this};
O.hoverColumn=function(i,h){f.hide();u.show();h=h||function(){};u.mouseover(i).mouseout(h);
return this};O.click=function(h){u.hide();f.show();f.click(h);return this};O.each=function(j){if(!Raphael.is(j,"function")){return this
}for(var h=f.length;h--;){j.call(f[h])}return this};O.eachColumn=function(j){if(!Raphael.is(j,"function")){return this
}for(var h=u.length;h--;){j.call(u[h])}return this};O.clickColumn=function(h){f.hide();
u.show();u.click(h);return this};O.push(z,f,u);O.bars=z;O.covers=f;return O};Raphael.fn.g.hbarchart=function(o,m,D,A,c,u){u=u||{};
var f={round:"round",sharp:"sharp",soft:"soft"}[u.type]||"square",g=parseFloat(u.gutter||"20%"),w=this.set(),C=this.set(),k=this.set(),G=this.set(),O=Math.max.apply(Math,c),a=[],p=this,E=0,n=u.colors||this.g.colors,J=c.length;
if(this.raphael.is(c[0],"array")){O=[];E=J;J=0;for(var I=c.length;I--;){C.push(this.set());
O.push(Math.max.apply(Math,c[I]));J=Math.max(J,c[I].length)}if(u.stacked){for(var I=J;
I--;){var q=0;for(var H=c.length;H--;){q+=+c[H][I]||0}a.push(q)}}for(var I=c.length;
I--;){if(c[I].length<J){for(var H=J;H--;){c[I].push(0)}}}O=Math.max.apply(Math,u.stacked?a:O)
}O=(u.to)||O;var L=Math.floor(A/(J*(100+g)+g)*100),l=Math.floor(L*g/100),h=[],b=m+l,e=(D-1)/O;
!u.stacked&&(L/=E||1);for(var I=0;I<J;I++){h=[];for(var H=0;H<(E||1);H++){var N=E?c[H][I]:c[I],K=this.g.finger(o,b+L/2,Math.round(N*e),L-1,false,f).attr({stroke:"none",fill:n[E?H:I]});
if(E){C[H].push(K)}else{C.push(K)}K.x=o+Math.round(N*e);K.y=b+L/2;K.w=Math.round(N*e);
K.h=L;K.value=+N;if(!u.stacked){b+=L}else{h.push(K)}}if(u.stacked){var t=this.rect(o,h[0].y-h[0].h/2,D,L).attr(this.g.shim);
G.push(t);t.bars=this.set();var z=0;for(var v=h.length;v--;){h[v].toFront()}for(var v=0,F=h.length;
v<F;v++){var K=h[v],M,N=Math.round((z+K.value)*e),B=this.g.finger(o,K.y,N,L-1,false,f,1);
t.bars.push(K);z&&K.attr({path:B});K.w=N;K.x=o+N;k.push(M=this.rect(o+z*e,K.y-K.h/2,K.value*e,L).attr(this.g.shim));
M.bar=K;z+=K.value}b+=L}b+=l}G.toFront();b=m+l;if(!u.stacked){for(var I=0;I<J;I++){for(var H=0;
H<(E||1);H++){var M=this.rect(o,b,D,L).attr(this.g.shim);k.push(M);M.bar=E?C[H][I]:C[I];
M.value=M.bar.value;b+=L}b+=l}}w.label=function(T,R){T=T||[];this.labels=p.set();
for(var Q=0;Q<J;Q++){for(var P=0;P<E;P++){var y=p.g.labelise(E?T[P]&&T[P][Q]:T[Q],E?c[P][Q]:c[Q],O);
var S=R?C[Q*(E||1)+P].x-L/2+3:o+5,x=R?"end":"start",s;this.labels.push(s=p.g.text(S,C[Q*(E||1)+P].y,y).attr({"text-anchor":x}).insertBefore(k[0]));
if(s.getBBox().x<o+5){s.attr({x:o+5,"text-anchor":"start"})}else{C[Q*(E||1)+P].label=s
}}}return this};w.hover=function(j,i){G.hide();k.show();i=i||function(){};k.mouseover(j).mouseout(i);
return this};w.hoverColumn=function(j,i){k.hide();G.show();i=i||function(){};G.mouseover(j).mouseout(i);
return this};w.each=function(s){if(!Raphael.is(s,"function")){return this}for(var j=k.length;
j--;){s.call(k[j])}return this};w.eachColumn=function(s){if(!Raphael.is(s,"function")){return this
}for(var j=G.length;j--;){s.call(G[j])}return this};w.click=function(i){G.hide();
k.show();k.click(i);return this};w.clickColumn=function(i){k.hide();G.show();G.click(i);
return this};w.push(C,k,G);w.bars=C;w.covers=k;return w};Raphael.fn.g.dotchart=function(V,W,aA,aw,ah,ai,am,aa){function i(a){+a[0]&&(a[0]=az.g.axis(V+an,W+an,aA-2*an,ae,aq,aa.axisxstep||Math.floor((aA-2*an)/20),2,aa.axisxlabels||null,aa.axisxtype||"t"));
+a[1]&&(a[1]=az.g.axis(V+aA-an,W+aw-an,aw-2*an,af,ar,aa.axisystep||Math.floor((aw-2*an)/20),3,aa.axisylabels||null,aa.axisytype||"t"));
+a[2]&&(a[2]=az.g.axis(V+an,W+aw-an+ab,aA-2*an,ae,aq,aa.axisxstep||Math.floor((aA-2*an)/20),0,aa.axisxlabels||null,aa.axisxtype||"t"));
+a[3]&&(a[3]=az.g.axis(V+an-ab,W+aw-an,aw-2*an,af,ar,aa.axisystep||Math.floor((aw-2*an)/20),1,aa.axisylabels||null,aa.axisytype||"t"))
}aa=aa||{};var aj=this.g.snapEnds(Math.min.apply(Math,ah),Math.max.apply(Math,ah),ah.length-1),ae=aj.from,aq=aj.to,an=aa.gutter||10,X=this.g.snapEnds(Math.min.apply(Math,ai),Math.max.apply(Math,ai),ai.length-1),af=X.from,ar=X.to,ag=Math.max(ah.length,ai.length,am.length),ak=this.g.markers[aa.symbol]||"disc",Z=this.set(),al=this.set(),ac=aa.max||100,ao=Math.max.apply(Math,am),ap=[],az=this,y=Math.sqrt(ao/Math.PI)*2/ac;
for(var x=0;x<ag;x++){ap[x]=Math.min(Math.sqrt(am[x]/Math.PI)*2/y,ac)}an=Math.max.apply(Math,ap.concat(an));
var ad=this.set(),ab=Math.max.apply(Math,ap);if(aa.axis){var at=(aa.axis+"").split(/[,\s]+/);
i(at);var k=[],g=[];for(var x=0,Y=at.length;x<Y;x++){var b=at[x].all?at[x].all.getBBox()[["height","width"][x%2]]:0;
k[x]=b+an;g[x]=b}an=Math.max.apply(Math,k.concat(an));for(var x=0,Y=at.length;x<Y;
x++){if(at[x].all){at[x].remove();at[x]=1}}i(at);for(var x=0,Y=at.length;x<Y;x++){if(at[x].all){ad.push(at[x].all)
}}Z.axis=ad}var R=(aA-an*2)/((aq-ae)||1),U=(aw-an*2)/((ar-af)||1);for(var x=0,Y=ai.length;
x<Y;x++){var ax=this.raphael.is(ak,"array")?ak[x]:ak,au=V+an+(ah[x]-ae)*R,av=W+aw-an-(ai[x]-af)*U;
ax&&ap[x]&&al.push(this.g[ax](au,av,ap[x]).attr({fill:aa.heat?this.g.colorValue(ap[x],ab):Raphael.fn.g.colors[0],"fill-opacity":aa.opacity?ap[x]/ac:1,stroke:"none"}))
}var ay=this.set();for(var x=0,Y=ai.length;x<Y;x++){var au=V+an+(ah[x]-ae)*R,av=W+aw-an-(ai[x]-af)*U;
ay.push(this.circle(au,av,ab).attr(this.g.shim));aa.href&&aa.href[x]&&ay[x].attr({href:aa.href[x]});
ay[x].r=+ap[x].toFixed(3);ay[x].x=+au.toFixed(3);ay[x].y=+av.toFixed(3);ay[x].X=ah[x];
ay[x].Y=ai[x];ay[x].value=am[x]||0;ay[x].dot=al[x]}Z.covers=ay;Z.series=al;Z.push(al,ad,ay);
Z.hover=function(c,a){ay.mouseover(c).mouseout(a);return this};Z.click=function(a){ay.click(a);
return this};Z.each=function(c){if(!Raphael.is(c,"function")){return this}for(var a=ay.length;
a--;){c.call(ay[a])}return this};Z.href=function(c){var e;for(var a=ay.length;a--;
){e=ay[a];if(e.X==c.x&&e.Y==c.y&&e.value==c.value){e.attr({href:c.href})}}};return Z
};
/*
 * g.Raphael 0.4.1 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.fn.g.dotchart=function(M,L,a,h,A,z,t,H){function T(b){+b[0]&&(b[0]=c.g.axis(M+s,L+s,a-2*s,D,o,H.axisxstep||Math.floor((a-2*s)/20),2,H.axisxlabels||null,H.axisxtype||"t"));
+b[1]&&(b[1]=c.g.axis(M+a-s,L+h-s,h-2*s,C,n,H.axisystep||Math.floor((h-2*s)/20),3,H.axisylabels||null,H.axisytype||"t"));
+b[2]&&(b[2]=c.g.axis(M+s,L+h-s+G,a-2*s,D,o,H.axisxstep||Math.floor((a-2*s)/20),0,H.axisxlabels||null,H.axisxtype||"t"));
+b[3]&&(b[3]=c.g.axis(M+s-G,L+h-s,h-2*s,C,n,H.axisystep||Math.floor((h-2*s)/20),1,H.axisylabels||null,H.axisytype||"t"))
}H=H||{};var w=this.g.snapEnds(Math.min.apply(Math,A),Math.max.apply(Math,A),A.length-1),D=w.from,o=w.to,s=H.gutter||10,K=this.g.snapEnds(Math.min.apply(Math,z),Math.max.apply(Math,z),z.length-1),C=K.from,n=K.to,B=Math.max(A.length,z.length,t.length),v=this.g.markers[H.symbol]||"disc",I=this.set(),u=this.set(),F=H.max||100,q=Math.max.apply(Math,t),p=[],c=this,P=Math.sqrt(q/Math.PI)*2/F;
for(var Q=0;Q<B;Q++){p[Q]=Math.min(Math.sqrt(t[Q]/Math.PI)*2/P,F)}s=Math.max.apply(Math,p.concat(s));
var E=this.set(),G=Math.max.apply(Math,p);if(H.axis){var m=(H.axis+"").split(/[,\s]+/);
T(m);var S=[],U=[];for(var Q=0,J=m.length;Q<J;Q++){var V=m[Q].all?m[Q].all.getBBox()[["height","width"][Q%2]]:0;
S[Q]=V+s;U[Q]=V}s=Math.max.apply(Math,S.concat(s));for(var Q=0,J=m.length;Q<J;Q++){if(m[Q].all){m[Q].remove();
m[Q]=1}}T(m);for(var Q=0,J=m.length;Q<J;Q++){if(m[Q].all){E.push(m[Q].all)}}I.axis=E
}var O=(a-s*2)/((o-D)||1),N=(h-s*2)/((n-C)||1);for(var Q=0,J=z.length;Q<J;Q++){var f=this.raphael.is(v,"array")?v[Q]:v,l=M+s+(A[Q]-D)*O,j=L+h-s-(z[Q]-C)*N;
f&&p[Q]&&u.push(this.g[f](l,j,p[Q]).attr({fill:H.heat?this.g.colorValue(p[Q],G):Raphael.fn.g.colors[0],"fill-opacity":H.opacity?p[Q]/F:1,stroke:"none"}))
}var e=this.set();for(var Q=0,J=z.length;Q<J;Q++){var l=M+s+(A[Q]-D)*O,j=L+h-s-(z[Q]-C)*N;
e.push(this.circle(l,j,G).attr(this.g.shim));H.href&&H.href[Q]&&e[Q].attr({href:H.href[Q]});
e[Q].r=+p[Q].toFixed(3);e[Q].x=+l.toFixed(3);e[Q].y=+j.toFixed(3);e[Q].X=A[Q];e[Q].Y=z[Q];
e[Q].value=t[Q]||0;e[Q].dot=u[Q]}I.covers=e;I.series=u;I.push(u,E,e);I.hover=function(g,b){e.mouseover(g).mouseout(b);
return this};I.click=function(b){e.click(b);return this};I.each=function(g){if(!Raphael.is(g,"function")){return this
}for(var b=e.length;b--;){g.call(e[b])}return this};I.href=function(k){var g;for(var b=e.length;
b--;){g=e[b];if(g.X==k.x&&g.Y==k.y&&g.value==k.value){g.attr({href:k.href})}}};return I
};Raphael.fn.g.linechart=function(ai,aj,aU,aS,aE,aF,ap){function aq(b,f){var e=b.length/f,k=0,c=e,g=0,h=[];
while(k<b.length){c--;if(c<0){g+=b[k]*(1+c);h.push(g/e);g=b[k++]*-c;c+=e}else{g+=b[k++]
}}return h}function af(e,f,l,o,t,b){var n=(l-e)/2,q=(t-l)/2,k=Math.atan((l-e)/Math.abs(o-f)),m=Math.atan((t-l)/Math.abs(o-b));
k=f<o?Math.PI-k:k;m=b<o?Math.PI-m:m;var c=Math.PI/2-((k+m)%(Math.PI*2))/2,g=n*Math.sin(c+k),p=n*Math.cos(c+k),h=q*Math.sin(c+m),s=q*Math.cos(c+m);
return{x1:l-g,y1:o+p,x2:l+h,y2:o+s}}ap=ap||{};if(!this.raphael.is(aE[0],"array")){aE=[aE]
}if(!this.raphael.is(aF[0],"array")){aF=[aF]}var aL=ap.gutter||10,aD=Math.max(aE[0].length,aF[0].length),aJ=ap.symbol||"",ae=ap.colors||Raphael.fn.g.colors,ak=this,aH=null,aM=null,ay=this.set(),Y=[];
for(var az=0,an=aF.length;az<an;az++){aD=Math.max(aD,aF[az].length)}var av=this.set();
for(az=0,an=aF.length;az<an;az++){if(ap.shade){av.push(this.path().attr({stroke:"none",fill:ae[az],opacity:ap.nostroke?1:0.3}))
}if(aF[az].length>aU-2*aL){aF[az]=aq(aF[az],aU-2*aL);aD=aU-2*aL}if(aE[az]&&aE[az].length>aU-2*aL){aE[az]=aq(aE[az],aU-2*aL)
}}var x=Array.prototype.concat.apply([],aE),X=Array.prototype.concat.apply([],aF),aI=this.g.snapEnds(Math.min.apply(Math,x),Math.max.apply(Math,x),aE[0].length-1),aA=aI.from,aN=aI.to,al=this.g.snapEnds(Math.min.apply(Math,X),Math.max.apply(Math,X),aF[0].length-1),aC=al.from,aO=al.to,j=(aU-aL*2)/((aN-aA)||1),y=(aS-aL*2)/((aO-aC)||1);
var aw=this.set();if(ap.axis){var aP=(ap.axis+"").split(/[,\s]+/);+aP[0]&&aw.push(this.g.axis(ai+aL,aj+aL,aU-2*aL,aA,aN,ap.axisxstep||Math.floor((aU-2*aL)/20),2));
+aP[1]&&aw.push(this.g.axis(ai+aU-aL,aj+aS-aL,aS-2*aL,aC,aO,ap.axisystep||Math.floor((aS-2*aL)/20),3));
+aP[2]&&aw.push(this.g.axis(ai+aL,aj+aS-aL,aU-2*aL,aA,aN,ap.axisxstep||Math.floor((aU-2*aL)/20),0));
+aP[3]&&aw.push(this.g.axis(ai+aL,aj+aS-aL,aS-2*aL,aC,aO,ap.axisystep||Math.floor((aS-2*aL)/20),1))
}var am=this.set(),i=this.set(),aK;for(az=0,an=aF.length;az<an;az++){if(!ap.nostroke){am.push(aK=this.path().attr({stroke:ae[az],"stroke-width":ap.width||2,"stroke-linejoin":"round","stroke-linecap":"round","stroke-dasharray":ap.dash||""}))
}var aT=this.raphael.is(aJ,"array")?aJ[az]:aJ,au=this.set();Y=[];for(var a=0,aG=aF[az].length;
a<aG;a++){var aQ=ai+aL+((aE[az]||aE[0])[a]-aA)*j,aR=aj+aS-aL-(aF[az][a]-aC)*y;(Raphael.is(aT,"array")?aT[a]:aT)&&au.push(this.g[Raphael.fn.g.markers[this.raphael.is(aT,"array")?aT[a]:aT]](aQ,aR,(ap.width||2)*3).attr({fill:ae[az],stroke:"none"}));
if(ap.smooth){if(a&&a!=aG-1){var ag=ai+aL+((aE[az]||aE[0])[a-1]-aA)*j,ax=aj+aS-aL-(aF[az][a-1]-aC)*y,ah=ai+aL+((aE[az]||aE[0])[a+1]-aA)*j,aB=aj+aS-aL-(aF[az][a+1]-aC)*y;
var at=af(ag,ax,aQ,aR,ah,aB);Y=Y.concat([at.x1,at.y1,aQ,aR,at.x2,at.y2])}if(!a){Y=["M",aQ,aR,"C",aQ,aR]
}}else{Y=Y.concat([a?"L":"M",aQ,aR])}}if(ap.smooth){Y=Y.concat([aQ,aR,aQ,aR])}i.push(au);
if(ap.shade){av[az].attr({path:Y.concat(["L",aQ,aj+aS-aL,"L",ai+aL+((aE[az]||aE[0])[0]-aA)*j,aj+aS-aL,"z"]).join(",")})
}!ap.nostroke&&aK.attr({path:Y.join(",")})}function ao(g){var m=[];for(var k=0,e=aE.length;
k<e;k++){m=m.concat(aE[k])}m.sort();var c=[],s=[];for(k=0,e=m.length;k<e;k++){m[k]!=m[k-1]&&c.push(m[k])&&s.push(ai+aL+(m[k]-aA)*j)
}m=c;e=m.length;var b=g||ak.set();for(k=0;k<e;k++){var l=s[k]-(s[k]-(s[k-1]||ai))/2,f=((s[k+1]||ai+aU)-s[k])/2+(s[k]-(s[k-1]||ai))/2,p;
g?(p={}):b.push(p=ak.rect(l-1,aj,Math.max(f+1,1),aS).attr({stroke:"none",fill:"#000",opacity:0}));
p.values=[];p.symbols=ak.set();p.y=[];p.x=s[k];p.axis=m[k];for(var o=0,h=aF.length;
o<h;o++){c=aE[o]||aE[0];for(var q=0,n=c.length;q<n;q++){if(c[q]==m[k]){p.values.push(aF[o][q]);
p.y.push(aj+aS-aL-(aF[o][q]-aC)*y);p.symbols.push(ay.symbols[o][q])}}}g&&g.call(p)
}!g&&(aH=b)}function ar(e){var n=e||ak.set(),l;for(var k=0,b=aF.length;k<b;k++){for(var m=0,g=aF[k].length;
m<g;m++){var f=ai+aL+((aE[k]||aE[0])[m]-aA)*j,c=ai+aL+((aE[k]||aE[0])[m?m-1:1]-aA)*j,h=aj+aS-aL-(aF[k][m]-aC)*y;
e?(l={}):n.push(l=ak.circle(f,h,Math.abs(c-f)/2).attr({stroke:"none",fill:"#000",opacity:0}));
l.x=f;l.y=h;l.value=aF[k][m];l.line=ay.lines[k];l.shade=ay.shades[k];l.symbol=ay.symbols[k][m];
l.symbols=ay.symbols[k];l.axis=(aE[k]||aE[0])[m];e&&e.call(l)}}!e&&(aM=n)}ay.push(am,av,i,aw,aH,aM);
ay.lines=am;ay.shades=av;ay.symbols=i;ay.axis=aw;ay.hoverColumn=function(c,b){!aH&&ao();
aH.mouseover(c).mouseout(b);return this};ay.clickColumn=function(b){!aH&&ao();aH.click(b);
return this};ay.hrefColumn=function(g){var e=ak.raphael.is(arguments[0],"array")?arguments[0]:arguments;
if(!(arguments.length-1)&&typeof g=="object"){for(var b in g){for(var c=0,f=aH.length;
c<f;c++){if(aH[c].axis==b){aH[c].attr("href",g[b])}}}}!aH&&ao();for(c=0,f=e.length;
c<f;c++){aH[c]&&aH[c].attr("href",e[c])}return this};ay.hover=function(c,b){!aM&&ar();
aM.mouseover(c).mouseout(b);return this};ay.click=function(b){!aM&&ar();aM.click(b);
return this};ay.each=function(b){ar(b);return this};ay.eachColumn=function(b){ao(b);
return this};return ay};
/*
 * g.Raphael 0.4.2 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.fn.g.linechart=function(O,N,b,e,v,u,H){function G(x,ag){var i=x.length/ag,y=0,a=i,Y=0,X=[];
while(y<x.length){a--;if(a<0){Y+=x[y]*(1+a);X.push(Y/i);Y=x[y++]*-a;a+=i}else{Y+=x[y++]
}}return X}function R(j,i,al,aj,ag,Y){var y=(al-j)/2,x=(ag-al)/2,am=Math.atan((al-j)/Math.abs(aj-i)),ak=Math.atan((ag-al)/Math.abs(aj-Y));
am=i<aj?Math.PI-am:am;ak=Y<aj?Math.PI-ak:ak;var X=Math.PI/2-((am+ak)%(Math.PI*2))/2,ao=y*Math.sin(X+am),ai=y*Math.cos(X+am),an=x*Math.sin(X+ak),ah=x*Math.cos(X+ak);
return{x1:al-ao,y1:aj+ai,x2:al+an,y2:aj+ah}}H=H||{};if(!this.raphael.is(v[0],"array")){v=[v]
}if(!this.raphael.is(u[0],"array")){u=[u]}var n=H.gutter||10,w=Math.max(v[0].length,u[0].length),p=H.symbol||"",S=H.colors||Raphael.fn.g.colors,M=this,s=null,m=null,ad=this.set(),T=[];
for(var ac=0,J=u.length;ac<J;ac++){w=Math.max(w,u[ac].length)}var ae=this.set();for(ac=0,J=u.length;
ac<J;ac++){if(H.shade){ae.push(this.path().attr({stroke:"none",fill:S[ac],opacity:H.nostroke?1:0.3}))
}if(u[ac].length>b-2*n){u[ac]=G(u[ac],b-2*n);w=b-2*n}if(v[ac]&&v[ac].length>b-2*n){v[ac]=G(v[ac],b-2*n)
}}var W=Array.prototype.concat.apply([],v),U=Array.prototype.concat.apply([],u),q=this.g.snapEnds(Math.min.apply(Math,W),Math.max.apply(Math,W),v[0].length-1),B=q.from,l=q.to,L=this.g.snapEnds(Math.min.apply(Math,U),Math.max.apply(Math,U),u[0].length-1),z=L.from,k=L.to,Z=(b-n*2)/((l-B)||1),V=(e-n*2)/((k-z)||1);
var D=this.set();if(H.axis){var h=(H.axis+"").split(/[,\s]+/);+h[0]&&D.push(this.g.axis(O+n,N+n,b-2*n,B,l,H.axisxstep||Math.floor((b-2*n)/20),2));
+h[1]&&D.push(this.g.axis(O+b-n,N+e-n,e-2*n,z,k,H.axisystep||Math.floor((e-2*n)/20),3));
+h[2]&&D.push(this.g.axis(O+n,N+e-n,b-2*n,B,l,H.axisxstep||Math.floor((b-2*n)/20),0));
+h[3]&&D.push(this.g.axis(O+n,N+e-n,e-2*n,z,k,H.axisystep||Math.floor((e-2*n)/20),1))
}var K=this.set(),aa=this.set(),o;for(ac=0,J=u.length;ac<J;ac++){if(!H.nostroke){K.push(o=this.path().attr({stroke:S[ac],"stroke-width":H.width||2,"stroke-linejoin":"round","stroke-linecap":"round","stroke-dasharray":H.dash||""}))
}var c=this.raphael.is(p,"array")?p[ac]:p,E=this.set();T=[];for(var ab=0,t=u[ac].length;
ab<t;ab++){var g=O+n+((v[ac]||v[0])[ab]-B)*Z,f=N+e-n-(u[ac][ab]-z)*V;(Raphael.is(c,"array")?c[ab]:c)&&E.push(this.g[Raphael.fn.g.markers[this.raphael.is(c,"array")?c[ab]:c]](g,f,(H.width||2)*3).attr({fill:S[ac],stroke:"none"}));
if(H.smooth){if(ab&&ab!=t-1){var Q=O+n+((v[ac]||v[0])[ab-1]-B)*Z,C=N+e-n-(u[ac][ab-1]-z)*V,P=O+n+((v[ac]||v[0])[ab+1]-B)*Z,A=N+e-n-(u[ac][ab+1]-z)*V;
var af=R(Q,C,g,f,P,A);T=T.concat([af.x1,af.y1,g,f,af.x2,af.y2])}if(!ab){T=["M",g,f,"C",g,f]
}}else{T=T.concat([ab?"L":"M",g,f])}}if(H.smooth){T=T.concat([g,f,g,f])}aa.push(E);
if(H.shade){ae[ac].attr({path:T.concat(["L",g,N+e-n,"L",O+n+((v[ac]||v[0])[0]-B)*Z,N+e-n,"z"]).join(",")})
}!H.nostroke&&o.attr({path:T.join(",")})}function I(am){var aj=[];for(var ak=0,ao=v.length;
ak<ao;ak++){aj=aj.concat(v[ak])}aj.sort();var ap=[],ag=[];for(ak=0,ao=aj.length;ak<ao;
ak++){aj[ak]!=aj[ak-1]&&ap.push(aj[ak])&&ag.push(O+n+(aj[ak]-B)*Z)}aj=ap;ao=aj.length;
var Y=am||M.set();for(ak=0;ak<ao;ak++){var y=ag[ak]-(ag[ak]-(ag[ak-1]||O))/2,an=((ag[ak+1]||O+b)-ag[ak])/2+(ag[ak]-(ag[ak-1]||O))/2,a;
am?(a={}):Y.push(a=M.rect(y-1,N,Math.max(an+1,1),e).attr({stroke:"none",fill:"#000",opacity:0}));
a.values=[];a.symbols=M.set();a.y=[];a.x=ag[ak];a.axis=aj[ak];for(var ai=0,al=u.length;
ai<al;ai++){ap=v[ai]||v[0];for(var ah=0,x=ap.length;ah<x;ah++){if(ap[ah]==aj[ak]){a.values.push(u[ai][ah]);
a.y.push(N+e-n-(u[ai][ah]-z)*V);a.symbols.push(ad.symbols[ai][ah])}}}am&&am.call(a)
}!am&&(s=Y)}function F(ak){var ag=ak||M.set(),a;for(var ai=0,am=u.length;ai<am;ai++){for(var ah=0,aj=u[ai].length;
ah<aj;ah++){var y=O+n+((v[ai]||v[0])[ah]-B)*Z,al=O+n+((v[ai]||v[0])[ah?ah-1:1]-B)*Z,x=N+e-n-(u[ai][ah]-z)*V;
ak?(a={}):ag.push(a=M.circle(y,x,Math.abs(al-y)/2).attr({stroke:"none",fill:"#000",opacity:0}));
a.x=y;a.y=x;a.value=u[ai][ah];a.line=ad.lines[ai];a.shade=ad.shades[ai];a.symbol=ad.symbols[ai][ah];
a.symbols=ad.symbols[ai];a.axis=(v[ai]||v[0])[ah];ak&&ak.call(a)}}!ak&&(m=ag)}ad.push(K,ae,aa,D,s,m);
ad.lines=K;ad.shades=ae;ad.symbols=aa;ad.axis=D;ad.hoverColumn=function(i,a){!s&&I();
s.mouseover(i).mouseout(a);return this};ad.clickColumn=function(a){!s&&I();s.click(a);
return this};ad.hrefColumn=function(X){var Y=M.raphael.is(arguments[0],"array")?arguments[0]:arguments;
if(!(arguments.length-1)&&typeof X=="object"){for(var a in X){for(var j=0,y=s.length;
j<y;j++){if(s[j].axis==a){s[j].attr("href",X[a])}}}}!s&&I();for(j=0,y=Y.length;j<y;
j++){s[j]&&s[j].attr("href",Y[j])}return this};ad.hover=function(i,a){!m&&F();m.mouseover(i).mouseout(a);
return this};ad.click=function(a){!m&&F();m.click(a);return this};ad.each=function(a){F(a);
return this};ad.eachColumn=function(a){I(a);return this};return ad};Raphael.fn.g.piechart=function(S,T,J,V,M){M=M||{};
var N=this,L=[],Q=this.set(),K=this.set(),O=this.set(),E=[],C=V.length,B=0,I=0,i=0,U=9,p=true;
K.covers=Q;if(C==1){O.push(this.circle(S,T,J).attr({fill:this.g.colors[0],stroke:M.stroke||"#fff","stroke-width":M.strokewidth==null?1:M.strokewidth}));
Q.push(this.circle(S,T,J).attr(this.g.shim));I=V[0];V[0]={value:V[0],order:0,valueOf:function(){return this.value
}};O[0].middle={x:S,y:T};O[0].mangle=180}else{function F(o,q,f,m,a,g){var k=Math.PI/180,e=o+f*Math.cos(-m*k),c=o+f*Math.cos(-a*k),n=o+f/2*Math.cos(-(m+(a-m)/2)*k),h=q+f*Math.sin(-m*k),j=q+f*Math.sin(-a*k),b=q+f/2*Math.sin(-(m+(a-m)/2)*k),l=["M",o,q,"L",e,h,"A",f,f,0,+(Math.abs(a-m)>180),1,c,j,"z"];
l.middle={x:n,y:b};return l}for(var D=0;D<C;D++){I+=V[D];V[D]={value:V[D],order:D,valueOf:function(){return this.value
}}}V.sort(function(b,a){return a.value-b.value});for(D=0;D<C;D++){if(p&&V[D]*360/I<=1.5){U=D;
p=false}if(D>U){p=false;V[U].value+=V[D];V[U].others=true;i=V[U].value}}C=Math.min(U+1,V.length);
i&&V.splice(C)&&(V[U].others=true);for(D=0;D<C;D++){var R=B-360*V[D]/I/2;if(!D){B=90-R;
R=B-360*V[D]/I/2}if(M.init){var P=F(S,T,1,B,B-360*V[D]/I).join(",")}var G=F(S,T,J,B,B-=360*V[D]/I);
var H=this.path(M.init?P:G).attr({fill:M.colors&&M.colors[D]||this.g.colors[D]||"#666",stroke:M.stroke||"#fff","stroke-width":(M.strokewidth==null?1:M.strokewidth),"stroke-linejoin":"round"});
H.value=V[D];H.middle=G.middle;H.mangle=R;L.push(H);O.push(H);M.init&&H.animate({path:G.join(",")},(+M.init-1)||1000,">")
}for(D=0;D<C;D++){H=N.path(L[D].attr("path")).attr(this.g.shim);M.href&&M.href[D]&&H.attr({href:M.href[D]});
H.attr=function(){};Q.push(H);O.push(H)}}K.hover=function(c,a){a=a||function(){};
var e=this;for(var b=0;b<C;b++){(function(j,h,f){var g={sector:j,cover:h,cx:S,cy:T,mx:j.middle.x,my:j.middle.y,mangle:j.mangle,r:J,value:V[f],total:I,label:e.labels&&e.labels[f]};
h.mouseover(function(){c.call(g)}).mouseout(function(){a.call(g)})})(O[b],Q[b],b)
}return this};K.each=function(c){var a=this;for(var b=0;b<C;b++){(function(h,g,e){var f={sector:h,cover:g,cx:S,cy:T,x:h.middle.x,y:h.middle.y,mangle:h.mangle,r:J,value:V[e],total:I,label:a.labels&&a.labels[e]};
c.call(f)})(O[b],Q[b],b)}return this};K.click=function(c){var a=this;for(var b=0;
b<C;b++){(function(h,g,e){var f={sector:h,cover:g,cx:S,cy:T,mx:h.middle.x,my:h.middle.y,mangle:h.mangle,r:J,value:V[e],total:I,label:a.labels&&a.labels[e]};
g.click(function(){c.call(f)})})(O[b],Q[b],b)}return this};K.inject=function(a){a.insertBefore(Q[0])
};var W=function(m,e,b,f){var h=S+J+J/5,j=T,n=j+10;m=m||[];f=(f&&f.toLowerCase&&f.toLowerCase())||"east";
b=N.g.markers[b&&b.toLowerCase()]||"disc";K.labels=N.set();for(var o=0;o<C;o++){var g=O[o].attr("fill"),c=V[o].order,a;
V[o].others&&(m[c]=e||"Others");m[c]=N.g.labelise(m[c],V[o],I);K.labels.push(N.set());
K.labels[o].push(N.g[b](h+5,n,5).attr({fill:g,stroke:"none"}));K.labels[o].push(a=N.text(h+20,n,m[c]||V[c]).attr(N.g.txtattr).attr({fill:M.legendcolor||"#000","text-anchor":"start"}));
Q[o].label=K.labels[o];n+=a.getBBox().height*1.2}var l=K.labels.getBBox(),k={east:[0,-l.height/2],west:[-l.width-2*J-20,-l.height/2],north:[-J-l.width/2,-J-l.height-10],south:[-J-l.width/2,J+10]}[f];
K.labels.translate.apply(K.labels,k);K.push(K.labels)};if(M.legend){W(M.legend,M.legendothers,M.legendmark,M.legendpos)
}K.push(O,Q);K.series=O;K.covers=Q;return K};Raphael.fn.g.piechart=function(f,e,q,b,m){m=m||{};
var l=this,n=[],h=this.set(),o=this.set(),k=this.set(),v=[],x=b.length,y=0,B=0,A=0,c=9,z=true;
o.covers=h;if(x==1){k.push(this.circle(f,e,q).attr({fill:this.g.colors[0],stroke:m.stroke||"#fff","stroke-width":m.strokewidth==null?1:m.strokewidth}));
h.push(this.circle(f,e,q).attr(this.g.shim));B=b[0];b[0]={value:b[0],order:0,valueOf:function(){return this.value
}};k[0].middle={x:f,y:e};k[0].mangle=180}else{function u(G,F,i,I,E,N){var K=Math.PI/180,C=G+i*Math.cos(-I*K),p=G+i*Math.cos(-E*K),H=G+i/2*Math.cos(-(I+(E-I)/2)*K),M=F+i*Math.sin(-I*K),L=F+i*Math.sin(-E*K),D=F+i/2*Math.sin(-(I+(E-I)/2)*K),J=["M",G,F,"L",C,M,"A",i,i,0,+(Math.abs(E-I)>180),1,p,L,"z"];
J.middle={x:H,y:D};return J}for(var w=0;w<x;w++){B+=b[w];b[w]={value:b[w],order:w,valueOf:function(){return this.value
}}}b.sort(function(p,i){return i.value-p.value});for(w=0;w<x;w++){if(z&&b[w]*360/B<=1.5){c=w;
z=false}if(w>c){z=false;b[c].value+=b[w];b[c].others=true;A=b[c].value}}x=Math.min(c+1,b.length);
A&&b.splice(x)&&(b[c].others=true);for(w=0;w<x;w++){var g=y-360*b[w]/B/2;if(!w){y=90-g;
g=y-360*b[w]/B/2}if(m.init){var j=u(f,e,1,y,y-360*b[w]/B).join(",")}var t=u(f,e,q,y,y-=360*b[w]/B);
var s=this.path(m.init?j:t).attr({fill:m.colors&&m.colors[w]||this.g.colors[w]||"#666",stroke:m.stroke||"#fff","stroke-width":(m.strokewidth==null?1:m.strokewidth),"stroke-linejoin":"round"});
s.value=b[w];s.middle=t.middle;s.mangle=g;n.push(s);k.push(s);m.init&&s.animate({path:t.join(",")},(+m.init-1)||1000,">")
}for(w=0;w<x;w++){s=l.path(n[w].attr("path")).attr(this.g.shim);m.href&&m.href[w]&&s.attr({href:m.href[w]});
s.attr=function(){};h.push(s);k.push(s)}}o.hover=function(E,C){C=C||function(){};
var D=this;for(var p=0;p<x;p++){(function(F,G,i){var H={sector:F,cover:G,cx:f,cy:e,mx:F.middle.x,my:F.middle.y,mangle:F.mangle,r:q,value:b[i],total:B,label:D.labels&&D.labels[i]};
G.mouseover(function(){E.call(H)}).mouseout(function(){C.call(H)})})(k[p],h[p],p)
}return this};o.each=function(D){var C=this;for(var p=0;p<x;p++){(function(E,F,i){var G={sector:E,cover:F,cx:f,cy:e,x:E.middle.x,y:E.middle.y,mangle:E.mangle,r:q,value:b[i],total:B,label:C.labels&&C.labels[i]};
D.call(G)})(k[p],h[p],p)}return this};o.click=function(D){var C=this;for(var p=0;
p<x;p++){(function(E,F,i){var G={sector:E,cover:F,cx:f,cy:e,mx:E.middle.x,my:E.middle.y,mangle:E.mangle,r:q,value:b[i],total:B,label:C.labels&&C.labels[i]};
F.click(function(){D.call(G)})})(k[p],h[p],p)}return this};o.inject=function(i){i.insertBefore(h[0])
};var a=function(I,D,C,p){var M=f+q+q/5,L=e,H=L+10;I=I||[];p=(p&&p.toLowerCase&&p.toLowerCase())||"east";
C=l.g.markers[C&&C.toLowerCase()]||"disc";o.labels=l.set();for(var G=0;G<x;G++){var N=k[G].attr("fill"),E=b[G].order,F;
b[G].others&&(I[E]=D||"Others");I[E]=l.g.labelise(I[E],b[G],B);o.labels.push(l.set());
o.labels[G].push(l.g[C](M+5,H,5).attr({fill:N,stroke:"none"}));o.labels[G].push(F=l.text(M+20,H,I[E]||b[E]).attr(l.g.txtattr).attr({fill:m.legendcolor||"#000","text-anchor":"start"}));
h[G].label=o.labels[G];H+=F.getBBox().height*1.2}var J=o.labels.getBBox(),K={east:[0,-J.height/2],west:[-J.width-2*q-20,-J.height/2],north:[-q-J.width/2,-q-J.height-10],south:[-q-J.width/2,q+10]}[p];
o.labels.translate.apply(o.labels,K);o.push(o.labels)};if(m.legend){a(m.legend,m.legendothers,m.legendmark,m.legendpos)
}o.push(k,h);o.series=k;o.covers=h;return o};(function(){var g=Math.max,i=Math.min;
Raphael.fn.g=Raphael.fn.g||{};Raphael.fn.g.markers={disc:"disc",o:"disc",flower:"flower",f:"flower",diamond:"diamond",d:"diamond",square:"square",s:"square",triangle:"triangle",t:"triangle",star:"star","*":"star",cross:"cross",x:"cross",plus:"plus","+":"plus",arrow:"arrow","->":"arrow"};
Raphael.fn.g.shim={stroke:"none",fill:"#000","fill-opacity":0};Raphael.fn.g.txtattr={font:"12px Arial, sans-serif"};
Raphael.fn.g.colors=[];var h=[0.6,0.2,0.05,0.1333,0.75,0];for(var f=0;f<10;f++){if(f<h.length){Raphael.fn.g.colors.push("hsb("+h[f]+", .75, .75)")
}else{Raphael.fn.g.colors.push("hsb("+h[f-h.length]+", 1, .5)")}}Raphael.fn.g.text=function(c,a,b){return this.text(c,a,b).attr(this.g.txtattr)
};Raphael.fn.g.labelise=function(c,a,b){if(c){return(c+"").replace(/(##+(?:\.#+)?)|(%%+(?:\.%+)?)/g,function(m,e,l){if(e){return(+a).toFixed(e.replace(/^#+\.?/g,"").length)
}if(l){return(a*100/b).toFixed(l.replace(/^%+\.?/g,"").length)+"%"}})}else{return(+a).toFixed(0)
}};Raphael.fn.g.finger=function(e,p,u,c,t,s,q){if((t&&!c)||(!t&&!u)){return q?"":this.path()
}s={square:"square",sharp:"sharp",soft:"soft"}[s]||"round";var a;c=Math.round(c);
u=Math.round(u);e=Math.round(e);p=Math.round(p);switch(s){case"round":if(!t){var v=~~(c/2);
if(u<v){v=u;a=["M",e+0.5,p+0.5-~~(c/2),"l",0,0,"a",v,~~(c/2),0,0,1,0,c,"l",0,0,"z"]
}else{a=["M",e+0.5,p+0.5-v,"l",u-v,0,"a",v,v,0,1,1,0,c,"l",v-u,0,"z"]}}else{v=~~(u/2);
if(c<v){v=c;a=["M",e-~~(u/2),p,"l",0,0,"a",~~(u/2),v,0,0,1,u,0,"l",0,0,"z"]}else{a=["M",e-v,p,"l",0,v-c,"a",v,v,0,1,1,u,0,"l",0,c-v,"z"]
}}break;case"sharp":if(!t){var b=~~(c/2);a=["M",e,p+b,"l",0,-c,g(u-b,0),0,i(b,u),b,-i(b,u),b+(b*2<c),"z"]
}else{b=~~(u/2);a=["M",e+b,p,"l",-u,0,0,-g(c-b,0),b,-i(b,c),b,i(b,c),b,"z"]}break;
case"square":if(!t){a=["M",e,p+~~(c/2),"l",0,-c,u,0,0,c,"z"]}else{a=["M",e+~~(u/2),p,"l",1-u,0,0,-c,u-1,0,"z"]
}break;case"soft":if(!t){v=i(u,Math.round(c/5));a=["M",e+0.5,p+0.5-~~(c/2),"l",u-v,0,"a",v,v,0,0,1,v,v,"l",0,c-v*2,"a",v,v,0,0,1,-v,v,"l",v-u,0,"z"]
}else{v=i(Math.round(u/5),c);a=["M",e-~~(u/2),p,"l",0,v-c,"a",v,v,0,0,1,v,-v,"l",u-2*v,0,"a",v,v,0,0,1,v,v,"l",0,c-v,"z"]
}}if(q){return a.join(",")}else{return this.path(a)}};Raphael.fn.g.disc=function(c,a,b){return this.circle(c,a,b)
};Raphael.fn.g.line=function(c,a,b){return this.rect(c-b,a-b/5,2*b,2*b/5)};Raphael.fn.g.square=function(c,a,b){b=b*0.7;
return this.rect(c-b,a-b,2*b,2*b)};Raphael.fn.g.triangle=function(c,a,b){b*=1.75;
return this.path("M".concat(c,",",a,"m0-",b*0.58,"l",b*0.5,",",b*0.87,"-",b,",0z"))
};Raphael.fn.g.diamond=function(c,a,b){return this.path(["M",c,a-b,"l",b,b,-b,b,-b,-b,b,-b,"z"])
};Raphael.fn.g.flower=function(q,s,u,t){u=u*1.25;var b=u,c=b*0.5;t=+t<3||!t?5:t;var a=["M",q,s+c,"Q"],e;
for(var n=1;n<t*2+1;n++){e=n%2?b:c;a=a.concat([+(q+e*Math.sin(n*Math.PI/t)).toFixed(3),+(s+e*Math.cos(n*Math.PI/t)).toFixed(3)])
}a.push("z");return this.path(a.join(","))};Raphael.fn.g.star=function(q,s,a,o,p){o=o||a*0.382;
p=p||5;var b=["M",q,s+o,"L"],c;for(var e=1;e<p*2;e++){c=e%2?a:o;b=b.concat([(q+c*Math.sin(e*Math.PI/p)),(s+c*Math.cos(e*Math.PI/p))])
}b.push("z");return this.path(b.join(","))};Raphael.fn.g.cross=function(c,a,b){b=b/2.5;
return this.path("M".concat(c-b,",",a,"l",[-b,-b,b,-b,b,b,b,-b,b,b,-b,b,b,b,-b,b,-b,-b,-b,b,-b,-b,"z"]))
};Raphael.fn.g.plus=function(c,a,b){b=b/2;return this.path("M".concat(c-b/2,",",a-b/2,"l",[0,-b,b,0,0,b,b,0,0,b,-b,0,0,b,-b,0,0,-b,-b,0,0,-b,"z"]))
};Raphael.fn.g.arrow=function(c,a,b){return this.path("M".concat(c-b*0.7,",",a-b*0.4,"l",[b*0.6,0,0,-b*0.4,b,b*0.8,-b,b*0.8,0,-b*0.4,-b*0.6,0],"z"))
};Raphael.fn.g.tag=function(q,a,b,c,n){c=c||0;n=n==null?5:n;b=b==null?"$9.99":b;var o=0.5522*n,p=this.set(),e=3;
p.push(this.path().attr({fill:"#000",stroke:"#000"}));p.push(this.text(q,a,b).attr(this.g.txtattr).attr({fill:"#fff","font-family":"Helvetica, Arial"}));
p.update=function(){this.rotate(0,q,a);var j=this[1].getBBox();if(j.height>=n*2){this[0].attr({path:["M",q,a+n,"a",n,n,0,1,1,0,-n*2,n,n,0,1,1,0,n*2,"m",0,-n*2-e,"a",n+e,n+e,0,1,0,0,(n+e)*2,"L",q+n+e,a+j.height/2+e,"l",j.width+2*e,0,0,-j.height-2*e,-j.width-2*e,0,"L",q,a-n-e].join(",")})
}else{var k=Math.sqrt(Math.pow(n+e,2)-Math.pow(j.height/2+e,2));this[0].attr({path:["M",q,a+n,"c",-o,0,-n,o-n,-n,-n,0,-o,n-o,-n,n,-n,o,0,n,n-o,n,n,0,o,o-n,n,-n,n,"M",q+k,a-j.height/2-e,"a",n+e,n+e,0,1,0,0,j.height+2*e,"l",n+e-k+j.width+2*e,0,0,-j.height-2*e,"L",q+k,a-j.height/2-e].join(",")})
}this[1].attr({x:q+n+e+j.width/2,y:a});c=(360-c)%360;this.rotate(c,q,a);c>90&&c<270&&this[1].attr({x:q-n-e-j.width/2,y:a,rotation:[180+c,q,a]});
return this};p.update();return p};Raphael.fn.g.popupit=function(p,u,e,x,z){x=x==null?2:x;
z=z||5;p=Math.round(p);u=Math.round(u);var v=e.getBBox(),c=Math.round(v.width/2),w=Math.round(v.height/2),A=[0,c+z*2,0,-c-z*2],b=[-w*2-z*3,-w-z,0,-w-z],y=["M",p-A[x],u-b[x],"l",-z,(x==2)*-z,-g(c-z,0),0,"a",z,z,0,0,1,-z,-z,"l",0,-g(w-z,0),(x==3)*-z,-z,(x==3)*z,-z,0,-g(w-z,0),"a",z,z,0,0,1,z,-z,"l",g(c-z,0),0,z,!x*-z,z,!x*z,g(c-z,0),0,"a",z,z,0,0,1,z,z,"l",0,g(w-z,0),(x==1)*z,z,(x==1)*-z,z,0,g(w-z,0),"a",z,z,0,0,1,-z,z,"l",-g(c-z,0),0,"z"].join(","),a=[{x:p,y:u+z*2+w},{x:p-z*2-c,y:u},{x:p,y:u-z*2-w},{x:p+z*2+c,y:u}][x];
e.translate(a.x-c-v.x,a.y-w-v.y);return this.path(y).attr({fill:"#000",stroke:"none"}).insertBefore(e.node?e:e[0])
};Raphael.fn.g.popup=function(o,a,b,n,e){n=n==null?2:n>3?3:n;e=e||5;b=b||"$9.99";
var m=this.set(),c=3;m.push(this.path().attr({fill:"#000",stroke:"#000"}));m.push(this.text(o,a,b).attr(this.g.txtattr).attr({fill:"#fff","font-family":"Helvetica, Arial"}));
m.update=function(k,l,j){k=k||o;l=l||a;var C=this[1].getBBox(),B=C.width/2,D=C.height/2,w=[0,B+e*2,0,-B-e*2],A=[-D*2-e*3,-D-e,0,-D-e],p=["M",k-w[n],l-A[n],"l",-e,(n==2)*-e,-g(B-e,0),0,"a",e,e,0,0,1,-e,-e,"l",0,-g(D-e,0),(n==3)*-e,-e,(n==3)*e,-e,0,-g(D-e,0),"a",e,e,0,0,1,e,-e,"l",g(B-e,0),0,e,!n*-e,e,!n*e,g(B-e,0),0,"a",e,e,0,0,1,e,e,"l",0,g(D-e,0),(n==1)*e,e,(n==1)*-e,e,0,g(D-e,0),"a",e,e,0,0,1,-e,e,"l",-g(B-e,0),0,"z"].join(","),z=[{x:k,y:l+e*2+D},{x:k-e*2-B,y:l},{x:k,y:l-e*2-D},{x:k+e*2+B,y:l}][n];
z.path=p;if(j){this.animate(z,500,">")}else{this.attr(z)}return this};return m.update(o,a)
};Raphael.fn.g.flag=function(m,a,b,c){c=c||0;b=b||"$9.99";var l=this.set(),e=3;l.push(this.path().attr({fill:"#000",stroke:"#000"}));
l.push(this.text(m,a,b).attr(this.g.txtattr).attr({fill:"#fff","font-family":"Helvetica, Arial"}));
l.update=function(k,p){this.rotate(0,k,p);var q=this[1].getBBox(),j=q.height/2;this[0].attr({path:["M",k,p,"l",j+e,-j-e,q.width+2*e,0,0,q.height+2*e,-q.width-2*e,0,"z"].join(",")});
this[1].attr({x:k+j+e+q.width/2,y:p});c=360-c;this.rotate(c,k,p);c>90&&c<270&&this[1].attr({x:k-r-e-q.width/2,y:p,rotation:[180+c,k,p]});
return this};return l.update(m,a)};Raphael.fn.g.label=function(e,a,b){var c=this.set();
c.push(this.rect(e,a,10,10).attr({stroke:"none",fill:"#000"}));c.push(this.text(e,a,b).attr(this.g.txtattr).attr({fill:"#fff"}));
c.update=function(){var l=this[1].getBBox(),m=i(l.width+10,l.height+10)/2;this[0].attr({x:l.x-m/2,y:l.y-m/2,width:l.width+m,height:l.height+m,r:m})
};c.update();return c};Raphael.fn.g.labelit=function(a){var b=a.getBBox(),c=i(20,b.width+10,b.height+10)/2;
return this.rect(b.x-c/2,b.y-c/2,b.width+c,b.height+c,c).attr({stroke:"none",fill:"#000"}).insertBefore(a.node?a:a[0])
};Raphael.fn.g.drop=function(m,a,b,e,c){e=e||30;c=c||0;var l=this.set();l.push(this.path(["M",m,a,"l",e,0,"A",e*0.4,e*0.4,0,1,0,m+e*0.7,a-e*0.7,"z"]).attr({fill:"#000",stroke:"none",rotation:[22.5-c,m,a]}));
c=(c+90)*Math.PI/180;l.push(this.text(m+e*Math.sin(c),a+e*Math.cos(c),b).attr(this.g.txtattr).attr({"font-size":e*12/30,fill:"#fff"}));
l.drop=l[0];l.text=l[1];return l};Raphael.fn.g.blob=function(p,a,b,c,n){c=(+c+1?c:45)+90;
n=n||12;var q=Math.PI/180,e=n*12/12;var o=this.set();o.push(this.path().attr({fill:"#000",stroke:"none"}));
o.push(this.text(p+n*Math.sin((c)*q),a+n*Math.cos((c)*q)-e/2,b).attr(this.g.txtattr).attr({"font-size":e,fill:"#fff"}));
o.update=function(P,R,K){P=P||p;R=R||a;var H=this[1].getBBox(),j=g(H.width+e,n*25/12),J=g(H.height+e,n*25/12),G=P+n*Math.sin((c-22.5)*q),w=R+n*Math.cos((c-22.5)*q),l=P+n*Math.sin((c+22.5)*q),k=R+n*Math.cos((c+22.5)*q),O=(l-G)/2,Q=(k-w)/2,m=j/2,I=J/2,L=-Math.sqrt(Math.abs(m*m*I*I-m*m*Q*Q-I*I*O*O)/(m*m*Q*Q+I*I*O*O)),M=L*m*Q/I+(l+G)/2,N=L*-I*O/m+(k+w)/2;
if(K){this.animate({x:M,y:N,path:["M",p,a,"L",l,k,"A",m,I,0,1,1,G,w,"z"].join(",")},500,">")
}else{this.attr({x:M,y:N,path:["M",p,a,"L",l,k,"A",m,I,0,1,1,G,w,"z"].join(",")})
}return this};o.update(p,a);return o};Raphael.fn.g.colorValue=function(a,b,c,e){return"hsb("+[i((1-a/b)*0.4,1),c||0.75,e||0.75]+")"
};Raphael.fn.g.snapEnds=function(e,c,s){var u=e,b=c;if(u==b){return{from:u,to:b,power:0}
}function a(j){return Math.abs(j-0.5)<0.25?~~(j)+0.5:Math.round(j)}var t=(b-u)/s,x=~~(t),v=x,w=0;
if(x){while(v){w--;v=~~(t*Math.pow(10,w))/Math.pow(10,w)}w++}else{while(!x){w=w||1;
x=~~(t*Math.pow(10,w))/Math.pow(10,w);w++}w&&w--}b=a(c*Math.pow(10,w))/Math.pow(10,w);
if(b<c){b=a((c+0.5)*Math.pow(10,w))/Math.pow(10,w)}u=a((e-(w>0?0:0.5))*Math.pow(10,w))/Math.pow(10,w);
return{from:u,to:b,power:w}};Raphael.fn.g.axis=function(O,Q,Z,N,ac,j,ab,b,aa,af){af=af==null?2:af;
aa=aa||"t";j=j||10;var P=aa=="|"||aa==" "?["M",O+0.5,Q,"l",0,0.001]:ab==1||ab==3?["M",O+0.5,Q,"l",0,-Z]:["M",O,Q+0.5,"l",Z,0],e=this.g.snapEnds(N,ac,j),c=e.from,W=e.to,t=e.power,y=0,U=this.set();
d=(W-c)/j;var T=c,V=t>0?t:0;x=Z/j;if(+ab==1||+ab==3){var ae=Q,Y=(ab-1?1:-1)*(af+3+!!(ab-1));
while(ae>=Q-Z){aa!="-"&&aa!=" "&&(P=P.concat(["M",O-(aa=="+"||aa=="|"?af:!(ab-1)*af*2),ae+0.5,"l",af*2+1,0]));
U.push(this.text(O+Y,ae,(b&&b[y++])||(Math.round(T)==T?T:+T.toFixed(V))).attr(this.g.txtattr).attr({"text-anchor":ab-1?"start":"end"}));
T+=d;ae-=x}if(Math.round(ae+x-(Q-Z))){aa!="-"&&aa!=" "&&(P=P.concat(["M",O-(aa=="+"||aa=="|"?af:!(ab-1)*af*2),Q-Z+0.5,"l",af*2+1,0]));
U.push(this.text(O+Y,Q-Z,(b&&b[y])||(Math.round(T)==T?T:+T.toFixed(V))).attr(this.g.txtattr).attr({"text-anchor":ab-1?"start":"end"}))
}}else{T=c;V=(t>0)*t;Y=(ab?-1:1)*(af+9+!ab);var ad=O,x=Z/j,S=0,R=0;while(ad<=O+Z){aa!="-"&&aa!=" "&&(P=P.concat(["M",ad+0.5,Q-(aa=="+"?af:!!ab*af*2),"l",0,af*2+1]));
U.push(S=this.text(ad,Q+Y,(b&&b[y++])||(Math.round(T)==T?T:+T.toFixed(V))).attr(this.g.txtattr));
var X=S.getBBox();if(R>=X.x-5){U.pop(U.length-1).remove()}else{R=X.x+X.width}T+=d;
ad+=x}if(Math.round(ad-x-O-Z)){aa!="-"&&aa!=" "&&(P=P.concat(["M",O+Z+0.5,Q-(aa=="+"?af:!!ab*af*2),"l",0,af*2+1]));
U.push(this.text(O+Z,Q+Y,(b&&b[y])||(Math.round(T)==T?T:+T.toFixed(V))).attr(this.g.txtattr))
}}var a=this.path(P);a.text=U;a.all=this.set([a,U]);a.remove=function(){this.text.remove();
this.constructor.prototype.remove.call(this)};return a};Raphael.el.lighter=function(a){a=a||2;
var b=[this.attrs.fill,this.attrs.stroke];this.fs=this.fs||[b[0],b[1]];b[0]=Raphael.rgb2hsb(Raphael.getRGB(b[0]).hex);
b[1]=Raphael.rgb2hsb(Raphael.getRGB(b[1]).hex);b[0].b=i(b[0].b*a,1);b[0].s=b[0].s/a;
b[1].b=i(b[1].b*a,1);b[1].s=b[1].s/a;this.attr({fill:"hsb("+[b[0].h,b[0].s,b[0].b]+")",stroke:"hsb("+[b[1].h,b[1].s,b[1].b]+")"})
};Raphael.el.darker=function(a){a=a||2;var b=[this.attrs.fill,this.attrs.stroke];
this.fs=this.fs||[b[0],b[1]];b[0]=Raphael.rgb2hsb(Raphael.getRGB(b[0]).hex);b[1]=Raphael.rgb2hsb(Raphael.getRGB(b[1]).hex);
b[0].s=i(b[0].s*a,1);b[0].b=b[0].b/a;b[1].s=i(b[1].s*a,1);b[1].b=b[1].b/a;this.attr({fill:"hsb("+[b[0].h,b[0].s,b[0].b]+")",stroke:"hsb("+[b[1].h,b[1].s,b[1].b]+")"})
};Raphael.el.original=function(){if(this.fs){this.attr({fill:this.fs[0],stroke:this.fs[1]});
delete this.fs}}})();
/*
 * g.Raphael 0.4.1 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function(){var a=Math.max,c=Math.min;
Raphael.fn.g=Raphael.fn.g||{};Raphael.fn.g.markers={disc:"disc",o:"disc",flower:"flower",f:"flower",diamond:"diamond",d:"diamond",square:"square",s:"square",triangle:"triangle",t:"triangle",star:"star","*":"star",cross:"cross",x:"cross",plus:"plus","+":"plus",arrow:"arrow","->":"arrow"};
Raphael.fn.g.shim={stroke:"none",fill:"#000","fill-opacity":0};Raphael.fn.g.txtattr={font:"12px Arial, sans-serif"};
Raphael.fn.g.colors=[];var e=[0.6,0.2,0.05,0.1333,0.75,0];for(var b=0;b<10;b++){if(b<e.length){Raphael.fn.g.colors.push("hsb("+e[b]+", .75, .75)")
}else{Raphael.fn.g.colors.push("hsb("+e[b-e.length]+", 1, .5)")}}Raphael.fn.g.text=function(f,h,g){return this.text(f,h,g).attr(this.g.txtattr)
};Raphael.fn.g.labelise=function(f,h,g){if(f){return(f+"").replace(/(##+(?:\.#+)?)|(%%+(?:\.%+)?)/g,function(i,k,j){if(k){return(+h).toFixed(k.replace(/^#+\.?/g,"").length)
}if(j){return(h*100/g).toFixed(j.replace(/^%+\.?/g,"").length)+"%"}})}else{return(+h).toFixed(0)
}};Raphael.fn.g.finger=function(l,k,g,m,h,i,j){if((h&&!m)||(!h&&!g)){return j?"":this.path()
}i={square:"square",sharp:"sharp",soft:"soft"}[i]||"round";var o;m=Math.round(m);
g=Math.round(g);l=Math.round(l);k=Math.round(k);switch(i){case"round":if(!h){var f=~~(m/2);
if(g<f){f=g;o=["M",l+0.5,k+0.5-~~(m/2),"l",0,0,"a",f,~~(m/2),0,0,1,0,m,"l",0,0,"z"]
}else{o=["M",l+0.5,k+0.5-f,"l",g-f,0,"a",f,f,0,1,1,0,m,"l",f-g,0,"z"]}}else{f=~~(g/2);
if(m<f){f=m;o=["M",l-~~(g/2),k,"l",0,0,"a",~~(g/2),f,0,0,1,g,0,"l",0,0,"z"]}else{o=["M",l-f,k,"l",0,f-m,"a",f,f,0,1,1,g,0,"l",0,m-f,"z"]
}}break;case"sharp":if(!h){var n=~~(m/2);o=["M",l,k+n,"l",0,-m,a(g-n,0),0,c(n,g),n,-c(n,g),n+(n*2<m),"z"]
}else{n=~~(g/2);o=["M",l+n,k,"l",-g,0,0,-a(m-n,0),n,-c(n,m),n,c(n,m),n,"z"]}break;
case"square":if(!h){o=["M",l,k+~~(m/2),"l",0,-m,g,0,0,m,"z"]}else{o=["M",l+~~(g/2),k,"l",1-g,0,0,-m,g-1,0,"z"]
}break;case"soft":if(!h){f=c(g,Math.round(m/5));o=["M",l+0.5,k+0.5-~~(m/2),"l",g-f,0,"a",f,f,0,0,1,f,f,"l",0,m-f*2,"a",f,f,0,0,1,-f,f,"l",f-g,0,"z"]
}else{f=c(Math.round(g/5),m);o=["M",l-~~(g/2),k,"l",0,f-m,"a",f,f,0,0,1,f,-f,"l",g-2*f,0,"a",f,f,0,0,1,f,f,"l",0,m-f,"z"]
}}if(j){return o.join(",")}else{return this.path(o)}};Raphael.fn.g.disc=function(f,h,g){return this.circle(f,h,g)
};Raphael.fn.g.line=function(f,h,g){return this.rect(f-g,h-g/5,2*g,2*g/5)};Raphael.fn.g.square=function(f,h,g){g=g*0.7;
return this.rect(f-g,h-g,2*g,2*g)};Raphael.fn.g.triangle=function(f,h,g){g*=1.75;
return this.path("M".concat(f,",",h,"m0-",g*0.58,"l",g*0.5,",",g*0.87,"-",g,",0z"))
};Raphael.fn.g.diamond=function(f,h,g){return this.path(["M",f,h-g,"l",g,g,-g,g,-g,-g,g,-g,"z"])
};Raphael.fn.g.flower=function(j,h,f,g){f=f*1.25;var o=f,m=o*0.5;g=+g<3||!g?5:g;var p=["M",j,h+m,"Q"],l;
for(var k=1;k<g*2+1;k++){l=k%2?o:m;p=p.concat([+(j+l*Math.sin(k*Math.PI/g)).toFixed(3),+(h+l*Math.cos(k*Math.PI/g)).toFixed(3)])
}p.push("z");return this.path(p.join(","))};Raphael.fn.g.star=function(f,n,m,h,g){h=h||m*0.382;
g=g||5;var l=["M",f,n+h,"L"],k;for(var j=1;j<g*2;j++){k=j%2?m:h;l=l.concat([(f+k*Math.sin(j*Math.PI/g)),(n+k*Math.cos(j*Math.PI/g))])
}l.push("z");return this.path(l.join(","))};Raphael.fn.g.cross=function(f,h,g){g=g/2.5;
return this.path("M".concat(f-g,",",h,"l",[-g,-g,g,-g,g,g,g,-g,g,g,-g,g,g,g,-g,g,-g,-g,-g,g,-g,-g,"z"]))
};Raphael.fn.g.plus=function(f,h,g){g=g/2;return this.path("M".concat(f-g/2,",",h-g/2,"l",[0,-g,g,0,0,g,g,0,0,g,-g,0,0,g,-g,0,0,-g,-g,0,0,-g,"z"]))
};Raphael.fn.g.arrow=function(f,h,g){return this.path("M".concat(f-g*0.7,",",h-g*0.4,"l",[g*0.6,0,0,-g*0.4,g,g*0.8,-g,g*0.8,0,-g*0.4,-g*0.6,0],"z"))
};Raphael.fn.g.tag=function(f,m,l,k,i){k=k||0;i=i==null?5:i;l=l==null?"$9.99":l;var h=0.5522*i,g=this.set(),j=3;
g.push(this.path().attr({fill:"#000",stroke:"#000"}));g.push(this.text(f,m,l).attr(this.g.txtattr).attr({fill:"#fff","font-family":"Helvetica, Arial"}));
g.update=function(){this.rotate(0,f,m);var o=this[1].getBBox();if(o.height>=i*2){this[0].attr({path:["M",f,m+i,"a",i,i,0,1,1,0,-i*2,i,i,0,1,1,0,i*2,"m",0,-i*2-j,"a",i+j,i+j,0,1,0,0,(i+j)*2,"L",f+i+j,m+o.height/2+j,"l",o.width+2*j,0,0,-o.height-2*j,-o.width-2*j,0,"L",f,m-i-j].join(",")})
}else{var n=Math.sqrt(Math.pow(i+j,2)-Math.pow(o.height/2+j,2));this[0].attr({path:["M",f,m+i,"c",-h,0,-i,h-i,-i,-i,0,-h,i-h,-i,i,-i,h,0,i,i-h,i,i,0,h,h-i,i,-i,i,"M",f+n,m-o.height/2-j,"a",i+j,i+j,0,1,0,0,o.height+2*j,"l",i+j-n+o.width+2*j,0,0,-o.height-2*j,"L",f+n,m-o.height/2-j].join(",")})
}this[1].attr({x:f+i+j+o.width/2,y:m});k=(360-k)%360;this.rotate(k,f,m);k>90&&k<270&&this[1].attr({x:f-i-j-o.width/2,y:m,rotation:[180+k,f,m]});
return this};g.update();return g};Raphael.fn.g.popupit=function(l,k,m,g,t){g=g==null?2:g;
t=t||5;l=Math.round(l);k=Math.round(k);var j=m.getBBox(),n=Math.round(j.width/2),i=Math.round(j.height/2),s=[0,n+t*2,0,-n-t*2],o=[-i*2-t*3,-i-t,0,-i-t],f=["M",l-s[g],k-o[g],"l",-t,(g==2)*-t,-a(n-t,0),0,"a",t,t,0,0,1,-t,-t,"l",0,-a(i-t,0),(g==3)*-t,-t,(g==3)*t,-t,0,-a(i-t,0),"a",t,t,0,0,1,t,-t,"l",a(n-t,0),0,t,!g*-t,t,!g*t,a(n-t,0),0,"a",t,t,0,0,1,t,t,"l",0,a(i-t,0),(g==1)*t,t,(g==1)*-t,t,0,a(i-t,0),"a",t,t,0,0,1,-t,t,"l",-a(n-t,0),0,"z"].join(","),q=[{x:l,y:k+t*2+i},{x:l-t*2-n,y:k},{x:l,y:k-t*2-i},{x:l+t*2+n,y:k}][g];
m.translate(q.x-n-j.x,q.y-i-j.y);return this.path(f).attr({fill:"#000",stroke:"none"}).insertBefore(m.node?m:m[0])
};Raphael.fn.g.popup=function(f,l,k,g,i){g=g==null?2:g>3?3:g;i=i||5;k=k||"$9.99";
var h=this.set(),j=3;h.push(this.path().attr({fill:"#000",stroke:"#000"}));h.push(this.text(f,l,k).attr(this.g.txtattr).attr({fill:"#fff","font-family":"Helvetica, Arial"}));
h.update=function(o,n,q){o=o||f;n=n||l;var t=this[1].getBBox(),u=t.width/2,s=t.height/2,y=[0,u+i*2,0,-u-i*2],v=[-s*2-i*3,-s-i,0,-s-i],m=["M",o-y[g],n-v[g],"l",-i,(g==2)*-i,-a(u-i,0),0,"a",i,i,0,0,1,-i,-i,"l",0,-a(s-i,0),(g==3)*-i,-i,(g==3)*i,-i,0,-a(s-i,0),"a",i,i,0,0,1,i,-i,"l",a(u-i,0),0,i,!g*-i,i,!g*i,a(u-i,0),0,"a",i,i,0,0,1,i,i,"l",0,a(s-i,0),(g==1)*i,i,(g==1)*-i,i,0,a(s-i,0),"a",i,i,0,0,1,-i,i,"l",-a(u-i,0),0,"z"].join(","),x=[{x:o,y:n+i*2+s},{x:o-i*2-u,y:n},{x:o,y:n-i*2-s},{x:o+i*2+u,y:n}][g];
x.path=m;if(q){this.animate(x,500,">")}else{this.attr(x)}return this};return h.update(f,l)
};Raphael.fn.g.flag=function(f,k,j,i){i=i||0;j=j||"$9.99";var g=this.set(),h=3;g.push(this.path().attr({fill:"#000",stroke:"#000"}));
g.push(this.text(f,k,j).attr(this.g.txtattr).attr({fill:"#fff","font-family":"Helvetica, Arial"}));
g.update=function(l,o){this.rotate(0,l,o);var n=this[1].getBBox(),m=n.height/2;this[0].attr({path:["M",l,o,"l",m+h,-m-h,n.width+2*h,0,0,n.height+2*h,-n.width-2*h,0,"z"].join(",")});
this[1].attr({x:l+m+h+n.width/2,y:o});i=360-i;this.rotate(i,l,o);i>90&&i<270&&this[1].attr({x:l-r-h-n.width/2,y:o,rotation:[180+i,l,o]});
return this};return g.update(f,k)};Raphael.fn.g.label=function(f,i,h){var g=this.set();
g.push(this.rect(f,i,10,10).attr({stroke:"none",fill:"#000"}));g.push(this.text(f,i,h).attr(this.g.txtattr).attr({fill:"#fff"}));
g.update=function(){var k=this[1].getBBox(),j=c(k.width+10,k.height+10)/2;this[0].attr({x:k.x-j/2,y:k.y-j/2,width:k.width+j,height:k.height+j,r:j})
};g.update();return g};Raphael.fn.g.labelit=function(h){var g=h.getBBox(),f=c(20,g.width+10,g.height+10)/2;
return this.rect(g.x-f/2,g.y-f/2,g.width+f,g.height+f,f).attr({stroke:"none",fill:"#000"}).insertBefore(h.node?h:h[0])
};Raphael.fn.g.drop=function(f,k,j,h,i){h=h||30;i=i||0;var g=this.set();g.push(this.path(["M",f,k,"l",h,0,"A",h*0.4,h*0.4,0,1,0,f+h*0.7,k-h*0.7,"z"]).attr({fill:"#000",stroke:"none",rotation:[22.5-i,f,k]}));
i=(i+90)*Math.PI/180;g.push(this.text(f+h*Math.sin(i),k+h*Math.cos(i),j).attr(this.g.txtattr).attr({"font-size":h*12/30,fill:"#fff"}));
g.drop=g[0];g.text=g[1];return g};Raphael.fn.g.blob=function(g,m,l,k,i){k=(+k+1?k:45)+90;
i=i||12;var f=Math.PI/180,j=i*12/12;var h=this.set();h.push(this.path().attr({fill:"#000",stroke:"none"}));
h.push(this.text(g+i*Math.sin((k)*f),m+i*Math.cos((k)*f)-j/2,l).attr(this.g.txtattr).attr({"font-size":j,fill:"#fff"}));
h.update=function(t,s,y){t=t||g;s=s||m;var A=this[1].getBBox(),D=a(A.width+j,i*25/12),z=a(A.height+j,i*25/12),o=t+i*Math.sin((k-22.5)*f),B=s+i*Math.cos((k-22.5)*f),q=t+i*Math.sin((k+22.5)*f),C=s+i*Math.cos((k+22.5)*f),F=(q-o)/2,E=(C-B)/2,p=D/2,n=z/2,x=-Math.sqrt(Math.abs(p*p*n*n-p*p*E*E-n*n*F*F)/(p*p*E*E+n*n*F*F)),v=x*p*E/n+(q+o)/2,u=x*-n*F/p+(C+B)/2;
if(y){this.animate({x:v,y:u,path:["M",g,m,"L",q,C,"A",p,n,0,1,1,o,B,"z"].join(",")},500,">")
}else{this.attr({x:v,y:u,path:["M",g,m,"L",q,C,"A",p,n,0,1,1,o,B,"z"].join(",")})
}return this};h.update(g,m);return h};Raphael.fn.g.colorValue=function(i,h,g,f){return"hsb("+[c((1-i/h)*0.4,1),g||0.75,f||0.75]+")"
};Raphael.fn.g.snapEnds=function(n,o,m){var k=n,p=o;if(k==p){return{from:k,to:p,power:0}
}function q(f){return Math.abs(f-0.5)<0.25?~~(f)+0.5:Math.round(f)}var l=(p-k)/m,g=~~(l),j=g,h=0;
if(g){while(j){h--;j=~~(l*Math.pow(10,h))/Math.pow(10,h)}h++}else{while(!g){h=h||1;
g=~~(l*Math.pow(10,h))/Math.pow(10,h);h++}h&&h--}p=q(o*Math.pow(10,h))/Math.pow(10,h);
if(p<o){p=q((o+0.5)*Math.pow(10,h))/Math.pow(10,h)}k=q((n-(h>0?0:0.5))*Math.pow(10,h))/Math.pow(10,h);
return{from:k,to:p,power:h}};Raphael.fn.g.axis=function(v,u,o,G,l,J,m,L,n,g){g=g==null?2:g;
n=n||"t";J=J||10;var F=n=="|"||n==" "?["M",v+0.5,u,"l",0,0.001]:m==1||m==3?["M",v+0.5,u,"l",0,-o]:["M",v,u+0.5,"l",o,0],z=this.g.snapEnds(G,l,J),K=z.from,B=z.to,I=z.power,H=0,C=this.set();
d=(B-K)/J;var s=K,q=I>0?I:0;w=o/J;if(+m==1||+m==3){var h=u,A=(m-1?1:-1)*(g+3+!!(m-1));
while(h>=u-o){n!="-"&&n!=" "&&(F=F.concat(["M",v-(n=="+"||n=="|"?g:!(m-1)*g*2),h+0.5,"l",g*2+1,0]));
C.push(this.text(v+A,h,(L&&L[H++])||(Math.round(s)==s?s:+s.toFixed(q))).attr(this.g.txtattr).attr({"text-anchor":m-1?"start":"end"}));
s+=d;h-=w}if(Math.round(h+w-(u-o))){n!="-"&&n!=" "&&(F=F.concat(["M",v-(n=="+"||n=="|"?g:!(m-1)*g*2),u-o+0.5,"l",g*2+1,0]));
C.push(this.text(v+A,u-o,(L&&L[H])||(Math.round(s)==s?s:+s.toFixed(q))).attr(this.g.txtattr).attr({"text-anchor":m-1?"start":"end"}))
}}else{s=K;q=(I>0)*I;A=(m?-1:1)*(g+9+!m);var k=v,w=o/J,D=0,E=0;while(k<=v+o){n!="-"&&n!=" "&&(F=F.concat(["M",k+0.5,u-(n=="+"?g:!!m*g*2),"l",0,g*2+1]));
C.push(D=this.text(k,u+A,(L&&L[H++])||(Math.round(s)==s?s:+s.toFixed(q))).attr(this.g.txtattr));
var p=D.getBBox();if(E>=p.x-5){C.pop(C.length-1).remove()}else{E=p.x+p.width}s+=d;
k+=w}if(Math.round(k-w-v-o)){n!="-"&&n!=" "&&(F=F.concat(["M",v+o+0.5,u-(n=="+"?g:!!m*g*2),"l",0,g*2+1]));
C.push(this.text(v+o,u+A,(L&&L[H])||(Math.round(s)==s?s:+s.toFixed(q))).attr(this.g.txtattr))
}}var M=this.path(F);M.text=C;M.all=this.set([M,C]);M.remove=function(){this.text.remove();
this.constructor.prototype.remove.call(this)};return M};Raphael.el.lighter=function(g){g=g||2;
var f=[this.attrs.fill,this.attrs.stroke];this.fs=this.fs||[f[0],f[1]];f[0]=Raphael.rgb2hsb(Raphael.getRGB(f[0]).hex);
f[1]=Raphael.rgb2hsb(Raphael.getRGB(f[1]).hex);f[0].b=c(f[0].b*g,1);f[0].s=f[0].s/g;
f[1].b=c(f[1].b*g,1);f[1].s=f[1].s/g;this.attr({fill:"hsb("+[f[0].h,f[0].s,f[0].b]+")",stroke:"hsb("+[f[1].h,f[1].s,f[1].b]+")"})
};Raphael.el.darker=function(g){g=g||2;var f=[this.attrs.fill,this.attrs.stroke];
this.fs=this.fs||[f[0],f[1]];f[0]=Raphael.rgb2hsb(Raphael.getRGB(f[0]).hex);f[1]=Raphael.rgb2hsb(Raphael.getRGB(f[1]).hex);
f[0].s=c(f[0].s*g,1);f[0].b=f[0].b/g;f[1].s=c(f[1].s*g,1);f[1].b=f[1].b/g;this.attr({fill:"hsb("+[f[0].h,f[0].s,f[0].b]+")",stroke:"hsb("+[f[1].h,f[1].s,f[1].b]+")"})
};Raphael.el.original=function(){if(this.fs){this.attr({fill:this.fs[0],stroke:this.fs[1]});
delete this.fs}}})();
/*
 * Color Picker 0.1.0 - Raphael plugin
 *
 * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
 * Based on Color Wheel (http://jweir.github.com/colorwheel) by John Weir (http://famedriver.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function(a){a.colorpicker=function(i,m,k,l,j){return new b(i,m,k,l,j)
};a.fn.colorPickerIcon=function(j,p,n){var l=g*n*2/Math.min(n/8,4);var k=g/2-g*2/l*1.5,o=["M",j,p-n,"A",n,n,0,0,1,n*Math.cos(k)+j,p-n*Math.sin(k),"L",j,p,"z"].join();
for(var m=0;m<l;m++){this.path(o).attr({stroke:"none",fill:"hsb("+(l-m)*(255/l)+", 255, 255)",rotation:[90+(360/l)*m,j,p]})
}return this.circle(j,p,n).attr({fill:"r#fff-#fff","fill-opacity":0,"stroke-width":Math.round(n*0.03),stroke:"#fff"})
};var g=Math.PI;function h(i,j){return(i<0)*180+Math.atan(-j/-i)*180/g}var f=document,e=window,c=(function(){if(f.addEventListener){return function(m,k,j,i){var l=function(n){return j.call(i,n)
};m.addEventListener(k,l,false);return function(){m.removeEventListener(k,l,false);
return true}}}else{if(f.attachEvent){return function(n,l,k,j){var m=function(o){return k.call(j,o||e.event)
};n.attachEvent("on"+l,m);var i=function(){n.detachEvent("on"+l,m);return true};return i
}}}})(),b=function(q,o,E,j,i){E=E||200;var p=3*E/200,v=E/200,w=1.6180339887,K=E/20,n=E/2,C=2*E/200,F=E+K*2+C*3,z=this,u=1,k=1,G=1,A=E-(K*4),D=i?a(i,E,F):a(q,o,E,F),l=A/6+K*2+C,m=A*2/3-C*2;
v<1&&(v=1);p<1&&(p=1);D.colorPickerIcon(n,n,n-C);z.cursor=D.set();z.cursor.push(D.circle(n,n,K/2).attr({stroke:"#000",opacity:0.5,"stroke-width":p}));
z.cursor.push(z.cursor[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":v}));
z.disc=D.circle(n,n,n-C).attr({fill:"#000","fill-opacity":0,stroke:"none",cursor:"crosshair"});
var J=z.disc.node.style;J.unselectable="on";J.MozUserSelect="none";J.WebkitUserSelect="none";
var I=K*2+2;z.brect=D.rect(C+I/w/2,E+C*2,E-C*2-I/w,I-C*2).attr({stroke:"#fff",fill:"180-#fff-#000"});
z.cursorb=D.set();z.cursorb.push(D.rect(E-C-I/w,E+C,~~(I/w),I,p).attr({stroke:"#000",opacity:0.5,"stroke-width":p}));
z.cursorb.push(z.cursorb[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":v}));
z.btop=z.brect.clone().attr({stroke:"#000",fill:"#000",opacity:0});J=z.btop.node.style;
J.unselectable="on";J.MozUserSelect="none";J.WebkitUserSelect="none";z.bwidth=~~(I/w)/2;
z.minx=C+z.bwidth;z.maxx=E-I/w-C+z.bwidth;z.H=z.S=z.B=1;z.padding=C;z.raphael=D;z.size2=n;
z.size20=K;z.x=q;z.y=o;z.hson=c(z.disc.node,"mousedown",function(t){var s=f.documentElement.scrollTop||f.body.scrollTop,x=f.documentElement.scrollLeft||f.body.scrollLeft;
this.hsOnTheMove=true;this.setHS(t.clientX+x-this.x,t.clientY+s-this.y);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},z);z.bon=c(z.btop.node,"mousedown",function(s){var t=f.documentElement.scrollLeft||f.body.scrollLeft;
this.bOnTheMove=true;this.setB(s.clientX+t-this.x);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},z);z.winunload=c(e,"unload",function(){this.hson();
this.bon();this.docmove&&this.docmove();this.docup&&this.docup();this.winunload()
},z);z.color(j||"#fff");this.onchanged&&this.onchanged(this.color())};b.prototype.setB=function(i){i<this.minx&&(i=this.minx);
i>this.maxx&&(i=this.maxx);this.cursorb.attr({x:i-this.bwidth});this.B=(i-this.minx)/(this.maxx-this.minx);
this.onchange&&this.onchange(this.color())};b.prototype.setHS=function(i,o){var n=i-this.size2,m=o-this.size2,j=this.size2-this.size20/2-this.padding,l=h(n,m),k=l*g/180;
isNaN(l)&&(l=0);if(n*n+m*m>j*j){i=j*Math.cos(k)+this.size2;o=j*Math.sin(k)+this.size2
}this.cursor.attr({cx:i,cy:o});this.H=(1-l/360)%1;this.S=Math.min((n*n+m*m)/j/j,1);
this.brect.attr({fill:"180-hsb("+[this.H,this.S]+",1)-#000"});this.onchange&&this.onchange(this.color())
};b.prototype.docOnMove=function(j){var i=f.documentElement.scrollTop||f.body.scrollTop,k=f.documentElement.scrollLeft||f.body.scrollLeft;
if(this.hsOnTheMove){this.setHS(j.clientX+k-this.x,j.clientY+i-this.y)}if(this.bOnTheMove){this.setB(j.clientX+k-this.x)
}j.preventDefault&&j.preventDefault();j.returnValue=false;return false};b.prototype.docOnUp=function(i){this.hsOnTheMove=this.bOnTheMove=false;
this.docmove();delete this.docmove;this.docup();delete this.docup;this.onchanged&&this.onchanged(this.color());
i.preventDefault&&i.preventDefault();i.stopPropagation&&i.stopPropagation();i.returnValue=false;
return false};b.prototype.remove=function(){this.raphael.remove();this.color=function(){return false
}};b.prototype.color=function(j){if(j){j=a.getRGB(j);var m=j.hex;j=a.rgb2hsb(j.r,j.g,j.b);
n=j.h*360;this.H=j.h;this.S=j.s;this.B=j.b;this.cursorb.attr({x:this.B*(this.maxx-this.minx)+this.minx-this.bwidth});
this.brect.attr({fill:"180-hsb("+[this.H,this.S]+",1)-#000"});var n=(1-this.H)*360,l=n*g/180,k=(this.size2-this.size20/2-this.padding)*this.S,i=Math.cos(l)*k+this.size2,o=Math.sin(l)*k+this.size2;
this.cursor.attr({cx:i,cy:o});return this}else{return a.hsb2rgb(this.H,this.S,this.B).hex
}}})(window.Raphael);(function(a){a.colorwheel=function(i,m,k,l,j){return new b(i,m,k,l,j)
};var g=Math.PI;function h(i,j){return(i<0)*180+Math.atan(-j/-i)*180/g}var f=document,e=window;
var c=(function(){if(f.addEventListener){return function(m,k,j,i){var l=function(n){return j.call(i,n)
};m.addEventListener(k,l,false);return function(){m.removeEventListener(k,l,false);
return true}}}else{if(f.attachEvent){return function(n,l,k,j){var m=function(o){return k.call(j,o||e.event)
};n.attachEvent("on"+l,m);var i=function(){n.detachEvent("on"+l,m);return true};return i
}}}})();var b=function(v,q,G,k,j){G=G||200;var u=3*G/200,z=G/200,A=1.6180339887,K=g*G/5,P=G/20,p=G/2,E=2*G/200,C=this;
var w=1,l=1,I=1,D=G-(P*4);var F=j?a(j,G,G):a(v,q,G,G),n=D/6+P*2+E,o=D*2/3-E*2;z<1&&(z=1);
u<1&&(u=1);var O=g/2-g*2/K*1.3,m=p-E,N=p-E-P*2,J=["M",p,E,"A",m,m,0,0,1,m*Math.cos(O)+m+E,m-m*Math.sin(O)+E,"L",N*Math.cos(O)+m+E,m-N*Math.sin(O)+E,"A",N,N,0,0,0,p,E+P*2,"z"].join();
for(var L=0;L<K;L++){F.path(J).attr({stroke:"none",fill:"hsb("+L*(255/K)+", 255, 200)",rotation:[(360/K)*L,p,p]})
}F.path(["M",p,E,"A",m,m,0,1,1,p-1,E,"l1,0","M",p,E+P*2,"A",N,N,0,1,1,p-1,E+P*2,"l1,0"]).attr({"stroke-width":u,stroke:"#fff"});
C.cursorhsb=F.set();var M=P*2+2;C.cursorhsb.push(F.rect(p-M/A/2,E-1,M/A,M,3*G/200).attr({stroke:"#000",opacity:0.5,"stroke-width":u}));
C.cursorhsb.push(C.cursorhsb[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":z}));
C.ring=F.path(["M",p,E,"A",m,m,0,1,1,p-1,E,"l1,0M",p,E+P*2,"A",N,N,0,1,1,p-1,E+P*2,"l1,0"]).attr({fill:"#000",opacity:0,stroke:"none"});
C.main=F.rect(n,n,o,o).attr({stroke:"none",fill:"#f00",opacity:1});C.main.clone().attr({stroke:"none",fill:"0-#fff-#fff",opacity:0});
C.square=F.rect(n-1,n-1,o+2,o+2).attr({r:2,stroke:"#fff","stroke-width":u,fill:"90-#000-#000",opacity:0,cursor:"crosshair"});
C.cursor=F.set();C.cursor.push(F.circle(p,p,P/2).attr({stroke:"#000",opacity:0.5,"stroke-width":u}));
C.cursor.push(C.cursor[0].clone().attr({stroke:"#fff",opacity:1,"stroke-width":z}));
C.H=C.S=C.B=1;C.raphael=F;C.size2=p;C.wh=o;C.x=v;C.xy=n;C.y=q;C.hsbon=c(C.ring.node,"mousedown",function(i){this.hsbOnTheMove=true;
this.setH(i.clientX-this.x-this.size2,i.clientY-this.y-this.size2);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},C);C.clron=c(C.square.node,"mousedown",function(i){this.clrOnTheMove=true;
this.setSB(i.clientX-this.x,i.clientY-this.y);this.docmove=c(f,"mousemove",this.docOnMove,this);
this.docup=c(f,"mouseup",this.docOnUp,this)},C);C.winunload=c(e,"unload",function(){this.hsbon();
this.clron();this.docmove&&this.docmove();this.docup&&this.docup();this.winunload()
},C);C.color(k||"#f00");this.onchanged&&this.onchanged(this.color())};b.prototype.setH=function(i,l){var k=h(i,l),j=k*g/180;
this.cursorhsb.rotate(k+90,this.size2,this.size2);this.H=(k+90)/360;this.main.attr({fill:"hsb("+this.H+",1,1)"});
this.onchange&&this.onchange(this.color())};b.prototype.setSB=function(i,j){i<this.size2-this.wh/2&&(i=this.size2-this.wh/2);
i>this.size2+this.wh/2&&(i=this.size2+this.wh/2);j<this.size2-this.wh/2&&(j=this.size2-this.wh/2);
j>this.size2+this.wh/2&&(j=this.size2+this.wh/2);this.cursor.attr({cx:i,cy:j});this.B=1-(j-this.xy)/this.wh;
this.S=(i-this.xy)/this.wh;this.onchange&&this.onchange(this.color())};b.prototype.docOnMove=function(i){if(this.hsbOnTheMove){this.setH(i.clientX-this.x-this.size2,i.clientY-this.y-this.size2)
}if(this.clrOnTheMove){this.setSB(i.clientX-this.x,i.clientY-this.y)}i.preventDefault&&i.preventDefault();
i.returnValue=false;return false};b.prototype.docOnUp=function(i){this.hsbOnTheMove=this.clrOnTheMove=false;
this.docmove();delete this.docmove;this.docup();delete this.docup;this.onchanged&&this.onchanged(this.color())
};b.prototype.remove=function(){this.raphael.remove();this.color=function(){return false
}};b.prototype.color=function(j){if(j){j=a.getRGB(j);j=a.rgb2hsb(j.r,j.g,j.b);var k=j.h*360;
this.H=j.h;this.S=j.s;this.B=j.b;this.cursorhsb.rotate(k,this.size2,this.size2);this.main.attr({fill:"hsb("+this.H+",1,1)"});
var i=this.S*this.wh+this.xy,l=(1-this.B)*this.wh+this.xy;this.cursor.attr({cx:i,cy:l});
return this}else{return a.hsb2rgb(this.H,this.S,this.B).hex}}})(window.Raphael);
/*
 * Color Picker 0.1.0 - Raphael plugin
 *
 * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
 * Based on Color Wheel (http://jweir.github.com/colorwheel) by John Weir (http://famedriver.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function(b,a){b.fn.colorpicker=function(c,e){if(a){var f=this.offset();
return a.colorpicker(f.left,f.top,c,e,this[0])}return null}})(window.jQuery,window.Raphael);
(function(b,a){b.fn.colorwheel=function(c,e){if(a){var f=this.offset();return a.colorwheel(f.left,f.top,c,e,this[0])
}return null}})(window.jQuery,window.Raphael);
/*
 * Raphael Blur Plugin 0.1
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function(){if(Raphael.vml){var a=/ progid:\S+Blur\([^\)]+\)/g;
Raphael.el.blur=function(c){var e=this.node.style,g=e.filter;g=g.replace(a,"");if(c!="none"){e.filter=g+" progid:DXImageTransform.Microsoft.Blur(pixelradius="+(+c||1.5)+")";
e.margin=Raphael.format("-{0}px 0 0 -{0}px",Math.round(+c||1.5))}else{e.filter=g;
e.margin=0}}}else{var b=function(f,c){if(c){for(var e in c){if(c.hasOwnProperty(e)){f.setAttribute(e,c[e])
}}}else{return doc.createElementNS("http://www.w3.org/2000/svg",f)}};Raphael.el.blur=function(c){if(c!="none"){var e=b("filter"),f=b("feGaussianBlur");
e.id="r"+(Raphael.idGenerator++).toString(36);b(f,{stdDeviation:+c||1.5});e.appendChild(f);
this.paper.defs.appendChild(e);this._blur=e;b(this.node,{filter:"url(#"+e.id+")"})
}else{if(this._blur){this._blur.parentNode.removeChild(this._blur);delete this._blur
}this.node.removeAttribute("filter")}}}})();
/*
 * Raphael Path Methods Plugin 0.2
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.el.isAbsolute=true;
Raphael.el.absolutely=function(){this.isAbsolute=1;return this};Raphael.el.relatively=function(){this.isAbsolute=0;
return this};Raphael.el.moveTo=function(a,b){this._last={x:a,y:b};return this.attr({path:this.attrs.path+["m","M"][+this.isAbsolute]+parseFloat(a)+" "+parseFloat(b)})
};Raphael.el.lineTo=function(a,b){this._last={x:a,y:b};return this.attr({path:this.attrs.path+["l","L"][+this.isAbsolute]+parseFloat(a)+" "+parseFloat(b)})
};Raphael.el.arcTo=function(f,e,b,c,a,h,g){this._last={x:a,y:h};return this.attr({path:this.attrs.path+["a","A"][+this.isAbsolute]+[parseFloat(f),parseFloat(e),+g,b,c,parseFloat(a),parseFloat(h)].join(" ")})
};Raphael.el.curveTo=function(){var a=Array.prototype.splice.call(arguments,0,arguments.length),b=[0,0,0,0,"s",0,"c"][a.length]||"";
this.isAbsolute&&(b=b.toUpperCase());this._last={x:a[a.length-2],y:a[a.length-1]};
return this.attr({path:this.attrs.path+b+a})};Raphael.el.cplineTo=function(a,c,b){this.attr({path:this.attrs.path+["C",this._last.x+b,this._last.y,a-b,c,a,c]});
this._last={x:a,y:c};return this};Raphael.el.qcurveTo=function(){var b=[0,1,"t",3,"q"][arguments.length],a=Array.prototype.splice.call(arguments,0,arguments.length);
if(this.isAbsolute){b=b.toUpperCase()}this._last={x:a[a.length-2],y:a[a.length-1]};
return this.attr({path:this.attrs.path+b+a})};Raphael.el.addRoundedCorner=function(c,b){var a=this.isAbsolute;
a&&this.relatively();this._last={x:c*(!!(b.indexOf("r")+1)*2-1),y:c*(!!(b.indexOf("d")+1)*2-1)};
this.arcTo(c,c,0,{lu:1,rd:1,ur:1,dl:1}[b]||0,this._last.x,this._last.y);a&&this.absolutely();
return this};Raphael.el.andClose=function(){return this.attr({path:this.attrs.path+"z"})
};
/*
 * Raphael Primitives Plugin 0.2
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.fn.star=function(a,j,h,c,b){c=c||h*0.382;
b=b||5;var g=["M",a,j+c,"L"],f;for(var e=1;e<b*2;e++){f=e%2?h:c;g=g.concat([(a+f*Math.sin(e*Math.PI/b)),(j+f*Math.cos(e*Math.PI/b))])
}g.push("z");return this.path(g.join())};Raphael.fn.flower=function(a,j,b,g,h){g=g||b*0.5;
h=+h<3||!h?5:h;var f=["M",a,j+g,"Q"],e;for(var c=1;c<h*2+1;c++){e=c%2?b:g;f=f.concat([+(a+e*Math.sin(c*Math.PI/h)).toFixed(3),+(j+e*Math.cos(c*Math.PI/h)).toFixed(3)])
}f.push("z");return this.path(f)};Raphael.fn.spike=function(a,j,b,g,h){g=g||b*0.5;
h=+h<3||!h?5:h;var f=["M",a,j-b,"Q"],e;for(var c=1;c<h*2+1;c++){e=c%2?g:b;f=f.concat([a+e*Math.sin(c*Math.PI/h-Math.PI),j+e*Math.cos(c*Math.PI/h-Math.PI)])
}f.push("z");return this.path(f)};Raphael.fn.polyline=function(){var c="M".concat(arguments[0]||0,",",arguments[1]||0,"L");
for(var a=2,b=arguments.length-1;a<b;a++){c+=arguments[a]+","+arguments[++a]}arguments[b].toLowerCase()=="z"&&(c+="z");
return this.path(c)};Raphael.fn.polygon=function(a,h,f,g){g=+g<3||!g?5:g;var e=["M",a,h-f,"L"],c;
for(var b=1;b<g;b++){e=e.concat([a+f*Math.sin(b*Math.PI*2/g-Math.PI),h+f*Math.cos(b*Math.PI*2/g-Math.PI)])
}e.push("z");return this.path(e)};Raphael.fn.line=function(b,e,a,c){return this.path(["M",b,e,"L",a,c])
};Raphael.fn.drawGrid=function(l,k,m,g,f,j,c){c=c||"#000";var n=["M",l,k,"L",l+m,k,l+m,k+g,l,k+g,l,k],a=g/j,b=m/f;
for(var e=1;e<j;e++){n=n.concat(["M",l,k+e*a,"L",l+m,k+e*a])}for(var e=1;e<f;e++){n=n.concat(["M",l+e*b,k,"L",l+e*b,k+g])
}return this.path(n.join(",")).attr({stroke:c})};Raphael.fn.square=function(a,c,b){b=b*0.7;
return this.rect(a-b,c-b,2*b,2*b)};Raphael.fn.triangle=function(a,c,b){b*=1.75;return this.path("M".concat(a,",",c,"m0-",b*0.58,"l",b*0.5,",",b*0.87,"-",b,",0z"))
};Raphael.fn.diamond=function(a,c,b){return this.path(["M",a,c-b,"l",b,b,-b,b,-b,-b,b,-b,"z"])
};Raphael.fn.cross=function(a,c,b){b=b/2.5;return this.path("M".concat(a-b,",",c,"l",[-b,-b,b,-b,b,b,b,-b,b,b,-b,b,b,b,-b,b,-b,-b,-b,b,-b,-b,"z"]))
};Raphael.fn.plus=function(a,c,b){b=b/2;return this.path("M".concat(a-b/2,",",c-b/2,"l",[0,-b,b,0,0,b,b,0,0,b,-b,0,0,b,-b,0,0,-b,-b,0,0,-b,"z"]))
};Raphael.fn.arrow=function(a,c,b){return this.path("M".concat(a-b*0.7,",",c-b*0.4,"l",[b*0.6,0,0,-b*0.4,b,b*0.8,-b,b*0.8,0,-b*0.4,-b*0.6,0],"z"))
};
/*
 * Raphael Shadow plugin 0.3
 *
 * Copyright (c) 2008 - 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.shadow=function(j,i,k,z,e){e=e||{};
var m=~~(p*0.3+0.5),p=(e.size||1)*10,v=e.color||"#fff",g=e.stroke||v,q=e.shadow||"#000",B=e.target||null,f=e.r==null?3:e.r,n=p,A=p*2,o=A+n,u=this.format("r{0}-{0}",q),c="rect",a="none",C,l;
if(B){C=this(B,k+(j=n)*2,z+(i=m)+A)}else{C=this(j-n,i-m,k+(j=n)*2,z+(i=m)+A)}l=C.set(C.rect(j-n,i-m,A+n,z+i+A).attr({stroke:a,fill:this.format("180-{0}-{0}",q),opacity:0,"clip-rect":[j-n+1,i-m+o,A,z+i+A-o*2+0.9]}),C.rect(j+k-A,i-m,A+n,z+i+A).attr({stroke:a,fill:this.format("0-{0}-{0}",q),opacity:0,"clip-rect":[j+k-n+1,i-m+o,A,z+i+A-o*2]}),C.rect(j+A-1,i+z-n,k+A,A+n).attr({stroke:a,fill:this.format("270-{0}-{0}",q),opacity:0,"clip-rect":[j+A,i+z-n,k+A-o*2,A+n]}),C.rect(j+n-1,i-m,k+A,A+n).attr({stroke:a,fill:this.format("90-{0}-{0}",q),opacity:0,"clip-rect":[j+A,i-m,k+A-o*2,n+m+1]}),C.circle(j+A,i+z-n,o).attr({stroke:a,fill:u,opacity:0,"clip-rect":[j-n,i+z-n+0.999,o,o]}),C.circle(j+k-A,i+z-n,o).attr({stroke:a,fill:u,opacity:0,"clip-rect":[j+k-A,i+z-n,o,o]}),C.circle(j+A,i-m+o,o).attr({stroke:a,fill:u,opacity:0,"clip-rect":[j-n,i-m,o,o]}),C.circle(j+k-A,i-m+o,o).attr({stroke:a,fill:u,opacity:0,"clip-rect":[j+k-A,i-m,o,o]}),C.rect(j,i,k,z,f).attr({fill:v,stroke:g}));
return l[0].paper};(function(){function a8(){if(a8.is(arguments[0],dc)){var a=arguments[0],l=dh[aO](a8,a.splice(0,3+a8.is(a[0],dg))),k=l.set();
for(var j=0,f=a[av];j<f;j++){var c=a[j]||{};a4[aY](c.type)&&k[c5](l[c.type]().attr(c))
}return k}return dh[aO](a8,arguments)}a8.version="1.5.2";var a6=/[, ]+/,a4={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},a2=/\{(\d+)\}/g,a0="prototype",aY="hasOwnProperty",aW=document,aU=window,aS={was:Object[a0][aY].call(aU,"Raphael"),is:aU.Raphael},aR=function(){this.customAttributes={}
},aQ,aP="appendChild",aO="apply",aN="concat",aL="createTouch" in aW,aJ="",aH=" ",aF=String,aD="split",aB="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend"[aD](aH),az={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},ax="join",av="length",at=aF[a0].toLowerCase,aq=Math,ao=aq.max,dp=aq.min,dm=aq.abs,dk=aq.pow,di=aq.PI,dg="number",de="string",dc="array",da="toString",c8="fill",c7=Object[a0][da],c6={},c5="push",c4=/^url\(['"]?([^\)]+?)['"]?\)$/i,c2=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,c0={"NaN":1,Infinity:1,"-Infinity":1},cX=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,cU=aq.round,cR="setAttribute",cP=parseFloat,cN=parseInt,cL=" progid:DXImageTransform.Microsoft",cJ=aF[a0].toUpperCase,cH={blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},cF={along:"along",blur:dg,"clip-rect":"csv",cx:dg,cy:dg,fill:"colour","fill-opacity":dg,"font-size":dg,height:dg,opacity:dg,path:"path",r:dg,rotation:"csv",rx:dg,ry:dg,scale:"csv",stroke:"colour","stroke-opacity":dg,"stroke-width":dg,translation:"csv",width:dg,x:dg,y:dg},b9="replace",b7=/^(from|to|\d+%?)$/,dI=/\s*,\s*/,b0={hs:1,rg:1},cZ=/,?([achlmqrstvxz]),?/gi,cW=/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,cT=/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,cQ=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,cO=function(e,c){return e.key-c.key
};a8.type=aU.SVGAngle||aW.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML";
if(a8.type=="VML"){var cM=aW.createElement("div"),cK;cM.innerHTML='<v:shape adj="1"/>';
cK=cM.firstChild;cK.style.behavior="url(#default#VML)";if(!(cK&&typeof cK.adj=="object")){return a8.type=null
}cM=null}a8.svg=!(a8.vml=a8.type=="VML");aR[a0]=a8[a0];aQ=aR[a0];a8._id=0;a8._oid=0;
a8.fn={};a8.is=function(e,c){c=at.call(c);if(c=="finite"){return !c0[aY](+e)}return c=="null"&&e===null||c==typeof e||c=="object"&&e===Object(e)||c=="array"&&Array.isArray&&Array.isArray(e)||c7.call(e).slice(8,-1).toLowerCase()==c
};a8.angle=function(a,p,o,n,m,l){if(m==null){var k=a-o,j=p-n;if(!k&&!j){return 0}return((k<0)*180+aq.atan(-j/-k)*180/di+360)%360
}return a8.angle(a,p,m,l)-a8.angle(o,n,m,l)};a8.rad=function(b){return b%360*di/180
};a8.deg=function(b){return b*180/di%360};a8.snapTo=function(a,j,i){i=a8.is(i,"finite")?i:10;
if(a8.is(a,dc)){var h=a.length;while(h--){if(dm(a[h]-j)<=i){return a[h]}}}else{a=+a;
var g=j%a;if(g<i){return j-g}if(g>a-i){return j-g+a}}return j};function cI(){var e=[],c=0;
for(;c<32;c++){e[c]=(~(~(aq.random()*16)))[da](16)}e[12]=4;e[16]=(e[16]&3|8)[da](16);
return"r-"+e[ax]("")}a8.setWindow=function(b){aU=b;aW=aU.document};var cG=function(g){if(i.vml){var n=/^\s+|\s+$/g,m;
try{var l=new ActiveXObject("htmlfile");l.write("<body>");l.close();m=l.body}catch(i){m=createPopup().document.body
}var k=m.createTextRange();cG=b5(function(e){try{m.style.color=aF(e)[b9](n,aJ);var c=k.queryCommandValue("ForeColor");
c=(c&255)<<16|c&65280|(c&16711680)>>>16;return"#"+("000000"+c[da](16)).slice(-6)}catch(e){return"none"
}})}else{var j=aW.createElement("i");j.title="Raphaël Colour Picker";j.style.display="none";
aW.body[aP](j);cG=b5(function(b){j.style.color=b;return aW.defaultView.getComputedStyle(j,aJ).getPropertyValue("color")
})}return cG(g)},cE=function(){return"hsb("+[this.h,this.s,this.b]+")"},b8=function(){return"hsl("+[this.h,this.s,this.l]+")"
},b6=function(){return this.hex};a8.hsb2rgb=function(a,h,g,f){if(a8.is(a,"object")&&"h" in a&&"s" in a&&"b" in a){g=a.b;
h=a.s;a=a.h;f=a.o}return a8.hsl2rgb(a,h,g/2,f)};a8.hsl2rgb=function(A,z,y,x){if(a8.is(A,"object")&&"h" in A&&"s" in A&&"l" in A){y=A.l;
z=A.s;A=A.h}if(A>1||z>1||y>1){A/=360;z/=100;y/=100}var w={},v=["r","g","b"],u,t,s,q,p,o;
if(z){y<0.5?u=y*(1+z):u=y+z-y*z;t=2*y-u;for(var a=0;a<3;a++){s=A+1/3*-(a-1);s<0&&s++;
s>1&&s--;s*6<1?w[v[a]]=t+(u-t)*6*s:s*2<1?w[v[a]]=u:s*3<2?w[v[a]]=t+(u-t)*(2/3-s)*6:w[v[a]]=t
}}else{w={r:y,g:y,b:y}}w.r*=255;w.g*=255;w.b*=255;w.hex="#"+(16777216|w.b|w.g<<8|w.r<<16).toString(16).slice(1);
a8.is(x,"finite")&&(w.opacity=x);w.toString=b6;return w};a8.rgb2hsb=function(u,t,s){if(t==null&&a8.is(u,"object")&&"r" in u&&"g" in u&&"b" in u){s=u.b;
t=u.g;u=u.r}if(t==null&&a8.is(u,de)){var q=a8.getRGB(u);u=q.r;t=q.g;s=q.b}if(u>1||t>1||s>1){u/=255;
t/=255;s/=255}var p=ao(u,t,s),o=dp(u,t,s),n,m,l=p;if(o==p){return{h:0,s:0,b:p,toString:cE}
}var a=p-o;m=a/p;u==p?n=(t-s)/a:t==p?n=2+(s-u)/a:n=4+(u-t)/a;n/=6;n<0&&n++;n>1&&n--;
return{h:n,s:m,b:l,toString:cE}};a8.rgb2hsl=function(w,v,u){if(v==null&&a8.is(w,"object")&&"r" in w&&"g" in w&&"b" in w){u=w.b;
v=w.g;w=w.r}if(v==null&&a8.is(w,de)){var t=a8.getRGB(w);w=t.r;v=t.g;u=t.b}if(w>1||v>1||u>1){w/=255;
v/=255;u/=255}var s=ao(w,v,u),q=dp(w,v,u),p,o,n=(s+q)/2,m;if(q==s){m={h:0,s:0,l:n}
}else{var a=s-q;o=n<0.5?a/(s+q):a/(2-s-q);w==s?p=(v-u)/a:v==s?p=2+(u-w)/a:p=4+(w-v)/a;
p/=6;p<0&&p++;p>1&&p--;m={h:p,s:o,l:n}}m.toString=b8;return m};a8._path2string=function(){return this.join(",")[b9](cZ,"$1")
};function b5(f,e,h){function g(){var k=Array[a0].slice.call(arguments,0),c=k[ax]("►"),b=g.cache=g.cache||{},a=g.count=g.count||[];
if(b[aY](c)){return h?h(b[c]):b[c]}a[av]>=1000&&delete b[a.shift()];a[c5](c);b[c]=f[aO](e,k);
return h?h(b[c]):b[c]}return g}a8.getRGB=b5(function(s){if(!s||!(!((s=aF(s)).indexOf("-")+1))){return{r:-1,g:-1,b:-1,hex:"none",error:1}
}if(s=="none"){return{r:-1,g:-1,b:-1,hex:"none"}}!(b0[aY](s.toLowerCase().substring(0,2))||s.charAt()=="#")&&(s=cG(s));
var q,p,o,n,m,l,f,a=s.match(c2);if(a){if(a[2]){n=cN(a[2].substring(5),16);o=cN(a[2].substring(3,5),16);
p=cN(a[2].substring(1,3),16)}if(a[3]){n=cN((l=a[3].charAt(3))+l,16);o=cN((l=a[3].charAt(2))+l,16);
p=cN((l=a[3].charAt(1))+l,16)}if(a[4]){f=a[4][aD](dI);p=cP(f[0]);f[0].slice(-1)=="%"&&(p*=2.55);
o=cP(f[1]);f[1].slice(-1)=="%"&&(o*=2.55);n=cP(f[2]);f[2].slice(-1)=="%"&&(n*=2.55);
a[1].toLowerCase().slice(0,4)=="rgba"&&(m=cP(f[3]));f[3]&&f[3].slice(-1)=="%"&&(m/=100)
}if(a[5]){f=a[5][aD](dI);p=cP(f[0]);f[0].slice(-1)=="%"&&(p*=2.55);o=cP(f[1]);f[1].slice(-1)=="%"&&(o*=2.55);
n=cP(f[2]);f[2].slice(-1)=="%"&&(n*=2.55);(f[0].slice(-3)=="deg"||f[0].slice(-1)=="°")&&(p/=360);
a[1].toLowerCase().slice(0,4)=="hsba"&&(m=cP(f[3]));f[3]&&f[3].slice(-1)=="%"&&(m/=100);
return a8.hsb2rgb(p,o,n,m)}if(a[6]){f=a[6][aD](dI);p=cP(f[0]);f[0].slice(-1)=="%"&&(p*=2.55);
o=cP(f[1]);f[1].slice(-1)=="%"&&(o*=2.55);n=cP(f[2]);f[2].slice(-1)=="%"&&(n*=2.55);
(f[0].slice(-3)=="deg"||f[0].slice(-1)=="°")&&(p/=360);a[1].toLowerCase().slice(0,4)=="hsla"&&(m=cP(f[3]));
f[3]&&f[3].slice(-1)=="%"&&(m/=100);return a8.hsl2rgb(p,o,n,m)}a={r:p,g:o,b:n};a.hex="#"+(16777216|n|o<<8|p<<16).toString(16).slice(1);
a8.is(m,"finite")&&(a.opacity=m);return a}return{r:-1,g:-1,b:-1,hex:"none",error:1}
},a8);a8.getColor=function(f){var e=this.getColor.start=this.getColor.start||{h:0,s:1,b:f||0.75},g=this.hsb2rgb(e.h,e.s,e.b);
e.h+=0.075;if(e.h>1){e.h=0;e.s-=0.2;e.s<=0&&(this.getColor.start={h:0,s:1,b:e.b})
}return g.hex};a8.getColor.reset=function(){delete this.start};a8.parsePathString=b5(function(a){if(!a){return null
}var f={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},e=[];a8.is(a,dc)&&a8.is(a[0],dc)&&(e=b3(a));
e[av]||aF(a)[b9](cW,function(h,c,k){var j=[],i=at.call(c);k[b9](cT,function(l,g){g&&j[c5](+g)
});if(i=="m"&&j[av]>2){e[c5]([c][aN](j.splice(0,2)));i="l";c=c=="m"?"l":"L"}while(j[av]>=f[i]){e[c5]([c][aN](j.splice(0,f[i])));
if(!f[i]){break}}});e[da]=a8._path2string;return e});a8.findDotsAtSegment=function(P,O,N,M,L,K,J,I,H){var G=1-H,F=dk(G,3)*P+dk(G,2)*3*H*N+G*3*H*H*L+dk(H,3)*J,E=dk(G,3)*O+dk(G,2)*3*H*M+G*3*H*H*K+dk(H,3)*I,D=P+2*H*(N-P)+H*H*(L-2*N+P),C=O+2*H*(M-O)+H*H*(K-2*M+O),B=N+2*H*(L-N)+H*H*(J-2*L+N),A=M+2*H*(K-M)+H*H*(I-2*K+M),z=(1-H)*P+H*N,y=(1-H)*O+H*M,x=(1-H)*L+H*J,w=(1-H)*K+H*I,v=90-aq.atan((D-B)/(C-A))*180/di;
(D>B||C<A)&&(v+=180);return{x:F,y:E,m:{x:D,y:C},n:{x:B,y:A},start:{x:z,y:y},end:{x:x,y:w},alpha:v}
};var b4=b5(function(w){if(!w){return{x:0,y:0,width:0,height:0}}w=aZ(w);var v=0,u=0,t=[],s=[],q;
for(var p=0,o=w[av];p<o;p++){q=w[p];if(q[0]=="M"){v=q[1];u=q[2];t[c5](v);s[c5](u)
}else{var n=a1(v,u,q[1],q[2],q[3],q[4],q[5],q[6]);t=t[aN](n.min.x,n.max.x);s=s[aN](n.min.y,n.max.y);
v=q[5];u=q[6]}}var m=dp[aO](0,t),l=dp[aO](0,s);return{x:m,y:l,width:ao[aO](0,t)-m,height:ao[aO](0,s)-l}
}),b3=function(a){var l=[];if(!a8.is(a,dc)||!a8.is(a&&a[0],dc)){a=a8.parsePathString(a)
}for(var k=0,j=a[av];k<j;k++){l[k]=[];for(var i=0,h=a[k][av];i<h;i++){l[k][i]=a[k][i]
}}l[da]=a8._path2string;return l},b2=b5(function(G){if(!a8.is(G,dc)||!a8.is(G&&G[0],dc)){G=a8.parsePathString(G)
}var F=[],E=0,D=0,C=0,B=0,A=0;if(G[0][0]=="M"){E=G[0][1];D=G[0][2];C=E;B=D;A++;F[c5](["M",E,D])
}for(var z=A,y=G[av];z<y;z++){var x=F[z]=[],w=G[z];if(w[0]!=at.call(w[0])){x[0]=at.call(w[0]);
switch(x[0]){case"a":x[1]=w[1];x[2]=w[2];x[3]=w[3];x[4]=w[4];x[5]=w[5];x[6]=+(w[6]-E).toFixed(3);
x[7]=+(w[7]-D).toFixed(3);break;case"v":x[1]=+(w[1]-D).toFixed(3);break;case"m":C=w[1];
B=w[2];default:for(var v=1,u=w[av];v<u;v++){x[v]=+(w[v]-(v%2?E:D)).toFixed(3)}}}else{x=F[z]=[];
if(w[0]=="m"){C=w[1]+E;B=w[2]+D}for(var t=0,s=w[av];t<s;t++){F[z][t]=w[t]}}var a=F[z][av];
switch(F[z][0]){case"z":E=C;D=B;break;case"h":E+=+F[z][a-1];break;case"v":D+=+F[z][a-1];
break;default:E+=+F[z][a-2];D+=+F[z][a-1]}}F[da]=a8._path2string;return F},0,b3),b1=b5(function(E){if(!a8.is(E,dc)||!a8.is(E&&E[0],dc)){E=a8.parsePathString(E)
}var D=[],C=0,B=0,A=0,z=0,y=0;if(E[0][0]=="M"){C=+E[0][1];B=+E[0][2];A=C;z=B;y++;
D[0]=["M",C,B]}for(var x=y,w=E[av];x<w;x++){var v=D[x]=[],u=E[x];if(u[0]!=cJ.call(u[0])){v[0]=cJ.call(u[0]);
switch(v[0]){case"A":v[1]=u[1];v[2]=u[2];v[3]=u[3];v[4]=u[4];v[5]=u[5];v[6]=+(u[6]+C);
v[7]=+(u[7]+B);break;case"V":v[1]=+u[1]+B;break;case"H":v[1]=+u[1]+C;break;case"M":A=+u[1]+C;
z=+u[2]+B;default:for(var t=1,s=u[av];t<s;t++){v[t]=+u[t]+(t%2?C:B)}}}else{for(var q=0,a=u[av];
q<a;q++){D[x][q]=u[q]}}switch(v[0]){case"Z":C=A;B=z;break;case"H":C=v[1];break;case"V":B=v[1];
break;case"M":A=D[x][D[x][av]-2];z=D[x][D[x][av]-1];default:C=D[x][D[x][av]-2];B=D[x][D[x][av]-1]
}}D[da]=a8._path2string;return D},null,b3),a9=function(f,e,h,g){return[f,e,h,g,h,g]
},a7=function(j,i,p,o,n,m){var l=1/3,k=2/3;return[l*j+k*p,l*i+k*o,l*n+k*p,l*m+k*o,n,m]
},a5=function(bL,bK,bJ,bI,bH,bG,bF,bE,bD,bC){var bB=di*120/180,bA=di/180*(+bH||0),bz=[],by,bx=b5(function(g,f,j){var i=g*aq.cos(j)-f*aq.sin(j),h=g*aq.sin(j)+f*aq.cos(j);
return{x:i,y:h}});if(bC){bm=bC[0];bl=bC[1];bo=bC[2];bn=bC[3]}else{by=bx(bL,bK,-bA);
bL=by.x;bK=by.y;by=bx(bE,bD,-bA);bE=by.x;bD=by.y;var bw=aq.cos(di/180*bH),bv=aq.sin(di/180*bH),bu=(bL-bE)/2,bt=(bK-bD)/2,bs=bu*bu/(bJ*bJ)+bt*bt/(bI*bI);
if(bs>1){bs=aq.sqrt(bs);bJ=bs*bJ;bI=bs*bI}var br=bJ*bJ,bq=bI*bI,bp=(bG==bF?-1:1)*aq.sqrt(dm((br*bq-br*bt*bt-bq*bu*bu)/(br*bt*bt+bq*bu*bu))),bo=bp*bJ*bt/bI+(bL+bE)/2,bn=bp*-bI*bu/bJ+(bK+bD)/2,bm=aq.asin(((bK-bn)/bI).toFixed(9)),bl=aq.asin(((bD-bn)/bI).toFixed(9));
bm=bL<bo?di-bm:bm;bl=bE<bo?di-bl:bl;bm<0&&(bm=di*2+bm);bl<0&&(bl=di*2+bl);bF&&bm>bl&&(bm=bm-di*2);
!bF&&bl>bm&&(bl=bl-di*2)}var bk=bl-bm;if(dm(bk)>bB){var bj=bl,bi=bE,bh=bD;bl=bm+bB*(bF&&bl>bm?1:-1);
bE=bo+bJ*aq.cos(bl);bD=bn+bI*aq.sin(bl);bz=a5(bE,bD,bJ,bI,bH,0,bF,bi,bh,[bl,bj,bo,bn])
}bk=bl-bm;var bg=aq.cos(bm),bf=aq.sin(bm),be=aq.cos(bl),bd=aq.sin(bl),bc=aq.tan(bk/4),bb=4/3*bJ*bc,ba=4/3*bI*bc,D=[bL,bK],B=[bL+bb*bf,bK-ba*bg],y=[bE+bb*bd,bD-ba*be],w=[bE,bD];
B[0]=2*D[0]-B[0];B[1]=2*D[1]-B[1];if(bC){return[B,y,w][aN](bz)}bz=[B,y,w][aN](bz)[ax]()[aD](",");
var v=[];for(var s=0,n=bz[av];s<n;s++){v[s]=s%2?bx(bz[s-1],bz[s],bA).y:bx(bz[s],bz[s+1],bA).x
}return v},a3=function(u,t,s,q,p,o,n,m,l){var k=1-l;return{x:dk(k,3)*u+dk(k,2)*3*l*s+k*3*l*l*p+dk(l,3)*n,y:dk(k,3)*t+dk(k,2)*3*l*q+k*3*l*l*o+dk(l,3)*m}
},a1=b5(function(G,F,E,D,C,B,A,z){var y=C-2*E+G-(A-2*C+E),x=2*(E-G)-2*(C-E),w=G-E,v=(-x+aq.sqrt(x*x-4*y*w))/2/y,u=(-x-aq.sqrt(x*x-4*y*w))/2/y,t=[F,z],s=[G,A],m;
dm(v)>"1e12"&&(v=0.5);dm(u)>"1e12"&&(u=0.5);if(v>0&&v<1){m=a3(G,F,E,D,C,B,A,z,v);
s[c5](m.x);t[c5](m.y)}if(u>0&&u<1){m=a3(G,F,E,D,C,B,A,z,u);s[c5](m.x);t[c5](m.y)}y=B-2*D+F-(z-2*B+D);
x=2*(D-F)-2*(B-D);w=F-D;v=(-x+aq.sqrt(x*x-4*y*w))/2/y;u=(-x-aq.sqrt(x*x-4*y*w))/2/y;
dm(v)>"1e12"&&(v=0.5);dm(u)>"1e12"&&(u=0.5);if(v>0&&v<1){m=a3(G,F,E,D,C,B,A,z,v);
s[c5](m.x);t[c5](m.y)}if(u>0&&u<1){m=a3(G,F,E,D,C,B,A,z,u);s[c5](m.x);t[c5](m.y)}return{min:{x:dp[aO](0,s),y:dp[aO](0,t)},max:{x:ao[aO](0,s),y:ao[aO](0,t)}}
}),aZ=b5(function(E,D){var C=b1(E),B=D&&b1(D),A={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},z={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},y=function(f,e){var h,g;
if(!f){return["C",e.x,e.y,e.x,e.y,e.x,e.y]}!(f[0] in {T:1,Q:1})&&(e.qx=e.qy=null);
switch(f[0]){case"M":e.X=f[1];e.Y=f[2];break;case"A":f=["C"][aN](a5[aO](0,[e.x,e.y][aN](f.slice(1))));
break;case"S":h=e.x+(e.x-(e.bx||e.x));g=e.y+(e.y-(e.by||e.y));f=["C",h,g][aN](f.slice(1));
break;case"T":e.qx=e.x+(e.x-(e.qx||e.x));e.qy=e.y+(e.y-(e.qy||e.y));f=["C"][aN](a7(e.x,e.y,e.qx,e.qy,f[1],f[2]));
break;case"Q":e.qx=f[1];e.qy=f[2];f=["C"][aN](a7(e.x,e.y,f[1],f[2],f[3],f[4]));break;
case"L":f=["C"][aN](a9(e.x,e.y,f[1],f[2]));break;case"H":f=["C"][aN](a9(e.x,e.y,f[1],e.y));
break;case"V":f=["C"][aN](a9(e.x,e.y,e.x,f[1]));break;case"Z":f=["C"][aN](a9(e.x,e.y,e.X,e.Y));
break}return f},x=function(f,c){if(f[c][av]>7){f[c].shift();var g=f[c];while(g[av]){f.splice(c++,0,["C"][aN](g.splice(0,6)))
}f.splice(c,1);u=ao(C[av],B&&B[av]||0)}},w=function(h,c,k,j,i){if(h&&c&&h[i][0]=="M"&&c[i][0]!="M"){c.splice(i,0,["M",j.x,j.y]);
k.bx=0;k.by=0;k.x=h[i][1];k.y=h[i][2];u=ao(C[av],B&&B[av]||0)}};for(var v=0,u=ao(C[av],B&&B[av]||0);
v<u;v++){C[v]=y(C[v],A);x(C,v);B&&(B[v]=y(B[v],z));B&&x(B,v);w(C,B,A,z,v);w(B,C,z,A,v);
var t=C[v],s=B&&B[v],n=t[av],m=B&&s[av];A.x=t[n-2];A.y=t[n-1];A.bx=cP(t[n-4])||A.x;
A.by=cP(t[n-3])||A.y;z.bx=B&&(cP(s[m-4])||z.x);z.by=B&&(cP(s[m-3])||z.y);z.x=B&&s[m-2];
z.y=B&&s[m-1]}return B?[C,B]:C},null,b3),aX=b5(function(u){var t=[];for(var s=0,q=u[av];
s<q;s++){var p={},o=u[s].match(/^([^:]*):?([\d\.]*)/);p.color=a8.getRGB(o[1]);if(p.color.error){return null
}p.color=p.color.hex;o[2]&&(p.offset=o[2]+"%");t[c5](p)}for(s=1,q=t[av]-1;s<q;s++){if(!t[s].offset){var n=cP(t[s-1].offset||0),m=0;
for(var l=s+1;l<q;l++){if(t[l].offset){m=t[l].offset;break}}if(!m){m=100;l=q}m=cP(m);
var a=(m-n)/(l-s+1);for(;s<l;s++){n+=a;t[s].offset=n+"%"}}}return t}),aV=function(a,j,i,h){var g;
if(a8.is(a,de)||a8.is(a,"object")){g=a8.is(a,de)?aW.getElementById(a):a;if(g.tagName){return j==null?{container:g,width:g.style.pixelWidth||g.offsetWidth,height:g.style.pixelHeight||g.offsetHeight}:{container:g,width:j,height:i}
}}else{return{container:1,x:a,y:j,width:i,height:h}}},aT=function(f,e){var h=this;
for(var g in e){if(e[aY](g)&&!(g in f)){switch(typeof e[g]){case"function":(function(a){f[g]=f===h?a:function(){return a[aO](h,arguments)
}})(e[g]);break;case"object":f[g]=f[g]||{};aT.call(this,f[g],e[g]);break;default:f[g]=e[g];
break}}}},dH=function(e,c){e==c.top&&(c.top=e.prev);e==c.bottom&&(c.bottom=e.next);
e.next&&(e.next.prev=e.prev);e.prev&&(e.prev.next=e.next)},dG=function(e,c){if(c.top===e){return
}dH(e,c);e.next=null;e.prev=c.top;c.top.next=e;c.top=e},dF=function(e,c){if(c.bottom===e){return
}dH(e,c);e.next=c.bottom;e.prev=null;c.bottom.prev=e;c.bottom=e},dE=function(f,e,g){dH(f,g);
e==g.top&&(g.top=f);e.next&&(e.next.prev=f);f.next=e.next;f.prev=e;e.next=f},dD=function(f,e,g){dH(f,g);
e==g.bottom&&(g.bottom=f);e.prev&&(e.prev.next=f);f.prev=e.prev;e.prev=f;f.next=e
},dC=function(b){return function(){throw new Error("Raphaël: you are calling to method “"+b+"” of removed object")
}};a8.pathToRelative=b2;if(a8.svg){aQ.svgns="http://www.w3.org/2000/svg";aQ.xlink="http://www.w3.org/1999/xlink";
cU=function(b){return +b+(~(~b)===b)*0.5};var dB=function(f,e){if(e){for(var g in e){e[aY](g)&&f[cR](g,aF(e[g]))
}}else{f=aW.createElementNS(aQ.svgns,f);f.style.webkitTapHighlightColor="rgba(0,0,0,0)";
return f}};a8[da]=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version
};var dA=function(f,e){var h=dB("path");e.canvas&&e.canvas[aP](h);var g=new du(h,e);
g.type="path";dx(g,{fill:"none",stroke:"#000",path:f});return g},dz=function(E,D,C){var B="linear",A=0.5,z=0.5,y=E.style;
D=aF(D)[b9](cQ,function(f,e,i){B="radial";if(e&&i){A=cP(e);z=cP(i);var h=(z>0.5)*2-1;
dk(A-0.5,2)+dk(z-0.5,2)>0.25&&(z=aq.sqrt(0.25-dk(A-0.5,2))*h+0.5)&&z!=0.5&&(z=z.toFixed(5)-0.00001*h)
}return aJ});D=D[aD](/\s*\-\s*/);if(B=="linear"){var x=D.shift();x=-cP(x);if(isNaN(x)){return null
}var w=[0,0,aq.cos(x*di/180),aq.sin(x*di/180)],v=1/(ao(dm(w[2]),dm(w[3]))||1);w[2]*=v;
w[3]*=v;if(w[2]<0){w[0]=-w[2];w[2]=0}if(w[3]<0){w[1]=-w[3];w[3]=0}}var s=aX(D);if(!s){return null
}var p=E.getAttribute(c8);p=p.match(/^url\(#(.*)\)$/);p&&C.defs.removeChild(aW.getElementById(p[1]));
var l=dB(B+"Gradient");l.id=cI();dB(l,B=="radial"?{fx:A,fy:z}:{x1:w[0],y1:w[1],x2:w[2],y2:w[3]});
C.defs[aP](l);for(var g=0,G=s[av];g<G;g++){var F=dB("stop");dB(F,{offset:s[g].offset?s[g].offset:g?"100%":"0%","stop-color":s[g].color||"#fff"});
l[aP](F)}dB(E,{fill:"url(#"+l.id+")",opacity:1,"fill-opacity":1});y.fill=aJ;y.opacity=1;
y.fillOpacity=1;return 1},dy=function(a){var e=a.getBBox();dB(a.pattern,{patternTransform:a8.format("translate({0},{1})",e.x,e.y)})
},dx=function(W,V){var U={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},T=W.node,S=W.attrs,R=W.rotate(),Q=function(h,e){e=U[at.call(e)];
if(e){var n=h.attrs["stroke-width"]||"1",m=({round:n,square:n,butt:0})[h.attrs["stroke-linecap"]||V["stroke-linecap"]]||0,k=[],j=e[av];
while(j--){k[j]=e[j]*n+(j%2?1:-1)*m}dB(T,{"stroke-dasharray":k[ax](",")})}};V[aY]("rotation")&&(R=V.rotation);
var P=aF(R)[aD](a6);if(P.length-1){P[1]=+P[1];P[2]=+P[2]}else{P=null}cP(R)&&W.rotate(0,true);
for(var O in V){if(V[aY](O)){if(!cH[aY](O)){continue}var N=V[O];S[O]=N;switch(O){case"blur":W.blur(N);
break;case"rotation":W.rotate(N,true);break;case"href":case"title":case"target":var w=T.parentNode;
if(at.call(w.tagName)!="a"){var s=dB("a");w.insertBefore(s,T);s[aP](T);w=s}O=="target"&&N=="blank"?w.setAttributeNS(W.paper.xlink,"show","new"):w.setAttributeNS(W.paper.xlink,O,N);
break;case"cursor":T.style.cursor=N;break;case"clip-rect":var g=aF(N)[aD](a6);if(g[av]==4){W.clip&&W.clip.parentNode.parentNode.removeChild(W.clip.parentNode);
var b=dB("clipPath"),M=dB("rect");b.id=cI();dB(M,{x:g[0],y:g[1],width:g[2],height:g[3]});
b[aP](M);W.paper.defs[aP](b);dB(T,{"clip-path":"url(#"+b.id+")"});W.clip=M}if(!N){var L=aW.getElementById(T.getAttribute("clip-path")[b9](/(^url\(#|\)$)/g,aJ));
L&&L.parentNode.removeChild(L);dB(T,{"clip-path":aJ});delete W.clip}break;case"path":W.type=="path"&&dB(T,{d:N?S.path=b1(N):"M0,0"});
break;case"width":T[cR](O,N);if(S.fx){O="x";N=S.x}else{break}case"x":S.fx&&(N=-S.x-(S.width||0));
case"rx":if(O=="rx"&&W.type=="rect"){break}case"cx":P&&(O=="x"||O=="cx")&&(P[1]+=N-S[O]);
T[cR](O,N);W.pattern&&dy(W);break;case"height":T[cR](O,N);if(S.fy){O="y";N=S.y}else{break
}case"y":S.fy&&(N=-S.y-(S.height||0));case"ry":if(O=="ry"&&W.type=="rect"){break}case"cy":P&&(O=="y"||O=="cy")&&(P[2]+=N-S[O]);
T[cR](O,N);W.pattern&&dy(W);break;case"r":W.type=="rect"?dB(T,{rx:N,ry:N}):T[cR](O,N);
break;case"src":W.type=="image"&&T.setAttributeNS(W.paper.xlink,"href",N);break;case"stroke-width":T.style.strokeWidth=N;
T[cR](O,N);S["stroke-dasharray"]&&Q(W,S["stroke-dasharray"]);break;case"stroke-dasharray":Q(W,N);
break;case"translation":var I=aF(N)[aD](a6);I[0]=+I[0]||0;I[1]=+I[1]||0;if(P){P[1]+=I[0];
P[2]+=I[1]}aa.call(W,I[0],I[1]);break;case"scale":I=aF(N)[aD](a6);W.scale(+I[0]||1,+I[1]||+I[0]||1,isNaN(cP(I[2]))?null:+I[2],isNaN(cP(I[3]))?null:+I[3]);
break;case c8:var x=aF(N).match(c4);if(x){b=dB("pattern");var v=dB("image");b.id=cI();
dB(b,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});dB(v,{x:0,y:0});v.setAttributeNS(W.paper.xlink,"href",x[1]);
b[aP](v);var q=aW.createElement("img");q.style.cssText="position:absolute;left:-9999em;top-9999em";
q.onload=function(){dB(b,{width:this.offsetWidth,height:this.offsetHeight});dB(v,{width:this.offsetWidth,height:this.offsetHeight});
aW.body.removeChild(this);W.paper.safari()};aW.body[aP](q);q.src=x[1];W.paper.defs[aP](b);
T.style.fill="url(#"+b.id+")";dB(T,{fill:"url(#"+b.id+")"});W.pattern=b;W.pattern&&dy(W);
break}var p=a8.getRGB(N);if(p.error){if((({circle:1,ellipse:1})[aY](W.type)||aF(N).charAt()!="r")&&dz(T,N,W.paper)){S.gradient=N;
S.fill="none";break}else{delete V.gradient;delete S.gradient;!a8.is(S.opacity,"undefined")&&a8.is(V.opacity,"undefined")&&dB(T,{opacity:S.opacity});
!a8.is(S["fill-opacity"],"undefined")&&a8.is(V["fill-opacity"],"undefined")&&dB(T,{"fill-opacity":S["fill-opacity"]})
}}p[aY]("opacity")&&dB(T,{"fill-opacity":p.opacity>1?p.opacity/100:p.opacity});case"stroke":p=a8.getRGB(N);
T[cR](O,p.hex);O=="stroke"&&p[aY]("opacity")&&dB(T,{"stroke-opacity":p.opacity>1?p.opacity/100:p.opacity});
break;case"gradient":(({circle:1,ellipse:1})[aY](W.type)||aF(N).charAt()!="r")&&dz(T,N,W.paper);
break;case"opacity":S.gradient&&!S[aY]("stroke-opacity")&&dB(T,{"stroke-opacity":N>1?N/100:N});
case"fill-opacity":if(S.gradient){var l=aW.getElementById(T.getAttribute(c8)[b9](/^url\(#|\)$/g,aJ));
if(l){var f=l.getElementsByTagName("stop");f[f[av]-1][cR]("stop-opacity",N)}break
}default:O=="font-size"&&(N=cN(N,10)+"px");var a=O[b9](/(\-.)/g,function(c){return cJ.call(c.substring(1))
});T.style[a]=N;T[cR](O,N);break}}}dv(W,V);P?W.rotate(P.join(aH)):cP(R)&&W.rotate(R,true)
},dw=1.2,dv=function(w,v){if(w.type!="text"||!(v[aY]("text")||v[aY]("font")||v[aY]("font-size")||v[aY]("x")||v[aY]("y"))){return
}var u=w.attrs,t=w.node,s=t.firstChild?cN(aW.defaultView.getComputedStyle(t.firstChild,aJ).getPropertyValue("font-size"),10):10;
if(v[aY]("text")){u.text=v.text;while(t.firstChild){t.removeChild(t.firstChild)}var q=aF(v.text)[aD]("\n");
for(var p=0,l=q[av];p<l;p++){if(q[p]){var g=dB("tspan");p&&dB(g,{dy:s*dw,x:u.x});
g[aP](aW.createTextNode(q[p]));t[aP](g)}}}else{q=t.getElementsByTagName("tspan");
for(p=0,l=q[av];p<l;p++){p&&dB(q[p],{dy:s*dw,x:u.x})}}dB(t,{y:u.y});var f=w.getBBox(),a=u.y-(f.y+f.height/2);
a&&a8.is(a,"finite")&&dB(t,{y:u.y+a})},du=function(a,h){var g=0,f=0;this[0]=a;this.id=a8._oid++;
this.node=a;a.raphael=this;this.paper=h;this.attrs=this.attrs||{};this.transformations=[];
this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!h.bottom&&(h.bottom=this);this.prev=h.top;
h.top&&(h.top.next=this);h.top=this;this.next=null},dt=du[a0];du[a0].rotate=function(h,g,b){if(this.removed){return this
}if(h==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][ax](aH)
}return this._.rt.deg}var a=this.getBBox();h=aF(h)[aD](a6);if(h[av]-1){g=cP(h[1]);
b=cP(h[2])}h=cP(h[0]);g!=null&&g!==false?this._.rt.deg=h:this._.rt.deg+=h;b==null&&(g=null);
this._.rt.cx=g;this._.rt.cy=b;g=g==null?a.x+a.width/2:g;b=b==null?a.y+a.height/2:b;
if(this._.rt.deg){this.transformations[0]=a8.format("rotate({0} {1} {2})",this._.rt.deg,g,b);
this.clip&&dB(this.clip,{transform:a8.format("rotate({0} {1} {2})",-this._.rt.deg,g,b)})
}else{this.transformations[0]=aJ;this.clip&&dB(this.clip,{transform:aJ})}dB(this.node,{transform:this.transformations[ax](aH)});
return this};du[a0].hide=function(){!this.removed&&(this.node.style.display="none");
return this};du[a0].show=function(){!this.removed&&(this.node.style.display="");return this
};du[a0].remove=function(){if(this.removed){return}dH(this,this.paper);this.node.parentNode.removeChild(this.node);
for(var b in this){delete this[b]}this.removed=true};du[a0].getBBox=function(){if(this.removed){return this
}if(this.type=="path"){return b4(this.attrs.path)}if(this.node.style.display=="none"){this.show();
var g=true}var f={};try{f=this.node.getBBox()}catch(g){}finally{f=f||{}}if(this.type=="text"){f={x:f.x,y:Infinity,width:0,height:0};
for(var j=0,i=this.node.getNumberOfChars();j<i;j++){var h=this.node.getExtentOfChar(j);
h.y<f.y&&(f.y=h.y);h.y+h.height-f.y>f.height&&(f.height=h.y+h.height-f.y);h.x+h.width-f.x>f.width&&(f.width=h.x+h.width-f.x)
}}g&&this.hide();return f};du[a0].attr=function(w,v){if(this.removed){return this
}if(w==null){var u={};for(var t in this.attrs){this.attrs[aY](t)&&(u[t]=this.attrs[t])
}this._.rt.deg&&(u.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(u.scale=this.scale());
u.gradient&&u.fill=="none"&&(u.fill=u.gradient)&&delete u.gradient;return u}if(v==null&&a8.is(w,de)){if(w=="translation"){return aa.call(this)
}if(w=="rotation"){return this.rotate()}if(w=="scale"){return this.scale()}if(w==c8&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[w]}if(v==null&&a8.is(w,dc)){var s={};for(var q=0,p=w.length;q<p;
q++){s[w[q]]=this.attr(w[q])}return s}if(v!=null){var o={};o[w]=v}else{w!=null&&a8.is(w,"object")&&(o=w)
}for(var n in this.paper.customAttributes){if(this.paper.customAttributes[aY](n)&&o[aY](n)&&a8.is(this.paper.customAttributes[n],"function")){var f=this.paper.customAttributes[n].apply(this,[][aN](o[n]));
this.attrs[n]=o[n];for(var a in f){f[aY](a)&&(o[a]=f[a])}}}dx(this,o);return this
};du[a0].toFront=function(){if(this.removed){return this}this.node.parentNode[aP](this.node);
var b=this.paper;b.top!=this&&dG(this,b);return this};du[a0].toBack=function(){if(this.removed){return this
}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);
dF(this,this.paper);var b=this.paper}return this};du[a0].insertAfter=function(e){if(this.removed){return this
}var c=e.node||e[e.length-1].node;c.nextSibling?c.parentNode.insertBefore(this.node,c.nextSibling):c.parentNode[aP](this.node);
dE(this,e,this.paper);return this};du[a0].insertBefore=function(e){if(this.removed){return this
}var c=e.node||e[0].node;c.parentNode.insertBefore(this.node,c);dD(this,e,this.paper);
return this};du[a0].blur=function(f){var e=this;if(+f!==0){var h=dB("filter"),g=dB("feGaussianBlur");
e.attrs.blur=f;h.id=cI();dB(g,{stdDeviation:+f||1.5});h.appendChild(g);e.paper.defs.appendChild(h);
e._blur=h;dB(e.node,{filter:"url(#"+h.id+")"})}else{if(e._blur){e._blur.parentNode.removeChild(e._blur);
delete e._blur;delete e.attrs.blur}e.node.removeAttribute("filter")}};var ds=function(h,g,l,k){var j=dB("circle");
h.canvas&&h.canvas[aP](j);var i=new du(j,h);i.attrs={cx:g,cy:l,r:k,fill:"none",stroke:"#000"};
i.type="circle";dB(j,i.attrs);return i},dr=function(j,i,p,o,n,m){var l=dB("rect");
j.canvas&&j.canvas[aP](l);var k=new du(l,j);k.attrs={x:i,y:p,width:o,height:n,r:m||0,rx:m||0,ry:m||0,fill:"none",stroke:"#000"};
k.type="rect";dB(l,k.attrs);return k},dq=function(i,h,n,m,l){var k=dB("ellipse");
i.canvas&&i.canvas[aP](k);var j=new du(k,i);j.attrs={cx:h,cy:n,rx:m,ry:l,fill:"none",stroke:"#000"};
j.type="ellipse";dB(k,j.attrs);return j},dn=function(j,i,p,o,n,m){var l=dB("image");
dB(l,{x:p,y:o,width:n,height:m,preserveAspectRatio:"none"});l.setAttributeNS(j.xlink,"href",i);
j.canvas&&j.canvas[aP](l);var k=new du(l,j);k.attrs={x:p,y:o,width:n,height:m,src:i};
k.type="image";return k},dl=function(h,g,l,k){var j=dB("text");dB(j,{x:g,y:l,"text-anchor":"middle"});
h.canvas&&h.canvas[aP](j);var i=new du(j,h);i.attrs={x:g,y:l,"text-anchor":"middle",text:k,font:cH.font,stroke:"none",fill:"#000"};
i.type="text";dx(i,i.attrs);return i},dj=function(e,c){this.width=e||this.width;this.height=c||this.height;
this.canvas[cR]("width",this.width);this.canvas[cR]("height",this.height);return this
},dh=function(){var a=aV[aO](0,arguments),n=a&&a.container,m=a.x,l=a.y,k=a.width,j=a.height;
if(!n){throw new Error("SVG container not found.")}var g=dB("svg");m=m||0;l=l||0;
k=k||512;j=j||342;dB(g,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:k,height:j});
if(n==1){g.style.cssText="position:absolute;left:"+m+"px;top:"+l+"px";aW.body[aP](g)
}else{n.firstChild?n.insertBefore(g,n.firstChild):n[aP](g)}n=new aR;n.width=k;n.height=j;
n.canvas=g;aT.call(n,n,a8.fn);n.clear();return n};aQ.clear=function(){var b=this.canvas;
while(b.firstChild){b.removeChild(b.firstChild)}this.bottom=this.top=null;(this.desc=dB("desc"))[aP](aW.createTextNode("Created with Raphaël"));
b[aP](this.desc);b[aP](this.defs=dB("defs"))};aQ.remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);
for(var b in this){this[b]=dC(b)}}}if(a8.vml){var df={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},dd=/([clmz]),?([^clmz]*)/gi,db=/ progid:\S+Blur\([^\)]+\)/g,c9=/-?[^,\s-]+/g,dJ=1000+aH+1000,c3=10,aM={path:1,rect:1},aK=function(w){var v=/[ahqstv]/ig,u=b1;
aF(w).match(v)&&(u=aZ);v=/[clmz]/g;if(u==b1&&!aF(w).match(v)){var t=aF(w)[b9](dd,function(h,g,x){var k=[],j=at.call(g)=="m",i=df[g];
x[b9](c9,function(b){if(j&&k[av]==2){i+=k+df[g=="m"?"l":"L"];k=[]}k[c5](cU(b*c3))
});return i+k});return t}var s=u(w),q,p;t=[];for(var o=0,n=s[av];o<n;o++){q=s[o];
p=at.call(s[o][0]);p=="z"&&(p="x");for(var m=1,l=q[av];m<l;m++){p+=cU(q[m]*c3)+(m!=l-1?",":aJ)
}t[c5](p)}return t[ax](aH)};a8[da]=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version
};dA=function(i,h){var n=aG("group");n.style.cssText="position:absolute;left:0;top:0;width:"+h.width+"px;height:"+h.height+"px";
n.coordsize=h.coordsize;n.coordorigin=h.coordorigin;var m=aG("shape"),l=m.style;l.width=h.width+"px";
l.height=h.height+"px";m.coordsize=dJ;m.coordorigin=h.coordorigin;n[aP](m);var k=new du(m,n,h),j={fill:"none",stroke:"#000"};
i&&(j.path=i);k.type="path";k.path=[];k.Path=aJ;dx(k,j);h.canvas[aP](n);return k};
dx=function(S,R){S.attrs=S.attrs||{};var Q=S.node,P=S.attrs,O=Q.style,N,M=(R.x!=P.x||R.y!=P.y||R.width!=P.width||R.height!=P.height||R.r!=P.r)&&S.type=="rect",L=S;
for(var K in R){R[aY](K)&&(P[K]=R[K])}if(M){P.path=aI(P.x,P.y,P.width,P.height,P.r);
S.X=P.x;S.Y=P.y;S.W=P.width;S.H=P.height}R.href&&(Q.href=R.href);R.title&&(Q.title=R.title);
R.target&&(Q.target=R.target);R.cursor&&(O.cursor=R.cursor);"blur" in R&&S.blur(R.blur);
if(R.path&&S.type=="path"||M){Q.path=aK(P.path)}R.rotation!=null&&S.rotate(R.rotation,true);
if(R.translation){N=aF(R.translation)[aD](a6);aa.call(S,N[0],N[1]);if(S._.rt.cx!=null){S._.rt.cx+=+N[0];
S._.rt.cy+=+N[1];S.setBox(S.attrs,N[0],N[1])}}if(R.scale){N=aF(R.scale)[aD](a6);S.scale(+N[0]||1,+N[1]||+N[0]||1,+N[2]||null,+N[3]||null)
}if("clip-rect" in R){var J=aF(R["clip-rect"])[aD](a6);if(J[av]==4){J[2]=+J[2]+ +J[0];
J[3]=+J[3]+ +J[1];var I=Q.clipRect||aW.createElement("div"),w=I.style,p=Q.parentNode;
w.clip=a8.format("rect({1}px {2}px {3}px {0}px)",J);if(!Q.clipRect){w.position="absolute";
w.top=0;w.left=0;w.width=S.paper.width+"px";w.height=S.paper.height+"px";p.parentNode.insertBefore(I,p);
I[aP](p);Q.clipRect=I}}R["clip-rect"]||Q.clipRect&&(Q.clipRect.style.clip=aJ)}S.type=="image"&&R.src&&(Q.src=R.src);
if(S.type=="image"&&R.opacity){Q.filterOpacity=cL+".Alpha(opacity="+R.opacity*100+")";
O.filter=(Q.filterMatrix||aJ)+(Q.filterOpacity||aJ)}R.font&&(O.font=R.font);R["font-family"]&&(O.fontFamily='"'+R["font-family"][aD](",")[0][b9](/^['"]+|['"]+$/g,aJ)+'"');
R["font-size"]&&(O.fontSize=R["font-size"]);R["font-weight"]&&(O.fontWeight=R["font-weight"]);
R["font-style"]&&(O.fontStyle=R["font-style"]);if(R.opacity!=null||R["stroke-width"]!=null||R.fill!=null||R.stroke!=null||R["stroke-width"]!=null||R["stroke-opacity"]!=null||R["fill-opacity"]!=null||R["stroke-dasharray"]!=null||R["stroke-miterlimit"]!=null||R["stroke-linejoin"]!=null||R["stroke-linecap"]!=null){Q=S.shape||Q;
var g=Q.getElementsByTagName(c8)&&Q.getElementsByTagName(c8)[0],b=false;!g&&(b=g=aG(c8));
if("fill-opacity" in R||"opacity" in R){var a=((+P["fill-opacity"]+1||2)-1)*((+P.opacity+1||2)-1)*((+a8.getRGB(R.fill).o+1||2)-1);
a=dp(ao(a,0),1);g.opacity=a}R.fill&&(g.on=true);if(g.on==null||R.fill=="none"){g.on=false
}if(g.on&&R.fill){var H=R.fill.match(c4);if(H){g.src=H[1];g.type="tile"}else{g.color=a8.getRGB(R.fill).hex;
g.src=aJ;g.type="solid";if(a8.getRGB(R.fill).error&&(L.type in {circle:1,ellipse:1}||aF(R.fill).charAt()!="r")&&dz(L,R.fill)){P.fill="none";
P.gradient=R.fill}}}b&&Q[aP](g);var A=Q.getElementsByTagName("stroke")&&Q.getElementsByTagName("stroke")[0],z=false;
!A&&(z=A=aG("stroke"));if(R.stroke&&R.stroke!="none"||R["stroke-width"]||R["stroke-opacity"]!=null||R["stroke-dasharray"]||R["stroke-miterlimit"]||R["stroke-linejoin"]||R["stroke-linecap"]){A.on=true
}(R.stroke=="none"||A.on==null||R.stroke==0||R["stroke-width"]==0)&&(A.on=false);
var s=a8.getRGB(R.stroke);A.on&&R.stroke&&(A.color=s.hex);a=((+P["stroke-opacity"]+1||2)-1)*((+P.opacity+1||2)-1)*((+s.o+1||2)-1);
var l=(cP(R["stroke-width"])||1)*0.75;a=dp(ao(a,0),1);R["stroke-width"]==null&&(l=P["stroke-width"]);
R["stroke-width"]&&(A.weight=l);l&&l<1&&(a*=l)&&(A.weight=1);A.opacity=a;R["stroke-linejoin"]&&(A.joinstyle=R["stroke-linejoin"]||"miter");
A.miterlimit=R["stroke-miterlimit"]||8;R["stroke-linecap"]&&(A.endcap=R["stroke-linecap"]=="butt"?"flat":R["stroke-linecap"]=="square"?"square":"round");
if(R["stroke-dasharray"]){var f={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};
A.dashstyle=f[aY](R["stroke-dasharray"])?f[R["stroke-dasharray"]]:aJ}z&&Q[aP](A)}if(L.type=="text"){O=L.paper.span.style;
P.font&&(O.font=P.font);P["font-family"]&&(O.fontFamily=P["font-family"]);P["font-size"]&&(O.fontSize=P["font-size"]);
P["font-weight"]&&(O.fontWeight=P["font-weight"]);P["font-style"]&&(O.fontStyle=P["font-style"]);
L.node.string&&(L.paper.span.innerHTML=aF(L.node.string)[b9](/</g,"&#60;")[b9](/&/g,"&#38;")[b9](/\n/g,"<br>"));
L.W=P.w=L.paper.span.offsetWidth;L.H=P.h=L.paper.span.offsetHeight;L.X=P.x;L.Y=P.y+cU(L.H/2);
switch(P["text-anchor"]){case"start":L.node.style["v-text-align"]="left";L.bbx=cU(L.W/2);
break;case"end":L.node.style["v-text-align"]="right";L.bbx=-cU(L.W/2);break;default:L.node.style["v-text-align"]="center";
break}}};dz=function(w,v){w.attrs=w.attrs||{};var u=w.attrs,t,s="linear",q=".5 .5";
w.attrs.gradient=v;v=aF(v)[b9](cQ,function(f,e,g){s="radial";if(e&&g){e=cP(e);g=cP(g);
dk(e-0.5,2)+dk(g-0.5,2)>0.25&&(g=aq.sqrt(0.25-dk(e-0.5,2))*((g>0.5)*2-1)+0.5);q=e+aH+g
}return aJ});v=v[aD](/\s*\-\s*/);if(s=="linear"){var p=v.shift();p=-cP(p);if(isNaN(p)){return null
}}var o=aX(v);if(!o){return null}w=w.shape||w.node;t=w.getElementsByTagName(c8)[0]||aG(c8);
!t.parentNode&&w.appendChild(t);if(o[av]){t.on=true;t.method="none";t.color=o[0].color;
t.color2=o[o[av]-1].color;var n=[];for(var m=0,l=o[av];m<l;m++){o[m].offset&&n[c5](o[m].offset+aH+o[m].color)
}t.colors&&(t.colors.value=n[av]?n[ax]():"0% "+t.color);if(s=="radial"){t.type="gradientradial";
t.focus="100%";t.focussize=q;t.focusposition=q}else{t.type="gradient";t.angle=(270-p)%360
}}return 1};du=function(a,n,m){var l=0,k=0,j=0,i=1;this[0]=a;this.id=a8._oid++;this.node=a;
a.raphael=this;this.X=0;this.Y=0;this.attrs={};this.Group=n;this.paper=m;this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};
!m.bottom&&(m.bottom=this);this.prev=m.top;m.top&&(m.top.next=this);m.top=this;this.next=null
};dt=du[a0];dt.rotate=function(b,f,e){if(this.removed){return this}if(b==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][ax](aH)
}return this._.rt.deg}b=aF(b)[aD](a6);if(b[av]-1){f=cP(b[1]);e=cP(b[2])}b=cP(b[0]);
f!=null?this._.rt.deg=b:this._.rt.deg+=b;e==null&&(f=null);this._.rt.cx=f;this._.rt.cy=e;
this.setBox(this.attrs,f,e);this.Group.style.rotation=this._.rt.deg;return this};
dt.setBox=function(E,D,C){if(this.removed){return this}var B=this.Group.style,A=this.shape&&this.shape.style||this.node.style;
E=E||{};for(var z in E){E[aY](z)&&(this.attrs[z]=E[z])}D=D||this._.rt.cx;C=C||this._.rt.cy;
var y=this.attrs,x,w,v,u;switch(this.type){case"circle":x=y.cx-y.r;w=y.cy-y.r;v=u=y.r*2;
break;case"ellipse":x=y.cx-y.rx;w=y.cy-y.ry;v=y.rx*2;u=y.ry*2;break;case"image":x=+y.x;
w=+y.y;v=y.width||0;u=y.height||0;break;case"text":this.textpath.v=["m",cU(y.x),", ",cU(y.y-2),"l",cU(y.x)+1,", ",cU(y.y-2)][ax](aJ);
x=y.x-cU(this.W/2);w=y.y-this.H/2;v=this.W;u=this.H;break;case"rect":case"path":if(this.attrs.path){var t=b4(this.attrs.path);
x=t.x;w=t.y;v=t.width;u=t.height}else{x=0;w=0;v=this.paper.width;u=this.paper.height
}break;default:x=0;w=0;v=this.paper.width;u=this.paper.height;break}D=D==null?x+v/2:D;
C=C==null?w+u/2:C;var s=D-this.paper.width/2,p=C-this.paper.height/2,f;B.left!=(f=s+"px")&&(B.left=f);
B.top!=(f=p+"px")&&(B.top=f);this.X=aM[aY](this.type)?-s:x;this.Y=aM[aY](this.type)?-p:w;
this.W=v;this.H=u;if(aM[aY](this.type)){A.left!=(f=-s*c3+"px")&&(A.left=f);A.top!=(f=-p*c3+"px")&&(A.top=f)
}else{if(this.type=="text"){A.left!=(f=-s+"px")&&(A.left=f);A.top!=(f=-p+"px")&&(A.top=f)
}else{B.width!=(f=this.paper.width+"px")&&(B.width=f);B.height!=(f=this.paper.height+"px")&&(B.height=f);
A.left!=(f=x-s+"px")&&(A.left=f);A.top!=(f=w-p+"px")&&(A.top=f);A.width!=(f=v+"px")&&(A.width=f);
A.height!=(f=u+"px")&&(A.height=f)}}};dt.hide=function(){!this.removed&&(this.Group.style.display="none");
return this};dt.show=function(){!this.removed&&(this.Group.style.display="block");
return this};dt.getBBox=function(){if(this.removed){return this}if(aM[aY](this.type)){return b4(this.attrs.path)
}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H}};dt.remove=function(){if(this.removed){return
}dH(this,this.paper);this.node.parentNode.removeChild(this.node);this.Group.parentNode.removeChild(this.Group);
this.shape&&this.shape.parentNode.removeChild(this.shape);for(var b in this){delete this[b]
}this.removed=true};dt.attr=function(u,t){if(this.removed){return this}if(u==null){var s={};
for(var q in this.attrs){this.attrs[aY](q)&&(s[q]=this.attrs[q])}this._.rt.deg&&(s.rotation=this.rotate());
(this._.sx!=1||this._.sy!=1)&&(s.scale=this.scale());s.gradient&&s.fill=="none"&&(s.fill=s.gradient)&&delete s.gradient;
return s}if(t==null&&a8.is(u,"string")){if(u=="translation"){return aa.call(this)
}if(u=="rotation"){return this.rotate()}if(u=="scale"){return this.scale()}if(u==c8&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[u]}if(this.attrs&&t==null&&a8.is(u,dc)){var p,o={};for(q=0,p=u[av];
q<p;q++){o[u[q]]=this.attr(u[q])}return o}var n;if(t!=null){n={};n[u]=t}t==null&&a8.is(u,"object")&&(n=u);
if(n){for(var m in this.paper.customAttributes){if(this.paper.customAttributes[aY](m)&&n[aY](m)&&a8.is(this.paper.customAttributes[m],"function")){var f=this.paper.customAttributes[m].apply(this,[][aN](n[m]));
this.attrs[m]=n[m];for(var a in f){f[aY](a)&&(n[a]=f[a])}}}n.text&&this.type=="text"&&(this.node.string=n.text);
dx(this,n);n.gradient&&(({circle:1,ellipse:1})[aY](this.type)||aF(n.gradient).charAt()!="r")&&dz(this,n.gradient);
(!aM[aY](this.type)||this._.rt.deg)&&this.setBox(this.attrs)}return this};dt.toFront=function(){!this.removed&&this.Group.parentNode[aP](this.Group);
this.paper.top!=this&&dG(this,this.paper);return this};dt.toBack=function(){if(this.removed){return this
}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);
dF(this,this.paper)}return this};dt.insertAfter=function(b){if(this.removed){return this
}b.constructor==cV&&(b=b[b.length-1]);b.Group.nextSibling?b.Group.parentNode.insertBefore(this.Group,b.Group.nextSibling):b.Group.parentNode[aP](this.Group);
dE(this,b,this.paper);return this};dt.insertBefore=function(b){if(this.removed){return this
}b.constructor==cV&&(b=b[0]);b.Group.parentNode.insertBefore(this.Group,b.Group);
dD(this,b,this.paper);return this};dt.blur=function(a){var f=this.node.runtimeStyle,e=f.filter;
e=e.replace(db,aJ);if(+a!==0){this.attrs.blur=a;f.filter=e+aH+cL+".Blur(pixelradius="+(+a||1.5)+")";
f.margin=a8.format("-{0}px 0 0 -{0}px",cU(+a||1.5))}else{f.filter=e;f.margin=0;delete this.attrs.blur
}};ds=function(j,i,p,o){var n=aG("group"),m=aG("oval"),l=m.style;n.style.cssText="position:absolute;left:0;top:0;width:"+j.width+"px;height:"+j.height+"px";
n.coordsize=dJ;n.coordorigin=j.coordorigin;n[aP](m);var k=new du(m,n,j);k.type="circle";
dx(k,{stroke:"#000",fill:"none"});k.attrs.cx=i;k.attrs.cy=p;k.attrs.r=o;k.setBox({x:i-o,y:p-o,width:o*2,height:o*2});
j.canvas[aP](n);return k};function aI(a,j,i,h,g){return g?a8.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z",a+g,j,i-g*2,g,-g,h-g*2,g*2-i,g*2-h):a8.format("M{0},{1}l{2},0,0,{3},{4},0z",a,j,i,h,-i)
}dr=function(s,q,p,o,n,m){var l=aI(q,p,o,n,m),k=s.path(l),j=k.attrs;k.X=j.x=q;k.Y=j.y=p;
k.W=j.width=o;k.H=j.height=n;j.r=m;j.path=l;k.type="rect";return k};dq=function(s,q,p,o,n){var m=aG("group"),l=aG("oval"),k=l.style;
m.style.cssText="position:absolute;left:0;top:0;width:"+s.width+"px;height:"+s.height+"px";
m.coordsize=dJ;m.coordorigin=s.coordorigin;m[aP](l);var j=new du(l,m,s);j.type="ellipse";
dx(j,{stroke:"#000"});j.attrs.cx=q;j.attrs.cy=p;j.attrs.rx=o;j.attrs.ry=n;j.setBox({x:q-o,y:p-n,width:o*2,height:n*2});
s.canvas[aP](m);return j};dn=function(s,q,p,o,n,m){var l=aG("group"),k=aG("image");
l.style.cssText="position:absolute;left:0;top:0;width:"+s.width+"px;height:"+s.height+"px";
l.coordsize=dJ;l.coordorigin=s.coordorigin;k.src=q;l[aP](k);var j=new du(k,l,s);j.type="image";
j.attrs.src=q;j.attrs.x=p;j.attrs.y=o;j.attrs.w=n;j.attrs.h=m;j.setBox({x:p,y:o,width:n,height:m});
s.canvas[aP](l);return j};dl=function(w,v,u,t){var s=aG("group"),q=aG("shape"),p=q.style,o=aG("path"),n=o.style,l=aG("textpath");
s.style.cssText="position:absolute;left:0;top:0;width:"+w.width+"px;height:"+w.height+"px";
s.coordsize=dJ;s.coordorigin=w.coordorigin;o.v=a8.format("m{0},{1}l{2},{1}",cU(v*10),cU(u*10),cU(v*10)+1);
o.textpathok=true;p.width=w.width;p.height=w.height;l.string=aF(t);l.on=true;q[aP](l);
q[aP](o);s[aP](q);var a=new du(l,s,w);a.shape=q;a.textpath=o;a.type="text";a.attrs.text=t;
a.attrs.x=v;a.attrs.y=u;a.attrs.w=1;a.attrs.h=1;dx(a,{font:cH.font,stroke:"none",fill:"#000"});
a.setBox();w.canvas[aP](s);return a};dj=function(f,e){var g=this.canvas.style;f==+f&&(f+="px");
e==+e&&(e+="px");g.width=f;g.height=e;g.clip="rect(0 "+f+" "+e+" 0)";return this};
var aG;aW.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!aW.namespaces.rvml&&aW.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
aG=function(b){return aW.createElement("<rvml:"+b+' class="rvml">')}}catch(a8){aG=function(b){return aW.createElement("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
}}dh=function(){var u=aV[aO](0,arguments),t=u.container,s=u.height,q,p=u.width,m=u.x,l=u.y;
if(!t){throw new Error("VML container not found.")}var j=new aR,g=j.canvas=aW.createElement("div"),a=g.style;
m=m||0;l=l||0;p=p||512;s=s||342;p==+p&&(p+="px");s==+s&&(s+="px");j.width=1000;j.height=1000;
j.coordsize=c3*1000+aH+c3*1000;j.coordorigin="0 0";j.span=aW.createElement("span");
j.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
g[aP](j.span);a.cssText=a8.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",p,s);
if(t==1){aW.body[aP](g);a.left=m+"px";a.top=l+"px";a.position="absolute"}else{t.firstChild?t.insertBefore(g,t.firstChild):t[aP](g)
}aT.call(j,j,a8.fn);return j};aQ.clear=function(){this.canvas.innerHTML=aJ;this.span=aW.createElement("span");
this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
this.canvas[aP](this.span);this.bottom=this.top=null};aQ.remove=function(){this.canvas.parentNode.removeChild(this.canvas);
for(var b in this){this[b]=dC(b)}return true}}var aE=navigator.userAgent.match(/Version\\x2f(.*?)\s/);
navigator.vendor=="Apple Computer, Inc."&&(aE&&aE[1]<4||navigator.platform.slice(0,2)=="iP")?aQ.safari=function(){var b=this.rect(-99,-99,this.width+99,this.height+99).attr({stroke:"none"});
aU.setTimeout(function(){b.remove()})}:aQ.safari=function(){};var aC=function(){this.returnValue=false
},aA=function(){return this.originalEvent.preventDefault()},ay=function(){this.cancelBubble=true
},aw=function(){return this.originalEvent.stopPropagation()},au=(function(){if(aW.addEventListener){return function(h,f,l,k){var j=aL&&az[f]?az[f]:f,i=function(m){if(aL&&az[aY](f)){for(var c=0,b=m.targetTouches&&m.targetTouches.length;
c<b;c++){if(m.targetTouches[c].target==h){var a=m;m=m.targetTouches[c];m.originalEvent=a;
m.preventDefault=aA;m.stopPropagation=aw;break}}}return l.call(k,m)};h.addEventListener(j,i,false);
return function(){h.removeEventListener(j,i,false);return true}}}if(aW.attachEvent){return function(h,g,l,k){var j=function(b){b=b||aU.event;
b.preventDefault=b.preventDefault||aC;b.stopPropagation=b.stopPropagation||ay;return l.call(k,b)
};h.attachEvent("on"+g,j);var i=function(){h.detachEvent("on"+g,j);return true};return i
}}})(),ar=[],ap=function(s){var q=s.clientX,p=s.clientY,o=aW.documentElement.scrollTop||aW.body.scrollTop,n=aW.documentElement.scrollLeft||aW.body.scrollLeft,m,l=ar.length;
while(l--){m=ar[l];if(aL){var k=s.touches.length,g;while(k--){g=s.touches[k];if(g.identifier==m.el._drag.id){q=g.clientX;
p=g.clientY;(s.originalEvent?s.originalEvent:s).preventDefault();break}}}else{s.preventDefault()
}q+=n;p+=o;m.move&&m.move.call(m.move_scope||m.el,q-m.el._drag.x,p-m.el._drag.y,q,p,s)
}},an=function(a){a8.unmousemove(ap).unmouseup(an);var f=ar.length,e;while(f--){e=ar[f];
e.el._drag={};e.end&&e.end.call(e.end_scope||e.start_scope||e.move_scope||e.el,a)
}ar=[]};for(var am=aB[av];am--;){(function(a){a8[a]=du[a0][a]=function(e,b){if(a8.is(e,"function")){this.events=this.events||[];
this.events.push({name:a,f:e,unbind:au(this.shape||this.node||aW,a,e,b||this)})}return this
};a8["un"+a]=du[a0]["un"+a]=function(b){var f=this.events,e=f[av];while(e--){if(f[e].name==a&&f[e].f==b){f[e].unbind();
f.splice(e,1);!f.length&&delete this.events;return this}}return this}})(aB[am])}dt.hover=function(f,e,h,g){return this.mouseover(f,h).mouseout(e,g||h)
};dt.unhover=function(e,c){return this.unmouseover(e).unmouseout(c)};dt.drag=function(a,l,k,j,i,g){this._drag={};
this.mousedown(function(e){(e.originalEvent||e).preventDefault();var c=aW.documentElement.scrollTop||aW.body.scrollTop,b=aW.documentElement.scrollLeft||aW.body.scrollLeft;
this._drag.x=e.clientX+b;this._drag.y=e.clientY+c;this._drag.id=e.identifier;l&&l.call(i||j||this,e.clientX+b,e.clientY+c,e);
!ar.length&&a8.mousemove(ap).mouseup(an);ar.push({el:this,move:a,end:k,move_scope:j,start_scope:i,end_scope:g})
});return this};dt.undrag=function(a,h,g){var f=ar.length;while(f--){ar[f].el==this&&(ar[f].move==a&&ar[f].end==g)&&ar.splice(f++,1)
}!ar.length&&a8.unmousemove(ap).unmouseup(an)};aQ.circle=function(f,e,g){return ds(this,f||0,e||0,g||0)
};aQ.rect=function(g,f,j,i,h){return dr(this,g||0,f||0,j||0,i||0,h||0)};aQ.ellipse=function(f,e,h,g){return dq(this,f||0,e||0,h||0,g||0)
};aQ.path=function(a){a&&!a8.is(a,de)&&!a8.is(a[0],dc)&&(a+=aJ);return dA(a8.format[aO](a8,arguments),this)
};aQ.image=function(g,f,j,i,h){return dn(this,g||"about:blank",f||0,j||0,i||0,h||0)
};aQ.text=function(f,e,g){return dl(this,f||0,e||0,aF(g))};aQ.set=function(b){arguments[av]>1&&(b=Array[a0].splice.call(arguments,0,arguments[av]));
return new cV(b)};aQ.setSize=dj;aQ.top=aQ.bottom=null;aQ.raphael=a8;function al(){return this.x+aH+this.y
}dt.resetScale=function(){if(this.removed){return this}this._.sx=1;this._.sy=1;this.attrs.scale="1 1"
};dt.scale=function(bv,bu,bt,bs){if(this.removed){return this}if(bv==null&&bu==null){return{x:this._.sx,y:this._.sy,toString:al}
}bu=bu||bv;!(+bu)&&(bu=bv);var br,bq,bp,bo,bn=this.attrs;if(bv!=0){var bm=this.getBBox(),bl=bm.x+bm.width/2,bk=bm.y+bm.height/2,bj=dm(bv/this._.sx),bi=dm(bu/this._.sy);
bt=+bt||bt==0?bt:bl;bs=+bs||bs==0?bs:bk;var bh=this._.sx>0,bg=this._.sy>0,bf=~(~(bv/dm(bv))),be=~(~(bu/dm(bu))),bd=bj*bf,bc=bi*be,bb=this.node.style,ba=bt+dm(bl-bt)*bd*(bl>bt==bh?1:-1),Z=bs+dm(bk-bs)*bc*(bk>bs==bg?1:-1),Y=bv*bf>bu*be?bi:bj;
switch(this.type){case"rect":case"image":var X=bn.width*bj,W=bn.height*bi;this.attr({height:W,r:bn.r*Y,width:X,x:ba-X/2,y:Z-W/2});
break;case"circle":case"ellipse":this.attr({rx:bn.rx*bj,ry:bn.ry*bi,r:bn.r*Y,cx:ba,cy:Z});
break;case"text":this.attr({x:ba,y:Z});break;case"path":var V=b2(bn.path),U=true,T=bh?bd:bj,S=bg?bc:bi;
for(var R=0,B=V[av];R<B;R++){var w=V[R],v=cJ.call(w[0]);if(v=="M"&&U){continue}U=false;
if(v=="A"){w[V[R][av]-2]*=T;w[V[R][av]-1]*=S;w[1]*=bj;w[2]*=bi;w[5]=+(bf+be?!(!(+w[5])):!(+w[5]))
}else{if(v=="H"){for(var q=1,p=w[av];q<p;q++){w[q]*=T}}else{if(v=="V"){for(q=1,p=w[av];
q<p;q++){w[q]*=S}}else{for(q=1,p=w[av];q<p;q++){w[q]*=q%2?T:S}}}}}var n=b4(V);br=ba-n.x-n.width/2;
bq=Z-n.y-n.height/2;V[0][1]+=br;V[0][2]+=bq;this.attr({path:V});break}if(this.type in {text:1,image:1}&&(bf!=1||be!=1)){if(this.transformations){this.transformations[2]="scale("[aN](bf,",",be,")");
this.node[cR]("transform",this.transformations[ax](aH));br=bf==-1?-bn.x-(X||0):bn.x;
bq=be==-1?-bn.y-(W||0):bn.y;this.attr({x:br,y:bq});bn.fx=bf-1;bn.fy=be-1}else{this.node.filterMatrix=cL+".Matrix(M11="[aN](bf,", M12=0, M21=0, M22=",be,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
bb.filter=(this.node.filterMatrix||aJ)+(this.node.filterOpacity||aJ)}}else{if(this.transformations){this.transformations[2]=aJ;
this.node[cR]("transform",this.transformations[ax](aH));bn.fx=0;bn.fy=0}else{this.node.filterMatrix=aJ;
bb.filter=(this.node.filterMatrix||aJ)+(this.node.filterOpacity||aJ)}}bn.scale=[bv,bu,bt,bs][ax](aH);
this._.sx=bv;this._.sy=bu}return this};dt.clone=function(){if(this.removed){return null
}var b=this.attr();delete b.scale;delete b.translation;return this.paper[this.type]().attr(b)
};var ak={},aj=function(H,G,F,E,D,C,B,A,z){var y=0,x=100,w=[H,G,F,E,D,C,B,A].join(),v=ak[w],u,t;
!v&&(ak[w]=v={data:[]});v.timer&&clearTimeout(v.timer);v.timer=setTimeout(function(){delete ak[w]
},2000);if(z!=null){var s=aj(H,G,F,E,D,C,B,A);x=~(~s)*10}for(var a=0;a<x+1;a++){if(v.data[z]>a){t=v.data[a*x]
}else{t=a8.findDotsAtSegment(H,G,F,E,D,C,B,A,a/x);v.data[a]=t}a&&(y+=dk(dk(u.x-t.x,2)+dk(u.y-t.y,2),0.5));
if(z!=null&&y>=z){return t}u=t}if(z==null){return y}},ai=function(a,e){return function(B,A,z){B=aZ(B);
var y,x,w,v,u="",t={},s,q=0;for(var c=0,b=B.length;c<b;c++){w=B[c];if(w[0]=="M"){y=+w[1];
x=+w[2]}else{v=aj(y,x,w[1],w[2],w[3],w[4],w[5],w[6]);if(q+v>A){if(e&&!t.start){s=aj(y,x,w[1],w[2],w[3],w[4],w[5],w[6],A-q);
u+=["C",s.start.x,s.start.y,s.m.x,s.m.y,s.x,s.y];if(z){return u}t.start=u;u=["M",s.x,s.y+"C",s.n.x,s.n.y,s.end.x,s.end.y,w[5],w[6]][ax]();
q+=v;y=+w[5];x=+w[6];continue}if(!a&&!e){s=aj(y,x,w[1],w[2],w[3],w[4],w[5],w[6],A-q);
return{x:s.x,y:s.y,alpha:s.alpha}}}q+=v;y=+w[5];x=+w[6]}u+=w}t.end=u;s=a?q:e?t:a8.findDotsAtSegment(y,x,w[1],w[2],w[3],w[4],w[5],w[6],1);
s.alpha&&(s={x:s.x,y:s.y,alpha:s.alpha});return s}},ah=ai(1),ag=ai(),af=ai(0,1);dt.getTotalLength=function(){if(this.type!="path"){return
}if(this.node.getTotalLength){return this.node.getTotalLength()}return ah(this.attrs.path)
};dt.getPointAtLength=function(b){if(this.type!="path"){return}return ag(this.attrs.path,b)
};dt.getSubpath=function(f,e){if(this.type!="path"){return}if(dm(this.getTotalLength()-e)<"1e-6"){return af(this.attrs.path,f).end
}var g=af(this.attrs.path,e,1);return f?af(g,f).end:g};a8.easing_formulas={linear:function(b){return b
},"<":function(b){return dk(b,3)},">":function(b){return dk(b-1,3)+1},"<>":function(b){b=b*2;
if(b<1){return dk(b,3)/2}b-=2;return(dk(b,3)+2)/2},backIn:function(e){var c=1.70158;
return e*e*((c+1)*e-c)},backOut:function(e){e=e-1;var c=1.70158;return e*e*((c+1)*e+c)+1
},elastic:function(f){if(f==0||f==1){return f}var e=0.3,g=e/4;return dk(2,-10*f)*aq.sin((f-g)*(2*di)/e)+1
},bounce:function(f){var e=7.5625,h=2.75,g;if(f<1/h){g=e*f*f}else{if(f<2/h){f-=1.5/h;
g=e*f*f+0.75}else{if(f<2.5/h){f-=2.25/h;g=e*f*f+0.9375}else{f-=2.625/h;g=e*f*f+0.984375
}}}return g}};var ae=[],ad=function(){var T=+(new Date);for(var S=0;S<ae[av];S++){var R=ae[S];
if(R.stop||R.el.removed){continue}var Q=T-R.start,P=R.ms,O=R.easing,N=R.from,M=R.diff,L=R.to,K=R.t,J=R.el,I={},H;
if(Q<P){var E=O(Q/P);for(var w in N){if(N[aY](w)){switch(cF[w]){case"along":H=E*P*M[w];
L.back&&(H=L.len-H);var v=ag(L[w],H);J.translate(M.sx-M.x||0,M.sy-M.y||0);M.x=v.x;
M.y=v.y;J.translate(v.x-M.sx,v.y-M.sy);L.rot&&J.rotate(M.r+v.alpha,v.x,v.y);break;
case dg:H=+N[w]+E*P*M[w];break;case"colour":H="rgb("+[ab(cU(N[w].r+E*P*M[w].r)),ab(cU(N[w].g+E*P*M[w].g)),ab(cU(N[w].b+E*P*M[w].b))][ax](",")+")";
break;case"path":H=[];for(var q=0,p=N[w][av];q<p;q++){H[q]=[N[w][q][0]];for(var f=1,a=N[w][q][av];
f<a;f++){H[q][f]=+N[w][q][f]+E*P*M[w][q][f]}H[q]=H[q][ax](aH)}H=H[ax](aH);break;case"csv":switch(w){case"translation":var G=E*P*M[w][0]-K.x,F=E*P*M[w][1]-K.y;
K.x+=G;K.y+=F;H=G+aH+F;break;case"rotation":H=+N[w][0]+E*P*M[w][0];N[w][1]&&(H+=","+N[w][1]+","+N[w][2]);
break;case"scale":H=[+N[w][0]+E*P*M[w][0],+N[w][1]+E*P*M[w][1],2 in L[w]?L[w][2]:aJ,3 in L[w]?L[w][3]:aJ][ax](aH);
break;case"clip-rect":H=[];q=4;while(q--){H[q]=+N[w][q]+E*P*M[w][q]}break}break;default:var D=[].concat(N[w]);
H=[];q=J.paper.customAttributes[w].length;while(q--){H[q]=+D[q]+E*P*M[w][q]}break
}I[w]=H}}J.attr(I);J._run&&J._run.call(J)}else{if(L.along){v=ag(L.along,L.len*!L.back);
J.translate(M.sx-(M.x||0)+v.x-M.sx,M.sy-(M.y||0)+v.y-M.sy);L.rot&&J.rotate(M.r+v.alpha,v.x,v.y)
}(K.x||K.y)&&J.translate(-K.x,-K.y);L.scale&&(L.scale+=aJ);J.attr(L);ae.splice(S--,1)
}}a8.svg&&J&&J.paper&&J.paper.safari();ae[av]&&setTimeout(ad)},ac=function(a,l,k,j,i){var h=k-j;
l.timeouts.push(setTimeout(function(){a8.is(i,"function")&&i.call(l);l.animate(a,h,a.easing)
},j))},ab=function(b){return ao(dp(b,255),0)},aa=function(f,e){if(f==null){return{x:this._.tx,y:this._.ty,toString:al}
}this._.tx+=+f;this._.ty+=+e;switch(this.type){case"circle":case"ellipse":this.attr({cx:+f+this.attrs.cx,cy:+e+this.attrs.cy});
break;case"rect":case"image":case"text":this.attr({x:+f+this.attrs.x,y:+e+this.attrs.y});
break;case"path":var g=b2(this.attrs.path);g[0][1]+=+f;g[0][2]+=+e;this.attr({path:g});
break}return this};dt.animateWith=function(i,h,n,m,l){for(var k=0,j=ae.length;k<j;
k++){ae[k].el.id==i.id&&(h.start=ae[k].start)}return this.animate(h,n,m,l)};dt.animateAlong=c1();
dt.animateAlongBack=c1(1);function c1(a){return function(k,j,i,h){var b={back:a};
a8.is(i,"function")?h=i:b.rot=i;k&&k.constructor==du&&(k=k.attrs.path);k&&(b.along=k);
return this.animate(b,j,h)}}function cY(E,D,C,B,A,z){var y=3*D,x=3*(B-D)-y,w=1-y-x,v=3*C,u=3*(A-C)-v,t=1-v-u;
function s(b){return((w*b+x)*b+y)*b}function q(f,e){var g=p(f,e);return((t*g+u)*g+v)*g
}function p(h,g){var F,o,n,m,l,i;for(n=h,i=0;i<8;i++){m=s(n)-h;if(dm(m)<g){return n
}l=(3*w*n+2*x)*n+y;if(dm(l)<0.000001){break}n=n-m/l}F=0;o=1;n=h;if(n<F){return F}if(n>o){return o
}while(F<o){m=s(n);if(dm(m-h)<g){return n}h>m?F=n:o=n;n=(o-F)/2+F}return n}return q(E,1/(200*z))
}dt.onAnimation=function(b){this._run=b||0;return this};dt.animate=function(bc,bb,ba,Z){var Y=this;
Y.timeouts=Y.timeouts||[];if(a8.is(ba,"function")||!ba){Z=ba||null}if(Y.removed){Z&&Z.call(Y);
return Y}var X={},W={},V=false,U={};for(var T in bc){if(bc[aY](T)){if(cF[aY](T)||Y.paper.customAttributes[aY](T)){V=true;
X[T]=Y.attr(T);X[T]==null&&(X[T]=cH[T]);W[T]=bc[T];switch(cF[T]){case"along":var S=ah(bc[T]),R=ag(bc[T],S*!(!bc.back)),Q=Y.getBBox();
U[T]=S/bb;U.tx=Q.x;U.ty=Q.y;U.sx=R.x;U.sy=R.y;W.rot=bc.rot;W.back=bc.back;W.len=S;
bc.rot&&(U.r=cP(Y.rotate())||0);break;case dg:U[T]=(W[T]-X[T])/bb;break;case"colour":X[T]=a8.getRGB(X[T]);
var O=a8.getRGB(W[T]);U[T]={r:(O.r-X[T].r)/bb,g:(O.g-X[T].g)/bb,b:(O.b-X[T].b)/bb};
break;case"path":var K=aZ(X[T],W[T]);X[T]=K[0];var J=K[1];U[T]=[];for(var E=0,f=X[T][av];
E<f;E++){U[T][E]=[0];for(var b=1,a=X[T][E][av];b<a;b++){U[T][E][b]=(J[E][b]-X[T][E][b])/bb
}}break;case"csv":var P=aF(bc[T])[aD](a6),N=aF(X[T])[aD](a6);switch(T){case"translation":X[T]=[0,0];
U[T]=[P[0]/bb,P[1]/bb];break;case"rotation":X[T]=N[1]==P[1]&&N[2]==P[2]?N:[0,P[1],P[2]];
U[T]=[(P[0]-X[T][0])/bb,0,0];break;case"scale":bc[T]=P;X[T]=aF(X[T])[aD](a6);U[T]=[(P[0]-X[T][0])/bb,(P[1]-X[T][1])/bb,0,0];
break;case"clip-rect":X[T]=aF(X[T])[aD](a6);U[T]=[];E=4;while(E--){U[T][E]=(P[E]-X[T][E])/bb
}break}W[T]=P;break;default:P=[].concat(bc[T]);N=[].concat(X[T]);U[T]=[];E=Y.paper.customAttributes[T][av];
while(E--){U[T][E]=((P[E]||0)-(N[E]||0))/bb}break}}}}if(V){var w=a8.easing_formulas[ba];
if(!w){w=aF(ba).match(cX);if(w&&w[av]==5){var s=w;w=function(c){return cY(c,+s[1],+s[2],+s[3],+s[4],bb)
}}else{w=function(c){return c}}}ae.push({start:bc.start||+(new Date),ms:bb,easing:w,from:X,diff:U,to:W,el:Y,t:{x:0,y:0}});
a8.is(Z,"function")&&(Y._ac=setTimeout(function(){Z.call(Y)},bb));ae[av]==1&&setTimeout(ad)
}else{var M=[],L;for(var I in bc){if(bc[aY](I)&&b7.test(I)){T={value:bc[I]};I=="from"&&(I=0);
I=="to"&&(I=100);T.key=cN(I,10);M.push(T)}}M.sort(cO);M[0].key&&M.unshift({key:0,value:Y.attrs});
for(E=0,f=M[av];E<f;E++){ac(M[E].value,Y,bb/100*M[E].key,bb/100*(M[E-1]&&M[E-1].key||0),M[E-1]&&M[E-1].value.callback)
}L=M[M[av]-1].value.callback;L&&Y.timeouts.push(setTimeout(function(){L.call(Y)},bb))
}return this};dt.stop=function(){for(var b=0;b<ae.length;b++){ae[b].el.id==this.id&&ae.splice(b--,1)
}for(b=0,ii=this.timeouts&&this.timeouts.length;b<ii;b++){clearTimeout(this.timeouts[b])
}this.timeouts=[];clearTimeout(this._ac);delete this._ac;return this};dt.translate=function(e,c){return this.attr({translation:e+" "+c})
};dt[da]=function(){return"Raphaël’s object"};a8.ae=ae;var cV=function(f){this.items=[];
this[av]=0;this.type="set";if(f){for(var e=0,g=f[av];e<g;e++){if(f[e]&&(f[e].constructor==du||f[e].constructor==cV)){this[this.items[av]]=this.items[this.items[av]]=f[e];
this[av]++}}}};cV[a0][c5]=function(){var f,e;for(var h=0,g=arguments[av];h<g;h++){f=arguments[h];
if(f&&(f.constructor==du||f.constructor==cV)){e=this.items[av];this[e]=this.items[e]=f;
this[av]++}}return this};cV[a0].pop=function(){delete this[this[av]--];return this.items.pop()
};for(var cS in dt){dt[aY](cS)&&(cV[a0][cS]=(function(b){return function(){for(var a=0,e=this.items[av];
a<e;a++){this.items[a][b][aO](this.items[a],arguments)}return this}})(cS))}cV[a0].attr=function(a,l){if(a&&a8.is(a,dc)&&a8.is(a[0],"object")){for(var k=0,j=a[av];
k<j;k++){this.items[k].attr(a[k])}}else{for(var i=0,h=this.items[av];i<h;i++){this.items[i].attr(a,l)
}}return this};cV[a0].animate=function(s,q,p,o){(a8.is(p,"function")||!p)&&(o=p||null);
var n=this.items[av],m=n,l,k=this,a;o&&(a=function(){!(--n)&&o.call(k)});p=a8.is(p,de)?p:a;
l=this.items[--m].animate(s,q,p,a);while(m--){this.items[m]&&!this.items[m].removed&&this.items[m].animateWith(l,s,q,p,a)
}return this};cV[a0].insertAfter=function(e){var c=this.items[av];while(c--){this.items[c].insertAfter(e)
}return this};cV[a0].getBBox=function(){var h=[],g=[],l=[],k=[];for(var j=this.items[av];
j--;){var i=this.items[j].getBBox();h[c5](i.x);g[c5](i.y);l[c5](i.x+i.width);k[c5](i.y+i.height)
}h=dp[aO](0,h);g=dp[aO](0,g);return{x:h,y:g,width:ao[aO](0,l)-h,height:ao[aO](0,k)-g}
};cV[a0].clone=function(f){f=new cV;for(var e=0,g=this.items[av];e<g;e++){f[c5](this.items[e].clone())
}return f};a8.registerFont=function(i){if(!i.face){return i}this.fonts=this.fonts||{};
var f={w:i.w,face:{},glyphs:{}},n=i.face["font-family"];for(var m in i.face){i.face[aY](m)&&(f.face[m]=i.face[m])
}this.fonts[n]?this.fonts[n][c5](f):this.fonts[n]=[f];if(!i.svg){f.face["units-per-em"]=cN(i.face["units-per-em"],10);
for(var l in i.glyphs){if(i.glyphs[aY](l)){var k=i.glyphs[l];f.glyphs[l]={w:k.w,k:{},d:k.d&&"M"+k.d[b9](/[mlcxtrv]/g,function(b){return({l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"})[b]||"M"
})+"z"};if(k.k){for(var j in k.k){k[aY](j)&&(f.glyphs[l].k[j]=k.k[j])}}}}}return i
};aQ.getFont=function(u,t,s,q){q=q||"normal";s=s||"normal";t=+t||({normal:400,bold:700,lighter:300,bolder:800})[t]||400;
if(!a8.fonts){return}var p=a8.fonts[u];if(!p){var o=new RegExp("(^|\\s)"+u[b9](/[^\w\d\s+!~.:_-]/g,aJ)+"(\\s|$)","i");
for(var n in a8.fonts){if(a8.fonts[aY](n)){if(o.test(n)){p=a8.fonts[n];break}}}}var m;
if(p){for(var f=0,a=p[av];f<a;f++){m=p[f];if(m.face["font-weight"]==t&&(m.face["font-style"]==s||!m.face["font-style"])&&m.face["font-stretch"]==q){break
}}}return m};aQ.print=function(M,L,K,J,I,H,G){H=H||"middle";G=ao(dp(G||0,1),-1);var F=this.set(),E=aF(K)[aD](aJ),D=0,C=aJ,B;
a8.is(J,K)&&(J=this.getFont(J));if(J){B=(I||16)/J.face["units-per-em"];var A=J.face.bbox.split(a6),z=+A[0],w=+A[1]+(H=="baseline"?A[3]-A[1]+ +J.face.descent:(A[3]-A[1])/2);
for(var s=0,p=E[av];s<p;s++){var b=s&&J.glyphs[E[s-1]]||{},a=J.glyphs[E[s]];D+=s?(b.w||J.w)+(b.k&&b.k[E[s]]||0)+J.w*G:0;
a&&a.d&&F[c5](this.path(a.d).attr({fill:"#000",stroke:"none",translation:[D,0]}))
}F.scale(B,B,z,w).translate(M-z,L-w)}return F};a8.format=function(a,g){var f=a8.is(g,dc)?[0][aN](g):arguments;
a&&a8.is(a,de)&&f[av]-1&&(a=a[b9](a2,function(e,c){return f[++c]==null?aJ:f[c]}));
return a||aJ};a8.ninja=function(){aS.was?aU.Raphael=aS.is:delete Raphael;return a8
};a8.el=dt;a8.st=cV[a0];aS.was?aU.Raphael=a8:Raphael=a8})()
/*
 * Raphael 1.5.2 - JavaScript Vector Library
 *
 * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://raphaeljs.com/license.html) license.
 */
(function(){function aJ(){if(aJ.is(arguments[0],a8)){var b=arguments[0],e=G[bC](aJ,b.splice(0,3+aJ.is(b[0],aG))),S=e.set();
for(var R=0,bI=b[t];R<bI;R++){var E=b[R]||{};bq[ah](E.type)&&S[k](e[E.type]().attr(E))
}return S}return G[bC](aJ,arguments)}aJ.version="1.5.2";var a=/[, ]+/,bq={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},bo=/\{(\d+)\}/g,bF="prototype",ah="hasOwnProperty",ab=document,aR=window,s={was:Object[bF][ah].call(aR,"Raphael"),is:aR.Raphael},bA=function(){this.customAttributes={}
},a0,bl="appendChild",bC="apply",bx="concat",X="createTouch" in ab,aQ="",aI=" ",bD=String,J="split",T="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend"[J](aI),br={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},aX="join",t="length",bH=bD[bF].toLowerCase,ap=Math,m=ap.max,bj=ap.min,ar=ap.abs,bm=ap.pow,aN=ap.PI,aG="number",ag="string",a8="array",a1="toString",a5="fill",aU=Object[bF][a1],bu={},k="push",h=/^url\(['"]?([^\)]+?)['"]?\)$/i,H=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,aq={"NaN":1,"Infinity":1,"-Infinity":1},c=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,ae=ap.round,F="setAttribute",ak=parseFloat,U=parseInt,a6=" progid:DXImageTransform.Microsoft",bp=bD[bF].toUpperCase,q={blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},an={along:"along",blur:aG,"clip-rect":"csv",cx:aG,cy:aG,fill:"colour","fill-opacity":aG,"font-size":aG,height:aG,opacity:aG,path:"path",r:aG,rotation:"csv",rx:aG,ry:aG,scale:"csv",stroke:"colour","stroke-opacity":aG,"stroke-width":aG,translation:"csv",width:aG,x:aG,y:aG},bt="replace",bg=/^(from|to|\d+%?)$/,be=/\s*,\s*/,n={hs:1,rg:1},bb=/,?([achlmqrstvxz]),?/gi,aS=/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,aH=/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,aP=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,bn=function(i,e){return i.key-e.key
};aJ.type=(aR.SVGAngle||ab.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML");
if(aJ.type=="VML"){var ay=ab.createElement("div"),aC;ay.innerHTML='<v:shape adj="1"/>';
aC=ay.firstChild;aC.style.behavior="url(#default#VML)";if(!(aC&&typeof aC.adj=="object")){return aJ.type=null
}ay=null}aJ.svg=!(aJ.vml=aJ.type=="VML");bA[bF]=aJ[bF];a0=bA[bF];aJ._id=0;aJ._oid=0;
aJ.fn={};aJ.is=function(e,b){b=bH.call(b);if(b=="finite"){return !aq[ah](+e)}return(b=="null"&&e===null)||(b==typeof e)||(b=="object"&&e===Object(e))||(b=="array"&&Array.isArray&&Array.isArray(e))||aU.call(e).slice(8,-1).toLowerCase()==b
};aJ.angle=function(R,bI,i,S,e,E){if(e==null){var b=R-i,bJ=bI-S;if(!b&&!bJ){return 0
}return((b<0)*180+ap.atan(-bJ/-b)*180/aN+360)%360}else{return aJ.angle(R,bI,e,E)-aJ.angle(i,S,e,E)
}};aJ.rad=function(b){return b%360*aN/180};aJ.deg=function(b){return b*180/aN%360
};aJ.snapTo=function(e,R,b){b=aJ.is(b,"finite")?b:10;if(aJ.is(e,a8)){var E=e.length;
while(E--){if(ar(e[E]-R)<=b){return e[E]}}}else{e=+e;var S=R%e;if(S<b){return R-S
}if(S>e-b){return R-S+e}}return R};function j(){var e=[],b=0;for(;b<32;b++){e[b]=(~~(ap.random()*16))[a1](16)
}e[12]=4;e[16]=((e[16]&3)|8)[a1](16);return"r-"+e[aX]("")}aJ.setWindow=function(b){aR=b;
ab=aR.document};var ba=function(R){if(aJ.vml){var b=/^\s+|\s+$/g;var bI;try{var bJ=new ActiveXObject("htmlfile");
bJ.write("<body>");bJ.close();bI=bJ.body}catch(bK){bI=createPopup().document.body
}var E=bI.createTextRange();ba=aB(function(i){try{bI.style.color=bD(i)[bt](b,aQ);
var bL=E.queryCommandValue("ForeColor");bL=((bL&255)<<16)|(bL&65280)|((bL&16711680)>>>16);
return"#"+("000000"+bL[a1](16)).slice(-6)}catch(bM){return"none"}})}else{var S=ab.createElement("i");
S.title="Rapha\xebl Colour Picker";S.style.display="none";ab.body[bl](S);ba=aB(function(e){S.style.color=e;
return ab.defaultView.getComputedStyle(S,aQ).getPropertyValue("color")})}return ba(R)
},aD=function(){return"hsb("+[this.h,this.s,this.b]+")"},N=function(){return"hsl("+[this.h,this.s,this.l]+")"
},C=function(){return this.hex};aJ.hsb2rgb=function(E,i,e,R){if(aJ.is(E,"object")&&"h" in E&&"s" in E&&"b" in E){e=E.b;
i=E.s;E=E.h;R=E.o}return aJ.hsl2rgb(E,i,e/2,R)};aJ.hsl2rgb=function(bJ,bQ,R,E){if(aJ.is(bJ,"object")&&"h" in bJ&&"s" in bJ&&"l" in bJ){R=bJ.l;
bQ=bJ.s;bJ=bJ.h}if(bJ>1||bQ>1||R>1){bJ/=360;bQ/=100;R/=100}var bO={},bL=["r","g","b"],bK,bN,bI,e,bM,bP;
if(!bQ){bO={r:R,g:R,b:R}}else{if(R<0.5){bK=R*(1+bQ)}else{bK=R+bQ-R*bQ}bN=2*R-bK;for(var S=0;
S<3;S++){bI=bJ+1/3*-(S-1);bI<0&&bI++;bI>1&&bI--;if(bI*6<1){bO[bL[S]]=bN+(bK-bN)*6*bI
}else{if(bI*2<1){bO[bL[S]]=bK}else{if(bI*3<2){bO[bL[S]]=bN+(bK-bN)*(2/3-bI)*6}else{bO[bL[S]]=bN
}}}}}bO.r*=255;bO.g*=255;bO.b*=255;bO.hex="#"+(16777216|bO.b|(bO.g<<8)|(bO.r<<16)).toString(16).slice(1);
aJ.is(E,"finite")&&(bO.opacity=E);bO.toString=C;return bO};aJ.rgb2hsb=function(b,e,bJ){if(e==null&&aJ.is(b,"object")&&"r" in b&&"g" in b&&"b" in b){bJ=b.b;
e=b.g;b=b.r}if(e==null&&aJ.is(b,ag)){var bL=aJ.getRGB(b);b=bL.r;e=bL.g;bJ=bL.b}if(b>1||e>1||bJ>1){b/=255;
e/=255;bJ/=255}var bI=m(b,e,bJ),i=bj(b,e,bJ),R,E,S=bI;if(i==bI){return{h:0,s:0,b:bI,toString:aD}
}else{var bK=(bI-i);E=bK/bI;if(b==bI){R=(e-bJ)/bK}else{if(e==bI){R=2+((bJ-b)/bK)}else{R=4+((b-e)/bK)
}}R/=6;R<0&&R++;R>1&&R--}return{h:R,s:E,b:S,toString:aD}};aJ.rgb2hsl=function(e,i,bI){if(i==null&&aJ.is(e,"object")&&"r" in e&&"g" in e&&"b" in e){bI=e.b;
i=e.g;e=e.r}if(i==null&&aJ.is(e,ag)){var bM=aJ.getRGB(e);e=bM.r;i=bM.g;bI=bM.b}if(e>1||i>1||bI>1){e/=255;
i/=255;bI/=255}var S=m(e,i,bI),E=bj(e,i,bI),R,bL,b=(S+E)/2,bK;if(E==S){bK={h:0,s:0,l:b}
}else{var bJ=S-E;bL=b<0.5?bJ/(S+E):bJ/(2-S-E);if(e==S){R=(i-bI)/bJ}else{if(i==S){R=2+(bI-e)/bJ
}else{R=4+(e-i)/bJ}}R/=6;R<0&&R++;R>1&&R--;bK={h:R,s:bL,l:b}}bK.toString=N;return bK
};aJ._path2string=function(){return this.join(",")[bt](bb,"$1")};function aB(E,e,b){function i(){var R=Array[bF].slice.call(arguments,0),bI=R[aX]("\u25ba"),S=i.cache=i.cache||{},bJ=i.count=i.count||[];
if(S[ah](bI)){return b?b(S[bI]):S[bI]}bJ[t]>=1000&&delete S[bJ.shift()];bJ[k](bI);
S[bI]=E[bC](e,R);return b?b(S[bI]):S[bI]}return i}aJ.getRGB=aB(function(b){if(!b||!!((b=bD(b)).indexOf("-")+1)){return{r:-1,g:-1,b:-1,hex:"none",error:1}
}if(b=="none"){return{r:-1,g:-1,b:-1,hex:"none"}}!(n[ah](b.toLowerCase().substring(0,2))||b.charAt()=="#")&&(b=ba(b));
var R,e,i,bI,E,bK,bJ,S=b.match(H);if(S){if(S[2]){bI=U(S[2].substring(5),16);i=U(S[2].substring(3,5),16);
e=U(S[2].substring(1,3),16)}if(S[3]){bI=U((bK=S[3].charAt(3))+bK,16);i=U((bK=S[3].charAt(2))+bK,16);
e=U((bK=S[3].charAt(1))+bK,16)}if(S[4]){bJ=S[4][J](be);e=ak(bJ[0]);bJ[0].slice(-1)=="%"&&(e*=2.55);
i=ak(bJ[1]);bJ[1].slice(-1)=="%"&&(i*=2.55);bI=ak(bJ[2]);bJ[2].slice(-1)=="%"&&(bI*=2.55);
S[1].toLowerCase().slice(0,4)=="rgba"&&(E=ak(bJ[3]));bJ[3]&&bJ[3].slice(-1)=="%"&&(E/=100)
}if(S[5]){bJ=S[5][J](be);e=ak(bJ[0]);bJ[0].slice(-1)=="%"&&(e*=2.55);i=ak(bJ[1]);
bJ[1].slice(-1)=="%"&&(i*=2.55);bI=ak(bJ[2]);bJ[2].slice(-1)=="%"&&(bI*=2.55);(bJ[0].slice(-3)=="deg"||bJ[0].slice(-1)=="\xb0")&&(e/=360);
S[1].toLowerCase().slice(0,4)=="hsba"&&(E=ak(bJ[3]));bJ[3]&&bJ[3].slice(-1)=="%"&&(E/=100);
return aJ.hsb2rgb(e,i,bI,E)}if(S[6]){bJ=S[6][J](be);e=ak(bJ[0]);bJ[0].slice(-1)=="%"&&(e*=2.55);
i=ak(bJ[1]);bJ[1].slice(-1)=="%"&&(i*=2.55);bI=ak(bJ[2]);bJ[2].slice(-1)=="%"&&(bI*=2.55);
(bJ[0].slice(-3)=="deg"||bJ[0].slice(-1)=="\xb0")&&(e/=360);S[1].toLowerCase().slice(0,4)=="hsla"&&(E=ak(bJ[3]));
bJ[3]&&bJ[3].slice(-1)=="%"&&(E/=100);return aJ.hsl2rgb(e,i,bI,E)}S={r:e,g:i,b:bI};
S.hex="#"+(16777216|bI|(i<<8)|(e<<16)).toString(16).slice(1);aJ.is(E,"finite")&&(S.opacity=E);
return S}return{r:-1,g:-1,b:-1,hex:"none",error:1}},aJ);aJ.getColor=function(e){var i=this.getColor.start=this.getColor.start||{h:0,s:1,b:e||0.75},b=this.hsb2rgb(i.h,i.s,i.b);
i.h+=0.075;if(i.h>1){i.h=0;i.s-=0.2;i.s<=0&&(this.getColor.start={h:0,s:1,b:i.b})
}return b.hex};aJ.getColor.reset=function(){delete this.start};aJ.parsePathString=aB(function(b){if(!b){return null
}var i={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},e=[];if(aJ.is(b,a8)&&aJ.is(b[0],a8)){e=aT(b)
}if(!e[t]){bD(b)[bt](aS,function(R,E,bJ){var bI=[],S=bH.call(E);bJ[bt](aH,function(bL,bK){bK&&bI[k](+bK)
});if(S=="m"&&bI[t]>2){e[k]([E][bx](bI.splice(0,2)));S="l";E=E=="m"?"l":"L"}while(bI[t]>=i[S]){e[k]([E][bx](bI.splice(0,i[S])));
if(!i[S]){break}}})}e[a1]=aJ._path2string;return e});aJ.findDotsAtSegment=function(e,b,bW,bU,bI,R,bK,bJ,bQ){var bO=1-bQ,bN=bm(bO,3)*e+bm(bO,2)*3*bQ*bW+bO*3*bQ*bQ*bI+bm(bQ,3)*bK,bL=bm(bO,3)*b+bm(bO,2)*3*bQ*bU+bO*3*bQ*bQ*R+bm(bQ,3)*bJ,bS=e+2*bQ*(bW-e)+bQ*bQ*(bI-2*bW+e),bR=b+2*bQ*(bU-b)+bQ*bQ*(R-2*bU+b),bV=bW+2*bQ*(bI-bW)+bQ*bQ*(bK-2*bI+bW),bT=bU+2*bQ*(R-bU)+bQ*bQ*(bJ-2*R+bU),bP=(1-bQ)*e+bQ*bW,bM=(1-bQ)*b+bQ*bU,E=(1-bQ)*bI+bQ*bK,i=(1-bQ)*R+bQ*bJ,S=(90-ap.atan((bS-bV)/(bR-bT))*180/aN);
(bS>bV||bR<bT)&&(S+=180);return{x:bN,y:bL,m:{x:bS,y:bR},n:{x:bV,y:bT},start:{x:bP,y:bM},end:{x:E,y:i},alpha:S}
};var aj=aB(function(bN){if(!bN){return{x:0,y:0,width:0,height:0}}bN=W(bN);var bK=0,bJ=0,R=[],e=[],E;
for(var S=0,bM=bN[t];S<bM;S++){E=bN[S];if(E[0]=="M"){bK=E[1];bJ=E[2];R[k](bK);e[k](bJ)
}else{var bI=a7(bK,bJ,E[1],E[2],E[3],E[4],E[5],E[6]);R=R[bx](bI.min.x,bI.max.x);e=e[bx](bI.min.y,bI.max.y);
bK=E[5];bJ=E[6]}}var b=bj[bC](0,R),bL=bj[bC](0,e);return{x:b,y:bL,width:m[bC](0,R)-b,height:m[bC](0,e)-bL}
}),aT=function(bI){var E=[];if(!aJ.is(bI,a8)||!aJ.is(bI&&bI[0],a8)){bI=aJ.parsePathString(bI)
}for(var e=0,R=bI[t];e<R;e++){E[e]=[];for(var b=0,S=bI[e][t];b<S;b++){E[e][b]=bI[e][b]
}}E[a1]=aJ._path2string;return E},av=aB(function(R){if(!aJ.is(R,a8)||!aJ.is(R&&R[0],a8)){R=aJ.parsePathString(R)
}var bM=[],bO=0,bN=0,bR=0,bQ=0,E=0;if(R[0][0]=="M"){bO=R[0][1];bN=R[0][2];bR=bO;bQ=bN;
E++;bM[k](["M",bO,bN])}for(var bJ=E,bS=R[t];bJ<bS;bJ++){var b=bM[bJ]=[],bP=R[bJ];
if(bP[0]!=bH.call(bP[0])){b[0]=bH.call(bP[0]);switch(b[0]){case"a":b[1]=bP[1];b[2]=bP[2];
b[3]=bP[3];b[4]=bP[4];b[5]=bP[5];b[6]=+(bP[6]-bO).toFixed(3);b[7]=+(bP[7]-bN).toFixed(3);
break;case"v":b[1]=+(bP[1]-bN).toFixed(3);break;case"m":bR=bP[1];bQ=bP[2];default:for(var bI=1,bK=bP[t];
bI<bK;bI++){b[bI]=+(bP[bI]-((bI%2)?bO:bN)).toFixed(3)}}}else{b=bM[bJ]=[];if(bP[0]=="m"){bR=bP[1]+bO;
bQ=bP[2]+bN}for(var S=0,e=bP[t];S<e;S++){bM[bJ][S]=bP[S]}}var bL=bM[bJ][t];switch(bM[bJ][0]){case"z":bO=bR;
bN=bQ;break;case"h":bO+=+bM[bJ][bL-1];break;case"v":bN+=+bM[bJ][bL-1];break;default:bO+=+bM[bJ][bL-2];
bN+=+bM[bJ][bL-1]}}bM[a1]=aJ._path2string;return bM},0,aT),z=aB(function(R){if(!aJ.is(R,a8)||!aJ.is(R&&R[0],a8)){R=aJ.parsePathString(R)
}var bL=[],bN=0,bM=0,bQ=0,bP=0,E=0;if(R[0][0]=="M"){bN=+R[0][1];bM=+R[0][2];bQ=bN;
bP=bM;E++;bL[0]=["M",bN,bM]}for(var bJ=E,bR=R[t];bJ<bR;bJ++){var b=bL[bJ]=[],bO=R[bJ];
if(bO[0]!=bp.call(bO[0])){b[0]=bp.call(bO[0]);switch(b[0]){case"A":b[1]=bO[1];b[2]=bO[2];
b[3]=bO[3];b[4]=bO[4];b[5]=bO[5];b[6]=+(bO[6]+bN);b[7]=+(bO[7]+bM);break;case"V":b[1]=+bO[1]+bM;
break;case"H":b[1]=+bO[1]+bN;break;case"M":bQ=+bO[1]+bN;bP=+bO[2]+bM;default:for(var bI=1,bK=bO[t];
bI<bK;bI++){b[bI]=+bO[bI]+((bI%2)?bN:bM)}}}else{for(var S=0,e=bO[t];S<e;S++){bL[bJ][S]=bO[S]
}}switch(b[0]){case"Z":bN=bQ;bM=bP;break;case"H":bN=b[1];break;case"V":bM=b[1];break;
case"M":bQ=bL[bJ][bL[bJ][t]-2];bP=bL[bJ][bL[bJ][t]-1];default:bN=bL[bJ][bL[bJ][t]-2];
bM=bL[bJ][bL[bJ][t]-1]}}bL[a1]=aJ._path2string;return bL},null,aT),bE=function(e,E,b,i){return[e,E,b,i,b,i]
},bk=function(e,E,bI,R,b,i){var S=1/3,bJ=2/3;return[S*e+bJ*bI,S*E+bJ*R,S*b+bJ*bI,S*i+bJ*R,b,i]
},aa=function(bQ,cl,bZ,bX,bR,bL,R,bP,ck,bS){var bW=aN*120/180,b=aN/180*(+bR||0),b3=[],b0,ch=aB(function(cm,cp,i){var co=cm*ap.cos(i)-cp*ap.sin(i),cn=cm*ap.sin(i)+cp*ap.cos(i);
return{x:co,y:cn}});if(!bS){b0=ch(bQ,cl,-b);bQ=b0.x;cl=b0.y;b0=ch(bP,ck,-b);bP=b0.x;
ck=b0.y;var e=ap.cos(aN/180*bR),bN=ap.sin(aN/180*bR),b5=(bQ-bP)/2,b4=(cl-ck)/2;var cf=(b5*b5)/(bZ*bZ)+(b4*b4)/(bX*bX);
if(cf>1){cf=ap.sqrt(cf);bZ=cf*bZ;bX=cf*bX}var E=bZ*bZ,b8=bX*bX,ca=(bL==R?-1:1)*ap.sqrt(ar((E*b8-E*b4*b4-b8*b5*b5)/(E*b4*b4+b8*b5*b5))),bU=ca*bZ*b4/bX+(bQ+bP)/2,bT=ca*-bX*b5/bZ+(cl+ck)/2,bK=ap.asin(((cl-bT)/bX).toFixed(9)),bJ=ap.asin(((ck-bT)/bX).toFixed(9));
bK=bQ<bU?aN-bK:bK;bJ=bP<bU?aN-bJ:bJ;bK<0&&(bK=aN*2+bK);bJ<0&&(bJ=aN*2+bJ);if(R&&bK>bJ){bK=bK-aN*2
}if(!R&&bJ>bK){bJ=bJ-aN*2}}else{bK=bS[0];bJ=bS[1];bU=bS[2];bT=bS[3]}var bO=bJ-bK;
if(ar(bO)>bW){var bV=bJ,bY=bP,bM=ck;bJ=bK+bW*(R&&bJ>bK?1:-1);bP=bU+bZ*ap.cos(bJ);
ck=bT+bX*ap.sin(bJ);b3=aa(bP,ck,bZ,bX,bR,0,R,bY,bM,[bJ,bV,bU,bT])}bO=bJ-bK;var bI=ap.cos(bK),cj=ap.sin(bK),S=ap.cos(bJ),ci=ap.sin(bJ),b6=ap.tan(bO/4),b9=4/3*bZ*b6,b7=4/3*bX*b6,cg=[bQ,cl],ce=[bQ+b9*cj,cl-b7*bI],cd=[bP+b9*ci,ck-b7*S],cb=[bP,ck];
ce[0]=2*cg[0]-ce[0];ce[1]=2*cg[1]-ce[1];if(bS){return[ce,cd,cb][bx](b3)}else{b3=[ce,cd,cb][bx](b3)[aX]()[J](",");
var b1=[];for(var cc=0,b2=b3[t];cc<b2;cc++){b1[cc]=cc%2?ch(b3[cc-1],b3[cc],b).y:ch(b3[cc],b3[cc+1],b).x
}return b1}},ad=function(e,b,E,i,bK,bJ,bI,S,bL){var R=1-bL;return{x:bm(R,3)*e+bm(R,2)*3*bL*E+R*3*bL*bL*bK+bm(bL,3)*bI,y:bm(R,3)*b+bm(R,2)*3*bL*i+R*3*bL*bL*bJ+bm(bL,3)*S}
},a7=aB(function(E,e,S,R,bS,bR,bO,bL){var bQ=(bS-2*S+E)-(bO-2*bS+S),bN=2*(S-E)-2*(bS-S),bK=E-S,bJ=(-bN+ap.sqrt(bN*bN-4*bQ*bK))/2/bQ,bI=(-bN-ap.sqrt(bN*bN-4*bQ*bK))/2/bQ,bM=[e,bL],bP=[E,bO],i;
ar(bJ)>"1e12"&&(bJ=0.5);ar(bI)>"1e12"&&(bI=0.5);if(bJ>0&&bJ<1){i=ad(E,e,S,R,bS,bR,bO,bL,bJ);
bP[k](i.x);bM[k](i.y)}if(bI>0&&bI<1){i=ad(E,e,S,R,bS,bR,bO,bL,bI);bP[k](i.x);bM[k](i.y)
}bQ=(bR-2*R+e)-(bL-2*bR+R);bN=2*(R-e)-2*(bR-R);bK=e-R;bJ=(-bN+ap.sqrt(bN*bN-4*bQ*bK))/2/bQ;
bI=(-bN-ap.sqrt(bN*bN-4*bQ*bK))/2/bQ;ar(bJ)>"1e12"&&(bJ=0.5);ar(bI)>"1e12"&&(bI=0.5);
if(bJ>0&&bJ<1){i=ad(E,e,S,R,bS,bR,bO,bL,bJ);bP[k](i.x);bM[k](i.y)}if(bI>0&&bI<1){i=ad(E,e,S,R,bS,bR,bO,bL,bI);
bP[k](i.x);bM[k](i.y)}return{min:{x:bj[bC](0,bP),y:bj[bC](0,bM)},max:{x:m[bC](0,bP),y:m[bC](0,bM)}}
}),W=aB(function(bR,bM){var R=z(bR),bN=bM&&z(bM),bO={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},b={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},bI=function(bS,bT){var i,bU;
if(!bS){return["C",bT.x,bT.y,bT.x,bT.y,bT.x,bT.y]}!(bS[0] in {T:1,Q:1})&&(bT.qx=bT.qy=null);
switch(bS[0]){case"M":bT.X=bS[1];bT.Y=bS[2];break;case"A":bS=["C"][bx](aa[bC](0,[bT.x,bT.y][bx](bS.slice(1))));
break;case"S":i=bT.x+(bT.x-(bT.bx||bT.x));bU=bT.y+(bT.y-(bT.by||bT.y));bS=["C",i,bU][bx](bS.slice(1));
break;case"T":bT.qx=bT.x+(bT.x-(bT.qx||bT.x));bT.qy=bT.y+(bT.y-(bT.qy||bT.y));bS=["C"][bx](bk(bT.x,bT.y,bT.qx,bT.qy,bS[1],bS[2]));
break;case"Q":bT.qx=bS[1];bT.qy=bS[2];bS=["C"][bx](bk(bT.x,bT.y,bS[1],bS[2],bS[3],bS[4]));
break;case"L":bS=["C"][bx](bE(bT.x,bT.y,bS[1],bS[2]));break;case"H":bS=["C"][bx](bE(bT.x,bT.y,bS[1],bT.y));
break;case"V":bS=["C"][bx](bE(bT.x,bT.y,bT.x,bS[1]));break;case"Z":bS=["C"][bx](bE(bT.x,bT.y,bT.X,bT.Y));
break}return bS},e=function(bS,bT){if(bS[bT][t]>7){bS[bT].shift();var bU=bS[bT];while(bU[t]){bS.splice(bT++,0,["C"][bx](bU.splice(0,6)))
}bS.splice(bT,1);bP=m(R[t],bN&&bN[t]||0)}},E=function(bW,bV,bT,bS,bU){if(bW&&bV&&bW[bU][0]=="M"&&bV[bU][0]!="M"){bV.splice(bU,0,["M",bS.x,bS.y]);
bT.bx=0;bT.by=0;bT.x=bW[bU][1];bT.y=bW[bU][2];bP=m(R[t],bN&&bN[t]||0)}};for(var bK=0,bP=m(R[t],bN&&bN[t]||0);
bK<bP;bK++){R[bK]=bI(R[bK],bO);e(R,bK);bN&&(bN[bK]=bI(bN[bK],b));bN&&e(bN,bK);E(R,bN,bO,b,bK);
E(bN,R,b,bO,bK);var bJ=R[bK],bQ=bN&&bN[bK],S=bJ[t],bL=bN&&bQ[t];bO.x=bJ[S-2];bO.y=bJ[S-1];
bO.bx=ak(bJ[S-4])||bO.x;bO.by=ak(bJ[S-3])||bO.y;b.bx=bN&&(ak(bQ[bL-4])||b.x);b.by=bN&&(ak(bQ[bL-3])||b.y);
b.x=bN&&bQ[bL-2];b.y=bN&&bQ[bL-1]}return bN?[R,bN]:R},null,aT),x=aB(function(bL){var bK=[];
for(var S=0,bM=bL[t];S<bM;S++){var b={},bJ=bL[S].match(/^([^:]*):?([\d\.]*)/);b.color=aJ.getRGB(bJ[1]);
if(b.color.error){return null}b.color=b.color.hex;bJ[2]&&(b.offset=bJ[2]+"%");bK[k](b)
}for(S=1,bM=bK[t]-1;S<bM;S++){if(!bK[S].offset){var e=ak(bK[S-1].offset||0),E=0;for(var R=S+1;
R<bM;R++){if(bK[R].offset){E=bK[R].offset;break}}if(!E){E=100;R=bM}E=ak(E);var bI=(E-e)/(R-S+1);
for(;S<R;S++){e+=bI;bK[S].offset=e+"%"}}}return bK}),aK=function(b,R,i,E){var e;if(aJ.is(b,ag)||aJ.is(b,"object")){e=aJ.is(b,ag)?ab.getElementById(b):b;
if(e.tagName){if(R==null){return{container:e,width:e.style.pixelWidth||e.offsetWidth,height:e.style.pixelHeight||e.offsetHeight}
}else{return{container:e,width:R,height:i}}}}else{return{container:1,x:b,y:R,width:i,height:E}
}},bf=function(b,i){var e=this;for(var E in i){if(i[ah](E)&&!(E in b)){switch(typeof i[E]){case"function":(function(R){b[E]=b===e?R:function(){return R[bC](e,arguments)
}})(i[E]);break;case"object":b[E]=b[E]||{};bf.call(this,b[E],i[E]);break;default:b[E]=i[E];
break}}}},aF=function(b,e){b==e.top&&(e.top=b.prev);b==e.bottom&&(e.bottom=b.next);
b.next&&(b.next.prev=b.prev);b.prev&&(b.prev.next=b.next)},am=function(b,e){if(e.top===b){return
}aF(b,e);b.next=null;b.prev=e.top;e.top.next=b;e.top=b},p=function(b,e){if(e.bottom===b){return
}aF(b,e);b.next=e.bottom;b.prev=null;e.bottom.prev=b;e.bottom=b},K=function(e,b,i){aF(e,i);
b==i.top&&(i.top=e);b.next&&(b.next.prev=e);e.next=b.next;e.prev=b;b.next=e},aM=function(e,b,i){aF(e,i);
b==i.bottom&&(i.bottom=e);b.prev&&(b.prev.next=e);e.prev=b.prev;b.prev=e;e.next=b
},A=function(b){return function(){throw new Error("Rapha\xebl: you are calling to method \u201c"+b+"\u201d of removed object")
}};aJ.pathToRelative=av;if(aJ.svg){a0.svgns="http://www.w3.org/2000/svg";a0.xlink="http://www.w3.org/1999/xlink";
ae=function(b){return +b+(~~b===b)*0.5};var bi=function(i,b){if(b){for(var e in b){if(b[ah](e)){i[F](e,bD(b[e]))
}}}else{i=ab.createElementNS(a0.svgns,i);i.style.webkitTapHighlightColor="rgba(0,0,0,0)";
return i}};aJ[a1]=function(){return"Your browser supports SVG.\nYou are running Rapha\xebl "+this.version
};var y=function(b,E){var e=bi("path");E.canvas&&E.canvas[bl](e);var i=new aV(e,E);
i.type="path";ao(i,{fill:"none",stroke:"#000",path:b});return i};var g=function(R,bQ,b){var bN="linear",bK=0.5,bI=0.5,bS=R.style;
bQ=bD(bQ)[bt](aP,function(bU,i,bV){bN="radial";if(i&&bV){bK=ak(i);bI=ak(bV);var bT=((bI>0.5)*2-1);
bm(bK-0.5,2)+bm(bI-0.5,2)>0.25&&(bI=ap.sqrt(0.25-bm(bK-0.5,2))*bT+0.5)&&bI!=0.5&&(bI=bI.toFixed(5)-0.00001*bT)
}return aQ});bQ=bQ[J](/\s*\-\s*/);if(bN=="linear"){var bJ=bQ.shift();bJ=-ak(bJ);if(isNaN(bJ)){return null
}var S=[0,0,ap.cos(bJ*aN/180),ap.sin(bJ*aN/180)],bP=1/(m(ar(S[2]),ar(S[3]))||1);S[2]*=bP;
S[3]*=bP;if(S[2]<0){S[0]=-S[2];S[2]=0}if(S[3]<0){S[1]=-S[3];S[3]=0}}var bM=x(bQ);
if(!bM){return null}var e=R.getAttribute(a5);e=e.match(/^url\(#(.*)\)$/);e&&b.defs.removeChild(ab.getElementById(e[1]));
var E=bi(bN+"Gradient");E.id=j();bi(E,bN=="radial"?{fx:bK,fy:bI}:{x1:S[0],y1:S[1],x2:S[2],y2:S[3]});
b.defs[bl](E);for(var bL=0,bR=bM[t];bL<bR;bL++){var bO=bi("stop");bi(bO,{offset:bM[bL].offset?bM[bL].offset:!bL?"0%":"100%","stop-color":bM[bL].color||"#fff"});
E[bl](bO)}bi(R,{fill:"url(#"+E.id+")",opacity:1,"fill-opacity":1});bS.fill=aQ;bS.opacity=1;
bS.fillOpacity=1;return 1};var ac=function(e){var b=e.getBBox();bi(e.pattern,{patternTransform:aJ.format("translate({0},{1})",b.x,b.y)})
};var ao=function(bP,bY){var bS={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},bU=bP.node,bQ=bP.attrs,bM=bP.rotate(),bI=function(b5,b4){b4=bS[bH.call(b4)];
if(b4){var b2=b5.attrs["stroke-width"]||"1",b0={round:b2,square:b2,butt:0}[b5.attrs["stroke-linecap"]||bY["stroke-linecap"]]||0,b3=[];
var b1=b4[t];while(b1--){b3[b1]=b4[b1]*b2+((b1%2)?1:-1)*b0}bi(bU,{"stroke-dasharray":b3[aX](",")})
}};bY[ah]("rotation")&&(bM=bY.rotation);var bL=bD(bM)[J](a);if(!(bL.length-1)){bL=null
}else{bL[1]=+bL[1];bL[2]=+bL[2]}ak(bM)&&bP.rotate(0,true);for(var bT in bY){if(bY[ah](bT)){if(!q[ah](bT)){continue
}var bR=bY[bT];bQ[bT]=bR;switch(bT){case"blur":bP.blur(bR);break;case"rotation":bP.rotate(bR,true);
break;case"href":case"title":case"target":var bW=bU.parentNode;if(bH.call(bW.tagName)!="a"){var R=bi("a");
bW.insertBefore(R,bU);R[bl](bU);bW=R}if(bT=="target"&&bR=="blank"){bW.setAttributeNS(bP.paper.xlink,"show","new")
}else{bW.setAttributeNS(bP.paper.xlink,bT,bR)}break;case"cursor":bU.style.cursor=bR;
break;case"clip-rect":var e=bD(bR)[J](a);if(e[t]==4){bP.clip&&bP.clip.parentNode.parentNode.removeChild(bP.clip.parentNode);
var i=bi("clipPath"),bV=bi("rect");i.id=j();bi(bV,{x:e[0],y:e[1],width:e[2],height:e[3]});
i[bl](bV);bP.paper.defs[bl](i);bi(bU,{"clip-path":"url(#"+i.id+")"});bP.clip=bV}if(!bR){var bX=ab.getElementById(bU.getAttribute("clip-path")[bt](/(^url\(#|\)$)/g,aQ));
bX&&bX.parentNode.removeChild(bX);bi(bU,{"clip-path":aQ});delete bP.clip}break;case"path":if(bP.type=="path"){bi(bU,{d:bR?bQ.path=z(bR):"M0,0"})
}break;case"width":bU[F](bT,bR);if(bQ.fx){bT="x";bR=bQ.x}else{break}case"x":if(bQ.fx){bR=-bQ.x-(bQ.width||0)
}case"rx":if(bT=="rx"&&bP.type=="rect"){break}case"cx":bL&&(bT=="x"||bT=="cx")&&(bL[1]+=bR-bQ[bT]);
bU[F](bT,bR);bP.pattern&&ac(bP);break;case"height":bU[F](bT,bR);if(bQ.fy){bT="y";
bR=bQ.y}else{break}case"y":if(bQ.fy){bR=-bQ.y-(bQ.height||0)}case"ry":if(bT=="ry"&&bP.type=="rect"){break
}case"cy":bL&&(bT=="y"||bT=="cy")&&(bL[2]+=bR-bQ[bT]);bU[F](bT,bR);bP.pattern&&ac(bP);
break;case"r":if(bP.type=="rect"){bi(bU,{rx:bR,ry:bR})}else{bU[F](bT,bR)}break;case"src":if(bP.type=="image"){bU.setAttributeNS(bP.paper.xlink,"href",bR)
}break;case"stroke-width":bU.style.strokeWidth=bR;bU[F](bT,bR);if(bQ["stroke-dasharray"]){bI(bP,bQ["stroke-dasharray"])
}break;case"stroke-dasharray":bI(bP,bR);break;case"translation":var bJ=bD(bR)[J](a);
bJ[0]=+bJ[0]||0;bJ[1]=+bJ[1]||0;if(bL){bL[1]+=bJ[0];bL[2]+=bJ[1]}B.call(bP,bJ[0],bJ[1]);
break;case"scale":bJ=bD(bR)[J](a);bP.scale(+bJ[0]||1,+bJ[1]||+bJ[0]||1,isNaN(ak(bJ[2]))?null:+bJ[2],isNaN(ak(bJ[3]))?null:+bJ[3]);
break;case a5:var S=bD(bR).match(h);if(S){i=bi("pattern");var bO=bi("image");i.id=j();
bi(i,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});bi(bO,{x:0,y:0});bO.setAttributeNS(bP.paper.xlink,"href",S[1]);
i[bl](bO);var bZ=ab.createElement("img");bZ.style.cssText="position:absolute;left:-9999em;top-9999em";
bZ.onload=function(){bi(i,{width:this.offsetWidth,height:this.offsetHeight});bi(bO,{width:this.offsetWidth,height:this.offsetHeight});
ab.body.removeChild(this);bP.paper.safari()};ab.body[bl](bZ);bZ.src=S[1];bP.paper.defs[bl](i);
bU.style.fill="url(#"+i.id+")";bi(bU,{fill:"url(#"+i.id+")"});bP.pattern=i;bP.pattern&&ac(bP);
break}var E=aJ.getRGB(bR);if(!E.error){delete bY.gradient;delete bQ.gradient;!aJ.is(bQ.opacity,"undefined")&&aJ.is(bY.opacity,"undefined")&&bi(bU,{opacity:bQ.opacity});
!aJ.is(bQ["fill-opacity"],"undefined")&&aJ.is(bY["fill-opacity"],"undefined")&&bi(bU,{"fill-opacity":bQ["fill-opacity"]})
}else{if((({circle:1,ellipse:1})[ah](bP.type)||bD(bR).charAt()!="r")&&g(bU,bR,bP.paper)){bQ.gradient=bR;
bQ.fill="none";break}}E[ah]("opacity")&&bi(bU,{"fill-opacity":E.opacity>1?E.opacity/100:E.opacity});
case"stroke":E=aJ.getRGB(bR);bU[F](bT,E.hex);bT=="stroke"&&E[ah]("opacity")&&bi(bU,{"stroke-opacity":E.opacity>1?E.opacity/100:E.opacity});
break;case"gradient":(({circle:1,ellipse:1})[ah](bP.type)||bD(bR).charAt()!="r")&&g(bU,bR,bP.paper);
break;case"opacity":if(bQ.gradient&&!bQ[ah]("stroke-opacity")){bi(bU,{"stroke-opacity":bR>1?bR/100:bR})
}case"fill-opacity":if(bQ.gradient){var b=ab.getElementById(bU.getAttribute(a5)[bt](/^url\(#|\)$/g,aQ));
if(b){var bK=b.getElementsByTagName("stop");bK[bK[t]-1][F]("stop-opacity",bR)}break
}default:bT=="font-size"&&(bR=U(bR,10)+"px");var bN=bT[bt](/(\-.)/g,function(b0){return bp.call(b0.substring(1))
});bU.style[bN]=bR;bU[F](bT,bR);break}}}Q(bP,bY);if(bL){bP.rotate(bL.join(aI))}else{ak(bM)&&bP.rotate(bM,true)
}};var o=1.2,Q=function(b,R){if(b.type!="text"||!(R[ah]("text")||R[ah]("font")||R[ah]("font-size")||R[ah]("x")||R[ah]("y"))){return
}var bL=b.attrs,e=b.node,bN=e.firstChild?U(ab.defaultView.getComputedStyle(e.firstChild,aQ).getPropertyValue("font-size"),10):10;
if(R[ah]("text")){bL.text=R.text;while(e.firstChild){e.removeChild(e.firstChild)}var E=bD(R.text)[J]("\n");
for(var S=0,bM=E[t];S<bM;S++){if(E[S]){var bJ=bi("tspan");S&&bi(bJ,{dy:bN*o,x:bL.x});
bJ[bl](ab.createTextNode(E[S]));e[bl](bJ)}}}else{E=e.getElementsByTagName("tspan");
for(S=0,bM=E[t];S<bM;S++){S&&bi(E[S],{dy:bN*o,x:bL.x})}}bi(e,{y:bL.y});var bI=b.getBBox(),bK=bL.y-(bI.y+bI.height/2);
bK&&aJ.is(bK,"finite")&&bi(e,{y:bL.y+bK})},aV=function(e,b){var E=0,i=0;this[0]=e;
this.id=aJ._oid++;this.node=e;e.raphael=this;this.paper=b;this.attrs=this.attrs||{};
this.transformations=[];this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!b.bottom&&(b.bottom=this);
this.prev=b.top;b.top&&(b.top.next=this);b.top=this;this.next=null};var bd=aV[bF];
aV[bF].rotate=function(e,b,E){if(this.removed){return this}if(e==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aX](aI)
}return this._.rt.deg}var i=this.getBBox();e=bD(e)[J](a);if(e[t]-1){b=ak(e[1]);E=ak(e[2])
}e=ak(e[0]);if(b!=null&&b!==false){this._.rt.deg=e}else{this._.rt.deg+=e}(E==null)&&(b=null);
this._.rt.cx=b;this._.rt.cy=E;b=b==null?i.x+i.width/2:b;E=E==null?i.y+i.height/2:E;
if(this._.rt.deg){this.transformations[0]=aJ.format("rotate({0} {1} {2})",this._.rt.deg,b,E);
this.clip&&bi(this.clip,{transform:aJ.format("rotate({0} {1} {2})",-this._.rt.deg,b,E)})
}else{this.transformations[0]=aQ;this.clip&&bi(this.clip,{transform:aQ})}bi(this.node,{transform:this.transformations[aX](aI)});
return this};aV[bF].hide=function(){!this.removed&&(this.node.style.display="none");
return this};aV[bF].show=function(){!this.removed&&(this.node.style.display="");return this
};aV[bF].remove=function(){if(this.removed){return}aF(this,this.paper);this.node.parentNode.removeChild(this.node);
for(var b in this){delete this[b]}this.removed=true};aV[bF].getBBox=function(){if(this.removed){return this
}if(this.type=="path"){return aj(this.attrs.path)}if(this.node.style.display=="none"){this.show();
var E=true}var bJ={};try{bJ=this.node.getBBox()}catch(S){}finally{bJ=bJ||{}}if(this.type=="text"){bJ={x:bJ.x,y:Infinity,width:0,height:0};
for(var b=0,R=this.node.getNumberOfChars();b<R;b++){var bI=this.node.getExtentOfChar(b);
(bI.y<bJ.y)&&(bJ.y=bI.y);(bI.y+bI.height-bJ.y>bJ.height)&&(bJ.height=bI.y+bI.height-bJ.y);
(bI.x+bI.width-bJ.x>bJ.width)&&(bJ.width=bI.x+bI.width-bJ.x)}}E&&this.hide();return bJ
};aV[bF].attr=function(b,bL){if(this.removed){return this}if(b==null){var bK={};for(var S in this.attrs){if(this.attrs[ah](S)){bK[S]=this.attrs[S]
}}this._.rt.deg&&(bK.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(bK.scale=this.scale());
bK.gradient&&bK.fill=="none"&&(bK.fill=bK.gradient)&&delete bK.gradient;return bK
}if(bL==null&&aJ.is(b,ag)){if(b=="translation"){return B.call(this)}if(b=="rotation"){return this.rotate()
}if(b=="scale"){return this.scale()}if(b==a5&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[b]}if(bL==null&&aJ.is(b,a8)){var bN={};for(var R=0,bI=b.length;
R<bI;R++){bN[b[R]]=this.attr(b[R])}return bN}if(bL!=null){var e={};e[b]=bL}else{if(b!=null&&aJ.is(b,"object")){e=b
}}for(var bM in this.paper.customAttributes){if(this.paper.customAttributes[ah](bM)&&e[ah](bM)&&aJ.is(this.paper.customAttributes[bM],"function")){var bJ=this.paper.customAttributes[bM].apply(this,[][bx](e[bM]));
this.attrs[bM]=e[bM];for(var E in bJ){if(bJ[ah](E)){e[E]=bJ[E]}}}}ao(this,e);return this
};aV[bF].toFront=function(){if(this.removed){return this}this.node.parentNode[bl](this.node);
var b=this.paper;b.top!=this&&am(this,b);return this};aV[bF].toBack=function(){if(this.removed){return this
}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);
p(this,this.paper);var b=this.paper}return this};aV[bF].insertAfter=function(b){if(this.removed){return this
}var e=b.node||b[b.length-1].node;if(e.nextSibling){e.parentNode.insertBefore(this.node,e.nextSibling)
}else{e.parentNode[bl](this.node)}K(this,b,this.paper);return this};aV[bF].insertBefore=function(b){if(this.removed){return this
}var e=b.node||b[0].node;e.parentNode.insertBefore(this.node,e);aM(this,b,this.paper);
return this};aV[bF].blur=function(e){var b=this;if(+e!==0){var i=bi("filter"),E=bi("feGaussianBlur");
b.attrs.blur=e;i.id=j();bi(E,{stdDeviation:+e||1.5});i.appendChild(E);b.paper.defs.appendChild(i);
b._blur=i;bi(b.node,{filter:"url(#"+i.id+")"})}else{if(b._blur){b._blur.parentNode.removeChild(b._blur);
delete b._blur;delete b.attrs.blur}b.node.removeAttribute("filter")}};var af=function(e,b,S,R){var E=bi("circle");
e.canvas&&e.canvas[bl](E);var i=new aV(E,e);i.attrs={cx:b,cy:S,r:R,fill:"none",stroke:"#000"};
i.type="circle";bi(E,i.attrs);return i},bc=function(i,b,bJ,e,S,bI){var R=bi("rect");
i.canvas&&i.canvas[bl](R);var E=new aV(R,i);E.attrs={x:b,y:bJ,width:e,height:S,r:bI||0,rx:bI||0,ry:bI||0,fill:"none",stroke:"#000"};
E.type="rect";bi(R,E.attrs);return E},aA=function(e,b,bI,S,R){var E=bi("ellipse");
e.canvas&&e.canvas[bl](E);var i=new aV(E,e);i.attrs={cx:b,cy:bI,rx:S,ry:R,fill:"none",stroke:"#000"};
i.type="ellipse";bi(E,i.attrs);return i},w=function(i,bI,b,bJ,e,S){var R=bi("image");
bi(R,{x:b,y:bJ,width:e,height:S,preserveAspectRatio:"none"});R.setAttributeNS(i.xlink,"href",bI);
i.canvas&&i.canvas[bl](R);var E=new aV(R,i);E.attrs={x:b,y:bJ,width:e,height:S,src:bI};
E.type="image";return E},al=function(e,b,S,R){var E=bi("text");bi(E,{x:b,y:S,"text-anchor":"middle"});
e.canvas&&e.canvas[bl](E);var i=new aV(E,e);i.attrs={x:b,y:S,"text-anchor":"middle",text:R,font:q.font,stroke:"none",fill:"#000"};
i.type="text";ao(i,i.attrs);return i},bB=function(e,b){this.width=e||this.width;this.height=b||this.height;
this.canvas[F]("width",this.width);this.canvas[F]("height",this.height);return this
},G=function(){var E=aK[bC](0,arguments),i=E&&E.container,e=E.x,bI=E.y,R=E.width,b=E.height;
if(!i){throw new Error("SVG container not found.")}var S=bi("svg");e=e||0;bI=bI||0;
R=R||512;b=b||342;bi(S,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:R,height:b});
if(i==1){S.style.cssText="position:absolute;left:"+e+"px;top:"+bI+"px";ab.body[bl](S)
}else{if(i.firstChild){i.insertBefore(S,i.firstChild)}else{i[bl](S)}}i=new bA;i.width=R;
i.height=b;i.canvas=S;bf.call(i,i,aJ.fn);i.clear();return i};a0.clear=function(){var b=this.canvas;
while(b.firstChild){b.removeChild(b.firstChild)}this.bottom=this.top=null;(this.desc=bi("desc"))[bl](ab.createTextNode("Created with Rapha\xebl"));
b[bl](this.desc);b[bl](this.defs=bi("defs"))};a0.remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);
for(var b in this){this[b]=A(b)}}}if(aJ.vml){var O={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},aO=/([clmz]),?([^clmz]*)/gi,by=/ progid:\S+Blur\([^\)]+\)/g,bG=/-?[^,\s-]+/g,aY=1000+aI+1000,v=10,u={path:1,rect:1},bh=function(bN){var bK=/[ahqstv]/ig,E=z;
bD(bN).match(bK)&&(E=W);bK=/[clmz]/g;if(E==z&&!bD(bN).match(bK)){var bJ=bD(bN)[bt](aO,function(bQ,bS,bO){var bR=[],i=bH.call(bS)=="m",bP=O[bS];
bO[bt](bG,function(bT){if(i&&bR[t]==2){bP+=bR+O[bS=="m"?"l":"L"];bR=[]}bR[k](ae(bT*v))
});return bP+bR});return bJ}var bL=E(bN),e,b;bJ=[];for(var S=0,bM=bL[t];S<bM;S++){e=bL[S];
b=bH.call(bL[S][0]);b=="z"&&(b="x");for(var R=1,bI=e[t];R<bI;R++){b+=ae(e[R]*v)+(R!=bI-1?",":aQ)
}bJ[k](b)}return bJ[aX](aI)};aJ[a1]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl "+this.version
};y=function(i,e){var S=az("group");S.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";
S.coordsize=e.coordsize;S.coordorigin=e.coordorigin;var R=az("shape"),E=R.style;E.width=e.width+"px";
E.height=e.height+"px";R.coordsize=aY;R.coordorigin=e.coordorigin;S[bl](R);var bI=new aV(R,S,e),b={fill:"none",stroke:"#000"};
i&&(b.path=i);bI.type="path";bI.path=[];bI.Path=aQ;ao(bI,b);e.canvas[bl](S);return bI
};ao=function(bL,bS){bL.attrs=bL.attrs||{};var bP=bL.node,bT=bL.attrs,bI=bP.style,E,bR=(bS.x!=bT.x||bS.y!=bT.y||bS.width!=bT.width||bS.height!=bT.height||bS.r!=bT.r)&&bL.type=="rect",bX=bL;
for(var bJ in bS){if(bS[ah](bJ)){bT[bJ]=bS[bJ]}}if(bR){bT.path=au(bT.x,bT.y,bT.width,bT.height,bT.r);
bL.X=bT.x;bL.Y=bT.y;bL.W=bT.width;bL.H=bT.height}bS.href&&(bP.href=bS.href);bS.title&&(bP.title=bS.title);
bS.target&&(bP.target=bS.target);bS.cursor&&(bI.cursor=bS.cursor);"blur" in bS&&bL.blur(bS.blur);
if(bS.path&&bL.type=="path"||bR){bP.path=bh(bT.path)}if(bS.rotation!=null){bL.rotate(bS.rotation,true)
}if(bS.translation){E=bD(bS.translation)[J](a);B.call(bL,E[0],E[1]);if(bL._.rt.cx!=null){bL._.rt.cx+=+E[0];
bL._.rt.cy+=+E[1];bL.setBox(bL.attrs,E[0],E[1])}}if(bS.scale){E=bD(bS.scale)[J](a);
bL.scale(+E[0]||1,+E[1]||+E[0]||1,+E[2]||null,+E[3]||null)}if("clip-rect" in bS){var b=bD(bS["clip-rect"])[J](a);
if(b[t]==4){b[2]=+b[2]+(+b[0]);b[3]=+b[3]+(+b[1]);var bK=bP.clipRect||ab.createElement("div"),bW=bK.style,S=bP.parentNode;
bW.clip=aJ.format("rect({1}px {2}px {3}px {0}px)",b);if(!bP.clipRect){bW.position="absolute";
bW.top=0;bW.left=0;bW.width=bL.paper.width+"px";bW.height=bL.paper.height+"px";S.parentNode.insertBefore(bK,S);
bK[bl](S);bP.clipRect=bK}}if(!bS["clip-rect"]){bP.clipRect&&(bP.clipRect.style.clip=aQ)
}}if(bL.type=="image"&&bS.src){bP.src=bS.src}if(bL.type=="image"&&bS.opacity){bP.filterOpacity=a6+".Alpha(opacity="+(bS.opacity*100)+")";
bI.filter=(bP.filterMatrix||aQ)+(bP.filterOpacity||aQ)}bS.font&&(bI.font=bS.font);
bS["font-family"]&&(bI.fontFamily='"'+bS["font-family"][J](",")[0][bt](/^['"]+|['"]+$/g,aQ)+'"');
bS["font-size"]&&(bI.fontSize=bS["font-size"]);bS["font-weight"]&&(bI.fontWeight=bS["font-weight"]);
bS["font-style"]&&(bI.fontStyle=bS["font-style"]);if(bS.opacity!=null||bS["stroke-width"]!=null||bS.fill!=null||bS.stroke!=null||bS["stroke-width"]!=null||bS["stroke-opacity"]!=null||bS["fill-opacity"]!=null||bS["stroke-dasharray"]!=null||bS["stroke-miterlimit"]!=null||bS["stroke-linejoin"]!=null||bS["stroke-linecap"]!=null){bP=bL.shape||bP;
var bQ=(bP.getElementsByTagName(a5)&&bP.getElementsByTagName(a5)[0]),bU=false;!bQ&&(bU=bQ=az(a5));
if("fill-opacity" in bS||"opacity" in bS){var e=((+bT["fill-opacity"]+1||2)-1)*((+bT.opacity+1||2)-1)*((+aJ.getRGB(bS.fill).o+1||2)-1);
e=bj(m(e,0),1);bQ.opacity=e}bS.fill&&(bQ.on=true);if(bQ.on==null||bS.fill=="none"){bQ.on=false
}if(bQ.on&&bS.fill){var i=bS.fill.match(h);if(i){bQ.src=i[1];bQ.type="tile"}else{bQ.color=aJ.getRGB(bS.fill).hex;
bQ.src=aQ;bQ.type="solid";if(aJ.getRGB(bS.fill).error&&(bX.type in {circle:1,ellipse:1}||bD(bS.fill).charAt()!="r")&&g(bX,bS.fill)){bT.fill="none";
bT.gradient=bS.fill}}}bU&&bP[bl](bQ);var R=(bP.getElementsByTagName("stroke")&&bP.getElementsByTagName("stroke")[0]),bV=false;
!R&&(bV=R=az("stroke"));if((bS.stroke&&bS.stroke!="none")||bS["stroke-width"]||bS["stroke-opacity"]!=null||bS["stroke-dasharray"]||bS["stroke-miterlimit"]||bS["stroke-linejoin"]||bS["stroke-linecap"]){R.on=true
}(bS.stroke=="none"||R.on==null||bS.stroke==0||bS["stroke-width"]==0)&&(R.on=false);
var bO=aJ.getRGB(bS.stroke);R.on&&bS.stroke&&(R.color=bO.hex);e=((+bT["stroke-opacity"]+1||2)-1)*((+bT.opacity+1||2)-1)*((+bO.o+1||2)-1);
var bM=(ak(bS["stroke-width"])||1)*0.75;e=bj(m(e,0),1);bS["stroke-width"]==null&&(bM=bT["stroke-width"]);
bS["stroke-width"]&&(R.weight=bM);bM&&bM<1&&(e*=bM)&&(R.weight=1);R.opacity=e;bS["stroke-linejoin"]&&(R.joinstyle=bS["stroke-linejoin"]||"miter");
R.miterlimit=bS["stroke-miterlimit"]||8;bS["stroke-linecap"]&&(R.endcap=bS["stroke-linecap"]=="butt"?"flat":bS["stroke-linecap"]=="square"?"square":"round");
if(bS["stroke-dasharray"]){var bN={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};
R.dashstyle=bN[ah](bS["stroke-dasharray"])?bN[bS["stroke-dasharray"]]:aQ}bV&&bP[bl](R)
}if(bX.type=="text"){bI=bX.paper.span.style;bT.font&&(bI.font=bT.font);bT["font-family"]&&(bI.fontFamily=bT["font-family"]);
bT["font-size"]&&(bI.fontSize=bT["font-size"]);bT["font-weight"]&&(bI.fontWeight=bT["font-weight"]);
bT["font-style"]&&(bI.fontStyle=bT["font-style"]);bX.node.string&&(bX.paper.span.innerHTML=bD(bX.node.string)[bt](/</g,"&#60;")[bt](/&/g,"&#38;")[bt](/\n/g,"<br>"));
bX.W=bT.w=bX.paper.span.offsetWidth;bX.H=bT.h=bX.paper.span.offsetHeight;bX.X=bT.x;
bX.Y=bT.y+ae(bX.H/2);switch(bT["text-anchor"]){case"start":bX.node.style["v-text-align"]="left";
bX.bbx=ae(bX.W/2);break;case"end":bX.node.style["v-text-align"]="right";bX.bbx=-ae(bX.W/2);
break;default:bX.node.style["v-text-align"]="center";break}}};g=function(b,bJ){b.attrs=b.attrs||{};
var bK=b.attrs,bM,S="linear",bI=".5 .5";b.attrs.gradient=bJ;bJ=bD(bJ)[bt](aP,function(bO,bP,i){S="radial";
if(bP&&i){bP=ak(bP);i=ak(i);bm(bP-0.5,2)+bm(i-0.5,2)>0.25&&(i=ap.sqrt(0.25-bm(bP-0.5,2))*((i>0.5)*2-1)+0.5);
bI=bP+aI+i}return aQ});bJ=bJ[J](/\s*\-\s*/);if(S=="linear"){var e=bJ.shift();e=-ak(e);
if(isNaN(e)){return null}}var R=x(bJ);if(!R){return null}b=b.shape||b.node;bM=b.getElementsByTagName(a5)[0]||az(a5);
!bM.parentNode&&b.appendChild(bM);if(R[t]){bM.on=true;bM.method="none";bM.color=R[0].color;
bM.color2=R[R[t]-1].color;var bN=[];for(var E=0,bL=R[t];E<bL;E++){R[E].offset&&bN[k](R[E].offset+aI+R[E].color)
}bM.colors&&(bM.colors.value=bN[t]?bN[aX]():"0% "+bM.color);if(S=="radial"){bM.type="gradientradial";
bM.focus="100%";bM.focussize=bI;bM.focusposition=bI}else{bM.type="gradient";bM.angle=(270-e)%360
}}return 1};aV=function(R,bI,b){var S=0,i=0,e=0,E=1;this[0]=R;this.id=aJ._oid++;this.node=R;
R.raphael=this;this.X=0;this.Y=0;this.attrs={};this.Group=bI;this.paper=b;this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};
!b.bottom&&(b.bottom=this);this.prev=b.top;b.top&&(b.top.next=this);b.top=this;this.next=null
};bd=aV[bF];bd.rotate=function(e,b,i){if(this.removed){return this}if(e==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aX](aI)
}return this._.rt.deg}e=bD(e)[J](a);if(e[t]-1){b=ak(e[1]);i=ak(e[2])}e=ak(e[0]);if(b!=null){this._.rt.deg=e
}else{this._.rt.deg+=e}i==null&&(b=null);this._.rt.cx=b;this._.rt.cy=i;this.setBox(this.attrs,b,i);
this.Group.style.rotation=this._.rt.deg;return this};bd.setBox=function(R,S,E){if(this.removed){return this
}var b=this.Group.style,bI=(this.shape&&this.shape.style)||this.node.style;R=R||{};
for(var bJ in R){if(R[ah](bJ)){this.attrs[bJ]=R[bJ]}}S=S||this._.rt.cx;E=E||this._.rt.cy;
var bM=this.attrs,bP,bO,bQ,bL;switch(this.type){case"circle":bP=bM.cx-bM.r;bO=bM.cy-bM.r;
bQ=bL=bM.r*2;break;case"ellipse":bP=bM.cx-bM.rx;bO=bM.cy-bM.ry;bQ=bM.rx*2;bL=bM.ry*2;
break;case"image":bP=+bM.x;bO=+bM.y;bQ=bM.width||0;bL=bM.height||0;break;case"text":this.textpath.v=["m",ae(bM.x),", ",ae(bM.y-2),"l",ae(bM.x)+1,", ",ae(bM.y-2)][aX](aQ);
bP=bM.x-ae(this.W/2);bO=bM.y-this.H/2;bQ=this.W;bL=this.H;break;case"rect":case"path":if(!this.attrs.path){bP=0;
bO=0;bQ=this.paper.width;bL=this.paper.height}else{var bK=aj(this.attrs.path);bP=bK.x;
bO=bK.y;bQ=bK.width;bL=bK.height}break;default:bP=0;bO=0;bQ=this.paper.width;bL=this.paper.height;
break}S=(S==null)?bP+bQ/2:S;E=(E==null)?bO+bL/2:E;var e=S-this.paper.width/2,bN=E-this.paper.height/2,bR;
b.left!=(bR=e+"px")&&(b.left=bR);b.top!=(bR=bN+"px")&&(b.top=bR);this.X=u[ah](this.type)?-e:bP;
this.Y=u[ah](this.type)?-bN:bO;this.W=bQ;this.H=bL;if(u[ah](this.type)){bI.left!=(bR=-e*v+"px")&&(bI.left=bR);
bI.top!=(bR=-bN*v+"px")&&(bI.top=bR)}else{if(this.type=="text"){bI.left!=(bR=-e+"px")&&(bI.left=bR);
bI.top!=(bR=-bN+"px")&&(bI.top=bR)}else{b.width!=(bR=this.paper.width+"px")&&(b.width=bR);
b.height!=(bR=this.paper.height+"px")&&(b.height=bR);bI.left!=(bR=bP-e+"px")&&(bI.left=bR);
bI.top!=(bR=bO-bN+"px")&&(bI.top=bR);bI.width!=(bR=bQ+"px")&&(bI.width=bR);bI.height!=(bR=bL+"px")&&(bI.height=bR)
}}};bd.hide=function(){!this.removed&&(this.Group.style.display="none");return this
};bd.show=function(){!this.removed&&(this.Group.style.display="block");return this
};bd.getBBox=function(){if(this.removed){return this}if(u[ah](this.type)){return aj(this.attrs.path)
}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H}};bd.remove=function(){if(this.removed){return
}aF(this,this.paper);this.node.parentNode.removeChild(this.node);this.Group.parentNode.removeChild(this.Group);
this.shape&&this.shape.parentNode.removeChild(this.shape);for(var b in this){delete this[b]
}this.removed=true};bd.attr=function(b,bJ){if(this.removed){return this}if(b==null){var bI={};
for(var R in this.attrs){if(this.attrs[ah](R)){bI[R]=this.attrs[R]}}this._.rt.deg&&(bI.rotation=this.rotate());
(this._.sx!=1||this._.sy!=1)&&(bI.scale=this.scale());bI.gradient&&bI.fill=="none"&&(bI.fill=bI.gradient)&&delete bI.gradient;
return bI}if(bJ==null&&aJ.is(b,"string")){if(b=="translation"){return B.call(this)
}if(b=="rotation"){return this.rotate()}if(b=="scale"){return this.scale()}if(b==a5&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[b]}if(this.attrs&&bJ==null&&aJ.is(b,a8)){var bM,bL={};for(R=0,bM=b[t];
R<bM;R++){bL[b[R]]=this.attr(b[R])}return bL}var e;if(bJ!=null){e={};e[b]=bJ}bJ==null&&aJ.is(b,"object")&&(e=b);
if(e){for(var bK in this.paper.customAttributes){if(this.paper.customAttributes[ah](bK)&&e[ah](bK)&&aJ.is(this.paper.customAttributes[bK],"function")){var S=this.paper.customAttributes[bK].apply(this,[][bx](e[bK]));
this.attrs[bK]=e[bK];for(var E in S){if(S[ah](E)){e[E]=S[E]}}}}if(e.text&&this.type=="text"){this.node.string=e.text
}ao(this,e);if(e.gradient&&(({circle:1,ellipse:1})[ah](this.type)||bD(e.gradient).charAt()!="r")){g(this,e.gradient)
}(!u[ah](this.type)||this._.rt.deg)&&this.setBox(this.attrs)}return this};bd.toFront=function(){!this.removed&&this.Group.parentNode[bl](this.Group);
this.paper.top!=this&&am(this,this.paper);return this};bd.toBack=function(){if(this.removed){return this
}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);
p(this,this.paper)}return this};bd.insertAfter=function(b){if(this.removed){return this
}if(b.constructor==ai){b=b[b.length-1]}if(b.Group.nextSibling){b.Group.parentNode.insertBefore(this.Group,b.Group.nextSibling)
}else{b.Group.parentNode[bl](this.Group)}K(this,b,this.paper);return this};bd.insertBefore=function(b){if(this.removed){return this
}if(b.constructor==ai){b=b[0]}b.Group.parentNode.insertBefore(this.Group,b.Group);
aM(this,b,this.paper);return this};bd.blur=function(b){var e=this.node.runtimeStyle,i=e.filter;
i=i.replace(by,aQ);if(+b!==0){this.attrs.blur=b;e.filter=i+aI+a6+".Blur(pixelradius="+(+b||1.5)+")";
e.margin=aJ.format("-{0}px 0 0 -{0}px",ae(+b||1.5))}else{e.filter=i;e.margin=0;delete this.attrs.blur
}};af=function(e,b,bJ,S){var R=az("group"),bI=az("oval"),i=bI.style;R.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";
R.coordsize=aY;R.coordorigin=e.coordorigin;R[bl](bI);var E=new aV(bI,R,e);E.type="circle";
ao(E,{stroke:"#000",fill:"none"});E.attrs.cx=b;E.attrs.cy=bJ;E.attrs.r=S;E.setBox({x:b-S,y:bJ-S,width:S*2,height:S*2});
e.canvas[bl](R);return E};function au(b,R,e,i,E){if(E){return aJ.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z",b+E,R,e-E*2,E,-E,i-E*2,E*2-e,E*2-i)
}else{return aJ.format("M{0},{1}l{2},0,0,{3},{4},0z",b,R,e,i,-e)}}bc=function(e,bI,R,bJ,i,b){var bK=au(bI,R,bJ,i,b),E=e.path(bK),S=E.attrs;
E.X=S.x=bI;E.Y=S.y=R;E.W=S.width=bJ;E.H=S.height=i;S.r=b;S.path=bK;E.type="rect";
return E};aA=function(b,bK,bJ,i,e){var R=az("group"),E=az("oval"),bI=E.style;R.style.cssText="position:absolute;left:0;top:0;width:"+b.width+"px;height:"+b.height+"px";
R.coordsize=aY;R.coordorigin=b.coordorigin;R[bl](E);var S=new aV(E,R,b);S.type="ellipse";
ao(S,{stroke:"#000"});S.attrs.cx=bK;S.attrs.cy=bJ;S.attrs.rx=i;S.attrs.ry=e;S.setBox({x:bK-i,y:bJ-e,width:i*2,height:e*2});
b.canvas[bl](R);return S};w=function(e,b,bJ,bI,bK,E){var R=az("group"),i=az("image");
R.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";
R.coordsize=aY;R.coordorigin=e.coordorigin;i.src=b;R[bl](i);var S=new aV(i,R,e);S.type="image";
S.attrs.src=b;S.attrs.x=bJ;S.attrs.y=bI;S.attrs.w=bK;S.attrs.h=E;S.setBox({x:bJ,y:bI,width:bK,height:E});
e.canvas[bl](R);return S};al=function(e,bK,bJ,bL){var R=az("group"),E=az("shape"),bI=E.style,bM=az("path"),b=bM.style,i=az("textpath");
R.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";
R.coordsize=aY;R.coordorigin=e.coordorigin;bM.v=aJ.format("m{0},{1}l{2},{1}",ae(bK*10),ae(bJ*10),ae(bK*10)+1);
bM.textpathok=true;bI.width=e.width;bI.height=e.height;i.string=bD(bL);i.on=true;
E[bl](i);E[bl](bM);R[bl](E);var S=new aV(i,R,e);S.shape=E;S.textpath=bM;S.type="text";
S.attrs.text=bL;S.attrs.x=bK;S.attrs.y=bJ;S.attrs.w=1;S.attrs.h=1;ao(S,{font:q.font,stroke:"none",fill:"#000"});
S.setBox();e.canvas[bl](R);return S};bB=function(i,b){var e=this.canvas.style;i==+i&&(i+="px");
b==+b&&(b+="px");e.width=i;e.height=b;e.clip="rect(0 "+i+" "+b+" 0)";return this};
var az;ab.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!ab.namespaces.rvml&&ab.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
az=function(b){return ab.createElement("<rvml:"+b+' class="rvml">')}}catch(ax){az=function(b){return ab.createElement("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
}}G=function(){var i=aK[bC](0,arguments),b=i.container,bK=i.height,bL,e=i.width,bJ=i.x,bI=i.y;
if(!b){throw new Error("VML container not found.")}var R=new bA,S=R.canvas=ab.createElement("div"),E=S.style;
bJ=bJ||0;bI=bI||0;e=e||512;bK=bK||342;e==+e&&(e+="px");bK==+bK&&(bK+="px");R.width=1000;
R.height=1000;R.coordsize=v*1000+aI+v*1000;R.coordorigin="0 0";R.span=ab.createElement("span");
R.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
S[bl](R.span);E.cssText=aJ.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",e,bK);
if(b==1){ab.body[bl](S);E.left=bJ+"px";E.top=bI+"px";E.position="absolute"}else{if(b.firstChild){b.insertBefore(S,b.firstChild)
}else{b[bl](S)}}bf.call(R,R,aJ.fn);return R};a0.clear=function(){this.canvas.innerHTML=aQ;
this.span=ab.createElement("span");this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
this.canvas[bl](this.span);this.bottom=this.top=null};a0.remove=function(){this.canvas.parentNode.removeChild(this.canvas);
for(var b in this){this[b]=A(b)}return true}}var V=navigator.userAgent.match(/Version\/(.*?)\s/);
if((navigator.vendor=="Apple Computer, Inc.")&&(V&&V[1]<4||navigator.platform.slice(0,2)=="iP")){a0.safari=function(){var b=this.rect(-99,-99,this.width+99,this.height+99).attr({stroke:"none"});
aR.setTimeout(function(){b.remove()})}}else{a0.safari=function(){}}var P=function(){this.returnValue=false
},bw=function(){return this.originalEvent.preventDefault()},a4=function(){this.cancelBubble=true
},aE=function(){return this.originalEvent.stopPropagation()},aw=(function(){if(ab.addEventListener){return function(S,E,i,e){var b=X&&br[E]?br[E]:E;
var R=function(bL){if(X&&br[ah](E)){for(var bJ=0,bK=bL.targetTouches&&bL.targetTouches.length;
bJ<bK;bJ++){if(bL.targetTouches[bJ].target==S){var bI=bL;bL=bL.targetTouches[bJ];
bL.originalEvent=bI;bL.preventDefault=bw;bL.stopPropagation=aE;break}}}return i.call(e,bL)
};S.addEventListener(b,R,false);return function(){S.removeEventListener(b,R,false);
return true}}}else{if(ab.attachEvent){return function(S,E,i,e){var R=function(bI){bI=bI||aR.event;
bI.preventDefault=bI.preventDefault||P;bI.stopPropagation=bI.stopPropagation||a4;
return i.call(e,bI)};S.attachEvent("on"+E,R);var b=function(){S.detachEvent("on"+E,R);
return true};return b}}}})(),a9=[],bs=function(bI){var bK=bI.clientX,bJ=bI.clientY,bL=ab.documentElement.scrollTop||ab.body.scrollTop,bM=ab.documentElement.scrollLeft||ab.body.scrollLeft,b,E=a9.length;
while(E--){b=a9[E];if(X){var S=bI.touches.length,R;while(S--){R=bI.touches[S];if(R.identifier==b.el._drag.id){bK=R.clientX;
bJ=R.clientY;(bI.originalEvent?bI.originalEvent:bI).preventDefault();break}}}else{bI.preventDefault()
}bK+=bM;bJ+=bL;b.move&&b.move.call(b.move_scope||b.el,bK-b.el._drag.x,bJ-b.el._drag.y,bK,bJ,bI)
}},f=function(R){aJ.unmousemove(bs).unmouseup(f);var E=a9.length,b;while(E--){b=a9[E];
b.el._drag={};b.end&&b.end.call(b.end_scope||b.start_scope||b.move_scope||b.el,R)
}a9=[]};for(var at=T[t];at--;){(function(b){aJ[b]=aV[bF][b]=function(i,e){if(aJ.is(i,"function")){this.events=this.events||[];
this.events.push({name:b,f:i,unbind:aw(this.shape||this.node||ab,b,i,e||this)})}return this
};aJ["un"+b]=aV[bF]["un"+b]=function(E){var i=this.events,e=i[t];while(e--){if(i[e].name==b&&i[e].f==E){i[e].unbind();
i.splice(e,1);!i.length&&delete this.events;return this}}return this}})(T[at])}bd.hover=function(E,b,i,e){return this.mouseover(E,i).mouseout(b,e||i)
};bd.unhover=function(e,b){return this.unmouseover(e).unmouseout(b)};bd.drag=function(e,S,R,b,i,E){this._drag={};
this.mousedown(function(bJ){(bJ.originalEvent||bJ).preventDefault();var bI=ab.documentElement.scrollTop||ab.body.scrollTop,bK=ab.documentElement.scrollLeft||ab.body.scrollLeft;
this._drag.x=bJ.clientX+bK;this._drag.y=bJ.clientY+bI;this._drag.id=bJ.identifier;
S&&S.call(i||b||this,bJ.clientX+bK,bJ.clientY+bI,bJ);!a9.length&&aJ.mousemove(bs).mouseup(f);
a9.push({el:this,move:e,end:R,move_scope:b,start_scope:i,end_scope:E})});return this
};bd.undrag=function(b,R,E){var e=a9.length;while(e--){a9[e].el==this&&(a9[e].move==b&&a9[e].end==E)&&a9.splice(e++,1)
}!a9.length&&aJ.unmousemove(bs).unmouseup(f)};a0.circle=function(b,i,e){return af(this,b||0,i||0,e||0)
};a0.rect=function(b,R,e,i,E){return bc(this,b||0,R||0,e||0,i||0,E||0)};a0.ellipse=function(b,E,i,e){return aA(this,b||0,E||0,i||0,e||0)
};a0.path=function(b){b&&!aJ.is(b,ag)&&!aJ.is(b[0],a8)&&(b+=aQ);return y(aJ.format[bC](aJ,arguments),this)
};a0.image=function(E,b,R,e,i){return w(this,E||"about:blank",b||0,R||0,e||0,i||0)
};a0.text=function(b,i,e){return al(this,b||0,i||0,bD(e))};a0.set=function(b){arguments[t]>1&&(b=Array[bF].splice.call(arguments,0,arguments[t]));
return new ai(b)};a0.setSize=bB;a0.top=a0.bottom=null;a0.raphael=aJ;function D(){return this.x+aI+this.y
}bd.resetScale=function(){if(this.removed){return this}this._.sx=1;this._.sy=1;this.attrs.scale="1 1"
};bd.scale=function(b1,b0,bS,bQ){if(this.removed){return this}if(b1==null&&b0==null){return{x:this._.sx,y:this._.sy,toString:D}
}b0=b0||b1;!+b0&&(b0=b1);var e,b,b9,b8,cc=this.attrs;if(b1!=0){var cd=this.getBBox(),R=cd.x+cd.width/2,E=cd.y+cd.height/2,b6=ar(b1/this._.sx),b5=ar(b0/this._.sy);
bS=(+bS||bS==0)?bS:R;bQ=(+bQ||bQ==0)?bQ:E;var bL=this._.sx>0,bK=this._.sy>0,bR=~~(b1/ar(b1)),bP=~~(b0/ar(b0)),bI=b6*bR,S=b5*bP,b2=this.node.style,bZ=bS+ar(R-bS)*bI*(R>bS==bL?1:-1),bY=bQ+ar(E-bQ)*S*(E>bQ==bK?1:-1),bV=(b1*bR>b0*bP?b5:b6);
switch(this.type){case"rect":case"image":var bN=cc.width*b6,bW=cc.height*b5;this.attr({height:bW,r:cc.r*bV,width:bN,x:bZ-bN/2,y:bY-bW/2});
break;case"circle":case"ellipse":this.attr({rx:cc.rx*b6,ry:cc.ry*b5,r:cc.r*bV,cx:bZ,cy:bY});
break;case"text":this.attr({x:bZ,y:bY});break;case"path":var b4=av(cc.path),bM=true,bU=bL?bI:b6,bT=bK?S:b5;
for(var cb=0,bX=b4[t];cb<bX;cb++){var b7=b4[cb],bO=bp.call(b7[0]);if(bO=="M"&&bM){continue
}else{bM=false}if(bO=="A"){b7[b4[cb][t]-2]*=bU;b7[b4[cb][t]-1]*=bT;b7[1]*=b6;b7[2]*=b5;
b7[5]=+(bR+bP?!!+b7[5]:!+b7[5])}else{if(bO=="H"){for(var ca=1,bJ=b7[t];ca<bJ;ca++){b7[ca]*=bU
}}else{if(bO=="V"){for(ca=1,bJ=b7[t];ca<bJ;ca++){b7[ca]*=bT}}else{for(ca=1,bJ=b7[t];
ca<bJ;ca++){b7[ca]*=(ca%2)?bU:bT}}}}}var b3=aj(b4);e=bZ-b3.x-b3.width/2;b=bY-b3.y-b3.height/2;
b4[0][1]+=e;b4[0][2]+=b;this.attr({path:b4});break}if(this.type in {text:1,image:1}&&(bR!=1||bP!=1)){if(this.transformations){this.transformations[2]="scale("[bx](bR,",",bP,")");
this.node[F]("transform",this.transformations[aX](aI));e=(bR==-1)?-cc.x-(bN||0):cc.x;
b=(bP==-1)?-cc.y-(bW||0):cc.y;this.attr({x:e,y:b});cc.fx=bR-1;cc.fy=bP-1}else{this.node.filterMatrix=a6+".Matrix(M11="[bx](bR,", M12=0, M21=0, M22=",bP,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
b2.filter=(this.node.filterMatrix||aQ)+(this.node.filterOpacity||aQ)}}else{if(this.transformations){this.transformations[2]=aQ;
this.node[F]("transform",this.transformations[aX](aI));cc.fx=0;cc.fy=0}else{this.node.filterMatrix=aQ;
b2.filter=(this.node.filterMatrix||aQ)+(this.node.filterOpacity||aQ)}}cc.scale=[b1,b0,bS,bQ][aX](aI);
this._.sx=b1;this._.sy=b0}return this};bd.clone=function(){if(this.removed){return null
}var b=this.attr();delete b.scale;delete b.translation;return this.paper[this.type]().attr(b)
};var a3={},l=function(S,e,bL,bK,bT,bS,bR,bP,bI){var bO=0,bN=100,R=[S,e,bL,bK,bT,bS,bR,bP].join(),b=a3[R],bJ,E;
!b&&(a3[R]=b={data:[]});b.timer&&clearTimeout(b.timer);b.timer=setTimeout(function(){delete a3[R]
},2000);if(bI!=null){var bQ=l(S,e,bL,bK,bT,bS,bR,bP);bN=~~bQ*10}for(var bM=0;bM<bN+1;
bM++){if(b.data[bI]>bM){E=b.data[bM*bN]}else{E=aJ.findDotsAtSegment(S,e,bL,bK,bT,bS,bR,bP,bM/bN);
b.data[bM]=E}bM&&(bO+=bm(bm(bJ.x-E.x,2)+bm(bJ.y-E.y,2),0.5));if(bI!=null&&bO>=bI){return E
}bJ=E}if(bI==null){return bO}},a2=function(b,e){return function(bR,S,bI){bR=W(bR);
var bN,bM,E,bJ,R="",bQ={},bO,bL=0;for(var bK=0,bP=bR.length;bK<bP;bK++){E=bR[bK];
if(E[0]=="M"){bN=+E[1];bM=+E[2]}else{bJ=l(bN,bM,E[1],E[2],E[3],E[4],E[5],E[6]);if(bL+bJ>S){if(e&&!bQ.start){bO=l(bN,bM,E[1],E[2],E[3],E[4],E[5],E[6],S-bL);
R+=["C",bO.start.x,bO.start.y,bO.m.x,bO.m.y,bO.x,bO.y];if(bI){return R}bQ.start=R;
R=["M",bO.x,bO.y+"C",bO.n.x,bO.n.y,bO.end.x,bO.end.y,E[5],E[6]][aX]();bL+=bJ;bN=+E[5];
bM=+E[6];continue}if(!b&&!e){bO=l(bN,bM,E[1],E[2],E[3],E[4],E[5],E[6],S-bL);return{x:bO.x,y:bO.y,alpha:bO.alpha}
}}bL+=bJ;bN=+E[5];bM=+E[6]}R+=E}bQ.end=R;bO=b?bL:e?bQ:aJ.findDotsAtSegment(bN,bM,E[1],E[2],E[3],E[4],E[5],E[6],1);
bO.alpha&&(bO={x:bO.x,y:bO.y,alpha:bO.alpha});return bO}};var aL=a2(1),M=a2(),Z=a2(0,1);
bd.getTotalLength=function(){if(this.type!="path"){return}if(this.node.getTotalLength){return this.node.getTotalLength()
}return aL(this.attrs.path)};bd.getPointAtLength=function(b){if(this.type!="path"){return
}return M(this.attrs.path,b)};bd.getSubpath=function(i,e){if(this.type!="path"){return
}if(ar(this.getTotalLength()-e)<"1e-6"){return Z(this.attrs.path,i).end}var b=Z(this.attrs.path,e,1);
return i?Z(b,i).end:b};aJ.easing_formulas={linear:function(b){return b},"<":function(b){return bm(b,3)
},">":function(b){return bm(b-1,3)+1},"<>":function(b){b=b*2;if(b<1){return bm(b,3)/2
}b-=2;return(bm(b,3)+2)/2},backIn:function(e){var b=1.70158;return e*e*((b+1)*e-b)
},backOut:function(e){e=e-1;var b=1.70158;return e*e*((b+1)*e+b)+1},elastic:function(i){if(i==0||i==1){return i
}var e=0.3,b=e/4;return bm(2,-10*i)*ap.sin((i-b)*(2*aN)/e)+1},bounce:function(E){var e=7.5625,i=2.75,b;
if(E<(1/i)){b=e*E*E}else{if(E<(2/i)){E-=(1.5/i);b=e*E*E+0.75}else{if(E<(2.5/i)){E-=(2.25/i);
b=e*E*E+0.9375}else{E-=(2.625/i);b=e*E*E+0.984375}}}return b}};var Y=[],bv=function(){var bK=+new Date;
for(var bV=0;bV<Y[t];bV++){var b0=Y[bV];if(b0.stop||b0.el.removed){continue}var S=bK-b0.start,bS=b0.ms,bR=b0.easing,bW=b0.from,bP=b0.diff,E=b0.to,bO=b0.t,bJ=b0.el,bQ={},b;
if(S<bS){var R=bR(S/bS);for(var bT in bW){if(bW[ah](bT)){switch(an[bT]){case"along":b=R*bS*bP[bT];
E.back&&(b=E.len-b);var bU=M(E[bT],b);bJ.translate(bP.sx-bP.x||0,bP.sy-bP.y||0);bP.x=bU.x;
bP.y=bU.y;bJ.translate(bU.x-bP.sx,bU.y-bP.sy);E.rot&&bJ.rotate(bP.r+bU.alpha,bU.x,bU.y);
break;case aG:b=+bW[bT]+R*bS*bP[bT];break;case"colour":b="rgb("+[L(ae(bW[bT].r+R*bS*bP[bT].r)),L(ae(bW[bT].g+R*bS*bP[bT].g)),L(ae(bW[bT].b+R*bS*bP[bT].b))][aX](",")+")";
break;case"path":b=[];for(var bY=0,bN=bW[bT][t];bY<bN;bY++){b[bY]=[bW[bT][bY][0]];
for(var bX=1,bZ=bW[bT][bY][t];bX<bZ;bX++){b[bY][bX]=+bW[bT][bY][bX]+R*bS*bP[bT][bY][bX]
}b[bY]=b[bY][aX](aI)}b=b[aX](aI);break;case"csv":switch(bT){case"translation":var bM=R*bS*bP[bT][0]-bO.x,bL=R*bS*bP[bT][1]-bO.y;
bO.x+=bM;bO.y+=bL;b=bM+aI+bL;break;case"rotation":b=+bW[bT][0]+R*bS*bP[bT][0];bW[bT][1]&&(b+=","+bW[bT][1]+","+bW[bT][2]);
break;case"scale":b=[+bW[bT][0]+R*bS*bP[bT][0],+bW[bT][1]+R*bS*bP[bT][1],(2 in E[bT]?E[bT][2]:aQ),(3 in E[bT]?E[bT][3]:aQ)][aX](aI);
break;case"clip-rect":b=[];bY=4;while(bY--){b[bY]=+bW[bT][bY]+R*bS*bP[bT][bY]}break
}break;default:var bI=[].concat(bW[bT]);b=[];bY=bJ.paper.customAttributes[bT].length;
while(bY--){b[bY]=+bI[bY]+R*bS*bP[bT][bY]}break}bQ[bT]=b}}bJ.attr(bQ);bJ._run&&bJ._run.call(bJ)
}else{if(E.along){bU=M(E.along,E.len*!E.back);bJ.translate(bP.sx-(bP.x||0)+bU.x-bP.sx,bP.sy-(bP.y||0)+bU.y-bP.sy);
E.rot&&bJ.rotate(bP.r+bU.alpha,bU.x,bU.y)}(bO.x||bO.y)&&bJ.translate(-bO.x,-bO.y);
E.scale&&(E.scale+=aQ);bJ.attr(E);Y.splice(bV--,1)}}aJ.svg&&bJ&&bJ.paper&&bJ.paper.safari();
Y[t]&&setTimeout(bv)},bz=function(b,i,S,R,E){var e=S-R;i.timeouts.push(setTimeout(function(){aJ.is(E,"function")&&E.call(i);
i.animate(b,e,b.easing)},R))},L=function(b){return m(bj(b,255),0)},B=function(b,i){if(b==null){return{x:this._.tx,y:this._.ty,toString:D}
}this._.tx+=+b;this._.ty+=+i;switch(this.type){case"circle":case"ellipse":this.attr({cx:+b+this.attrs.cx,cy:+i+this.attrs.cy});
break;case"rect":case"image":case"text":this.attr({x:+b+this.attrs.x,y:+i+this.attrs.y});
break;case"path":var e=av(this.attrs.path);e[0][1]+=+b;e[0][2]+=+i;this.attr({path:e});
break}return this};bd.animateWith=function(E,S,b,bJ,bI){for(var e=0,R=Y.length;e<R;
e++){if(Y[e].el.id==E.id){S.start=Y[e].start}}return this.animate(S,b,bJ,bI)};bd.animateAlong=aW();
bd.animateAlongBack=aW(1);function aW(b){return function(E,i,e,S){var R={back:b};
aJ.is(e,"function")?(S=e):(R.rot=e);E&&E.constructor==aV&&(E=E.attrs.path);E&&(R.along=E);
return this.animate(R,i,S)}}function aZ(bP,E,e,bO,bN,bJ){var bK=3*E,bM=3*(bO-E)-bK,b=1-bK-bM,bI=3*e,bL=3*(bN-e)-bI,bQ=1-bI-bL;
function S(bR){return((b*bR+bM)*bR+bK)*bR}function i(bR,bT){var bS=R(bR,bT);return((bQ*bS+bL)*bS+bI)*bS
}function R(bR,bY){var bX,bW,bU,bS,bV,bT;for(bU=bR,bT=0;bT<8;bT++){bS=S(bU)-bR;if(ar(bS)<bY){return bU
}bV=(3*b*bU+2*bM)*bU+bK;if(ar(bV)<0.000001){break}bU=bU-bS/bV}bX=0;bW=1;bU=bR;if(bU<bX){return bX
}if(bU>bW){return bW}while(bX<bW){bS=S(bU);if(ar(bS-bR)<bY){return bU}if(bR>bS){bX=bU
}else{bW=bU}bU=(bW-bX)/2+bX}return bU}return i(bP,1/(200*bJ))}bd.onAnimation=function(b){this._run=b||0;
return this};bd.animate=function(b2,bS,bR,S){var e=this;e.timeouts=e.timeouts||[];
if(aJ.is(bR,"function")||!bR){S=bR||null}if(e.removed){S&&S.call(e);return e}var bW={},E={},bI=false,bN={};
for(var bT in b2){if(b2[ah](bT)){if(an[ah](bT)||e.paper.customAttributes[ah](bT)){bI=true;
bW[bT]=e.attr(bT);(bW[bT]==null)&&(bW[bT]=q[bT]);E[bT]=b2[bT];switch(an[bT]){case"along":var b0=aL(b2[bT]);
var bU=M(b2[bT],b0*!!b2.back);var bJ=e.getBBox();bN[bT]=b0/bS;bN.tx=bJ.x;bN.ty=bJ.y;
bN.sx=bU.x;bN.sy=bU.y;E.rot=b2.rot;E.back=b2.back;E.len=b0;b2.rot&&(bN.r=ak(e.rotate())||0);
break;case aG:bN[bT]=(E[bT]-bW[bT])/bS;break;case"colour":bW[bT]=aJ.getRGB(bW[bT]);
var bV=aJ.getRGB(E[bT]);bN[bT]={r:(bV.r-bW[bT].r)/bS,g:(bV.g-bW[bT].g)/bS,b:(bV.b-bW[bT].b)/bS};
break;case"path":var bK=W(bW[bT],E[bT]);bW[bT]=bK[0];var bP=bK[1];bN[bT]=[];for(var bZ=0,bM=bW[bT][t];
bZ<bM;bZ++){bN[bT][bZ]=[0];for(var bY=1,b1=bW[bT][bZ][t];bY<b1;bY++){bN[bT][bZ][bY]=(bP[bZ][bY]-bW[bT][bZ][bY])/bS
}}break;case"csv":var b=bD(b2[bT])[J](a),bL=bD(bW[bT])[J](a);switch(bT){case"translation":bW[bT]=[0,0];
bN[bT]=[b[0]/bS,b[1]/bS];break;case"rotation":bW[bT]=(bL[1]==b[1]&&bL[2]==b[2])?bL:[0,b[1],b[2]];
bN[bT]=[(b[0]-bW[bT][0])/bS,0,0];break;case"scale":b2[bT]=b;bW[bT]=bD(bW[bT])[J](a);
bN[bT]=[(b[0]-bW[bT][0])/bS,(b[1]-bW[bT][1])/bS,0,0];break;case"clip-rect":bW[bT]=bD(bW[bT])[J](a);
bN[bT]=[];bZ=4;while(bZ--){bN[bT][bZ]=(b[bZ]-bW[bT][bZ])/bS}break}E[bT]=b;break;default:b=[].concat(b2[bT]);
bL=[].concat(bW[bT]);bN[bT]=[];bZ=e.paper.customAttributes[bT][t];while(bZ--){bN[bT][bZ]=((b[bZ]||0)-(bL[bZ]||0))/bS
}break}}}}if(!bI){var bQ=[],R;for(var b3 in b2){if(b2[ah](b3)&&bg.test(b3)){bT={value:b2[b3]};
b3=="from"&&(b3=0);b3=="to"&&(b3=100);bT.key=U(b3,10);bQ.push(bT)}}bQ.sort(bn);if(bQ[0].key){bQ.unshift({key:0,value:e.attrs})
}for(bZ=0,bM=bQ[t];bZ<bM;bZ++){bz(bQ[bZ].value,e,bS/100*bQ[bZ].key,bS/100*(bQ[bZ-1]&&bQ[bZ-1].key||0),bQ[bZ-1]&&bQ[bZ-1].value.callback)
}R=bQ[bQ[t]-1].value.callback;if(R){e.timeouts.push(setTimeout(function(){R.call(e)
},bS))}}else{var bX=aJ.easing_formulas[bR];if(!bX){bX=bD(bR).match(c);if(bX&&bX[t]==5){var bO=bX;
bX=function(i){return aZ(i,+bO[1],+bO[2],+bO[3],+bO[4],bS)}}else{bX=function(i){return i
}}}Y.push({start:b2.start||+new Date,ms:bS,easing:bX,from:bW,diff:bN,to:E,el:e,t:{x:0,y:0}});
aJ.is(S,"function")&&(e._ac=setTimeout(function(){S.call(e)},bS));Y[t]==1&&setTimeout(bv)
}return this};bd.stop=function(){for(var b=0;b<Y.length;b++){Y[b].el.id==this.id&&Y.splice(b--,1)
}for(b=0,ii=this.timeouts&&this.timeouts.length;b<ii;b++){clearTimeout(this.timeouts[b])
}this.timeouts=[];clearTimeout(this._ac);delete this._ac;return this};bd.translate=function(b,e){return this.attr({translation:b+" "+e})
};bd[a1]=function(){return"Rapha\xebl\u2019s object"};aJ.ae=Y;var ai=function(b){this.items=[];
this[t]=0;this.type="set";if(b){for(var e=0,E=b[t];e<E;e++){if(b[e]&&(b[e].constructor==aV||b[e].constructor==ai)){this[this.items[t]]=this.items[this.items[t]]=b[e];
this[t]++}}}};ai[bF][k]=function(){var R,b;for(var e=0,E=arguments[t];e<E;e++){R=arguments[e];
if(R&&(R.constructor==aV||R.constructor==ai)){b=this.items[t];this[b]=this.items[b]=R;
this[t]++}}return this};ai[bF].pop=function(){delete this[this[t]--];return this.items.pop()
};for(var I in bd){if(bd[ah](I)){ai[bF][I]=(function(b){return function(){for(var e=0,E=this.items[t];
e<E;e++){this.items[e][b][bC](this.items[e],arguments)}return this}})(I)}}ai[bF].attr=function(e,bI){if(e&&aJ.is(e,a8)&&aJ.is(e[0],"object")){for(var b=0,S=e[t];
b<S;b++){this.items[b].attr(e[b])}}else{for(var E=0,R=this.items[t];E<R;E++){this.items[E].attr(e,bI)
}}return this};ai[bF].animate=function(e,b,bI,bK){(aJ.is(bI,"function")||!bI)&&(bK=bI||null);
var S=this.items[t],E=S,bL,bJ=this,R;bK&&(R=function(){!--S&&bK.call(bJ)});bI=aJ.is(bI,ag)?bI:R;
bL=this.items[--E].animate(e,b,bI,R);while(E--){this.items[E]&&!this.items[E].removed&&this.items[E].animateWith(bL,e,b,bI,R)
}return this};ai[bF].insertAfter=function(e){var b=this.items[t];while(b--){this.items[b].insertAfter(e)
}return this};ai[bF].getBBox=function(){var b=[],bI=[],e=[],R=[];for(var E=this.items[t];
E--;){var S=this.items[E].getBBox();b[k](S.x);bI[k](S.y);e[k](S.x+S.width);R[k](S.y+S.height)
}b=bj[bC](0,b);bI=bj[bC](0,bI);return{x:b,y:bI,width:m[bC](0,e)-b,height:m[bC](0,R)-bI}
};ai[bF].clone=function(E){E=new ai;for(var b=0,e=this.items[t];b<e;b++){E[k](this.items[b].clone())
}return E};aJ.registerFont=function(e){if(!e.face){return e}this.fonts=this.fonts||{};
var E={w:e.w,face:{},glyphs:{}},i=e.face["font-family"];for(var bI in e.face){if(e.face[ah](bI)){E.face[bI]=e.face[bI]
}}if(this.fonts[i]){this.fonts[i][k](E)}else{this.fonts[i]=[E]}if(!e.svg){E.face["units-per-em"]=U(e.face["units-per-em"],10);
for(var R in e.glyphs){if(e.glyphs[ah](R)){var S=e.glyphs[R];E.glyphs[R]={w:S.w,k:{},d:S.d&&"M"+S.d[bt](/[mlcxtrv]/g,function(bJ){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[bJ]||"M"
})+"z"};if(S.k){for(var b in S.k){if(S[ah](b)){E.glyphs[R].k[b]=S.k[b]}}}}}}return e
};a0.getFont=function(bK,bL,e,R){R=R||"normal";e=e||"normal";bL=+bL||{normal:400,bold:700,lighter:300,bolder:800}[bL]||400;
if(!aJ.fonts){return}var S=aJ.fonts[bK];if(!S){var E=new RegExp("(^|\\s)"+bK[bt](/[^\w\d\s+!~.:_-]/g,aQ)+"(\\s|$)","i");
for(var b in aJ.fonts){if(aJ.fonts[ah](b)){if(E.test(b)){S=aJ.fonts[b];break}}}}var bI;
if(S){for(var bJ=0,bM=S[t];bJ<bM;bJ++){bI=S[bJ];if(bI.face["font-weight"]==bL&&(bI.face["font-style"]==e||!bI.face["font-style"])&&bI.face["font-stretch"]==R){break
}}}return bI};a0.print=function(S,R,b,bK,bL,bU,e){bU=bU||"middle";e=m(bj(e||0,1),-1);
var bQ=this.set(),bT=bD(b)[J](aQ),bR=0,bO=aQ,bV;aJ.is(bK,b)&&(bK=this.getFont(bK));
if(bK){bV=(bL||16)/bK.face["units-per-em"];var E=bK.face.bbox.split(a),bJ=+E[0],bM=+E[1]+(bU=="baseline"?E[3]-E[1]+(+bK.face.descent):(E[3]-E[1])/2);
for(var bP=0,bI=bT[t];bP<bI;bP++){var bN=bP&&bK.glyphs[bT[bP-1]]||{},bS=bK.glyphs[bT[bP]];
bR+=bP?(bN.w||bK.w)+(bN.k&&bN.k[bT[bP]]||0)+(bK.w*e):0;bS&&bS.d&&bQ[k](this.path(bS.d).attr({fill:"#000",stroke:"none",translation:[bR,0]}))
}bQ.scale(bV,bV,bJ,bM).translate(S-bJ,R-bM)}return bQ};aJ.format=function(e,i){var b=aJ.is(i,a8)?[0][bx](i):arguments;
e&&aJ.is(e,ag)&&b[t]-1&&(e=e[bt](bo,function(R,E){return b[++E]==null?aQ:b[E]}));
return e||aQ};aJ.ninja=function(){s.was?(aR.Raphael=s.is):delete Raphael;return aJ
};aJ.el=bd;aJ.st=ai[bF];s.was?(aR.Raphael=aJ):(Raphael=aJ)})();(function(){var _jQuery=window.jQuery,_$=window.$;
var jQuery=window.jQuery=window.$=function(selector,context){return new jQuery.fn.init(selector,context)
};var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/,isSimple=/^.[^:#\[\.]*$/,undefined;
jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;
if(selector.nodeType){this[0]=selector;this.length=1;return this}if(typeof selector=="string"){var match=quickExpr.exec(selector);
if(match&&(match[1]||!context)){if(match[1]){selector=jQuery.clean([match[1]],context)
}else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3]){return jQuery().find(selector)
}return jQuery(elem)}selector=[]}}else{return jQuery(context).find(selector)}}else{if(jQuery.isFunction(selector)){return jQuery(document)[jQuery.fn.ready?"ready":"load"](selector)
}}return this.setArray(jQuery.makeArray(selector))},jquery:"1.2.6",size:function(){return this.length
},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num]
},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret},setArray:function(elems){this.length=0;
Array.prototype.push.apply(this,elems);return this},each:function(callback,args){return jQuery.each(this,callback,args)
},index:function(elem){var ret=-1;return jQuery.inArray(elem&&elem.jquery?elem[0]:elem,this)
},attr:function(name,value,type){var options=name;if(name.constructor==String){if(value===undefined){return this[0]&&jQuery[type||"attr"](this[0],name)
}else{options={};options[name]=value}}return this.each(function(i){for(name in options){jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name))
}})},css:function(key,value){if((key=="width"||key=="height")&&parseFloat(value)<0){value=undefined
}return this.attr(key,value,"curCSS")},text:function(text){if(typeof text!="object"&&text!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text))
}var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8){ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this])
}})});return ret},wrapAll:function(html){if(this[0]){jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;
while(elem.firstChild){elem=elem.firstChild}return elem}).append(this)}return this
},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html)
})},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html)})},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1){this.appendChild(elem)
}})},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1){this.insertBefore(elem,this.firstChild)
}})},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this)
})},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)
})},end:function(){return this.prevObject||jQuery([])},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem)
});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems)
},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");
container.appendChild(clone);return jQuery.clean([container.innerHTML])[0]}else{return this.cloneNode(true)
}});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined){this[expando]=null
}});if(events===true){this.find("*").andSelf().each(function(i){if(this.nodeType==3){return
}var events=jQuery.data(this,"events");for(var type in events){for(var handler in events[type]){jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data)
}}})}return ret},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i)
})||jQuery.multiFilter(selector,this))},not:function(selector){if(selector.constructor==String){if(isSimple.test(selector)){return this.pushStack(jQuery.multiFilter(selector,this,true))
}else{selector=jQuery.multiFilter(selector,this)}}var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;
return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector
})},add:function(selector){return this.pushStack(jQuery.unique(jQuery.merge(this.get(),typeof selector=="string"?jQuery(selector):jQuery.makeArray(selector))))
},is:function(selector){return !!selector&&jQuery.multiFilter(selector,this).length>0
},hasClass:function(selector){return this.is("."+selector)},val:function(value){if(value==undefined){if(this.length){var elem=this[0];
if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";
if(index<0){return null}for(var i=one?index:0,max=one?index+1:options.length;i<max;
i++){var option=options[i];if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;
if(one){return value}values.push(value)}}return values}else{return(this[0].value||"").replace(/\r/g,"")
}}return undefined}if(value.constructor==Number){value+=""}return this.each(function(){if(this.nodeType!=1){return
}if(value.constructor==Array&&/radio|checkbox/.test(this.type)){this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0)
}else{if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(value);jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0)
});if(!values.length){this.selectedIndex=-1}}else{this.value=value}}})},html:function(value){return value==undefined?(this[0]?this[0].innerHTML:null):this.empty().append(value)
},replaceWith:function(value){return this.after(value).remove()},eq:function(i){return this.slice(i,i+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))
},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)
}))},andSelf:function(){return this.add(this.prevObject)},data:function(key,value){var parts=key.split(".");
parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);
if(data===undefined&&this.length){data=jQuery.data(this[0],key)}return data===undefined&&parts[1]?this.data(parts[0]):data
}else{return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value)
})}},removeData:function(key){return this.each(function(){jQuery.removeData(this,key)
})},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;
return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);
if(reverse){elems.reverse()}}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr")){obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"))
}var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;
if(jQuery.nodeName(elem,"script")){scripts=scripts.add(elem)}else{if(elem.nodeType==1){scripts=scripts.add(jQuery("script",elem).remove())
}callback.call(obj,elem)}});scripts.each(evalScript)})}};jQuery.fn.init.prototype=jQuery.fn;
function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"})
}else{jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"")}if(elem.parentNode){elem.parentNode.removeChild(elem)
}}function now(){return +new Date}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;
if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2}if(typeof target!="object"&&typeof target!="function"){target={}
}if(length==i){target=this;--i}for(;i<length;i++){if((options=arguments[i])!=null){for(var name in options){var src=target[name],copy=options[name];
if(target===copy){continue}if(deep&&copy&&typeof copy=="object"&&!copy.nodeType){target[name]=jQuery.extend(deep,src||(copy.length!=null?[]:{}),copy)
}else{if(copy!==undefined){target[name]=copy}}}}}return target};var expando="jQuery"+now(),uuid=0,windowData={},exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i,defaultView=document.defaultView||{};
jQuery.extend({noConflict:function(deep){window.$=_$;if(deep){window.jQuery=_jQuery
}return jQuery},isFunction:function(fn){return !!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/^[\s[]?function/.test(fn+"")
},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body
},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");
script.type="text/javascript";if(jQuery.browser.msie){script.text=data}else{script.appendChild(document.createTextNode(data))
}head.insertBefore(script,head.firstChild);head.removeChild(script)}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase()
},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];
if(!id){id=elem[expando]=++uuid}if(name&&!jQuery.cache[id]){jQuery.cache[id]={}}if(data!==undefined){jQuery.cache[id][name]=data
}return name?jQuery.cache[id][name]:id},removeData:function(elem,name){elem=elem==window?windowData:elem;
var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];
name="";for(name in jQuery.cache[id]){break}if(!name){jQuery.removeData(elem)}}}else{try{delete elem[expando]
}catch(e){if(elem.removeAttribute){elem.removeAttribute(expando)}}delete jQuery.cache[id]
}},each:function(object,callback,args){var name,i=0,length=object.length;if(args){if(length==undefined){for(name in object){if(callback.apply(object[name],args)===false){break
}}}else{for(;i<length;){if(callback.apply(object[i++],args)===false){break}}}}else{if(length==undefined){for(name in object){if(callback.call(object[name],name,object[name])===false){break
}}}else{for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}}return object
},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value)){value=value.call(elem,i)
}return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value
},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className)){elem.className+=(elem.className?" ":"")+className
}})},remove:function(elem,classNames){if(elem.nodeType==1){elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return !jQuery.className.has(classNames,className)
}).join(" "):""}},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1
}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];
elem.style[name]=options[name]}callback.call(elem);for(var name in options){elem.style[name]=old[name]
}},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];
function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;
jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;
border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0});val-=Math.round(padding+border)
}if(jQuery(elem).is(":visible")){getWH()}else{jQuery.swap(elem,props,getWH)}return Math.max(0,val)
}return jQuery.curCSS(elem,name,force)},curCSS:function(elem,name,force){var ret,style=elem.style;
function color(elem){if(!jQuery.browser.safari){return false}var ret=defaultView.getComputedStyle(elem,null);
return !ret||ret.getPropertyValue("color")==""}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(style,"opacity");
return ret==""?"1":ret}if(jQuery.browser.opera&&name=="display"){var save=style.outline;
style.outline="0 solid black";style.outline=save}if(name.match(/float/i)){name=styleFloat
}if(!force&&style&&style[name]){ret=style[name]}else{if(defaultView.getComputedStyle){if(name.match(/float/i)){name="float"
}name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var computedStyle=defaultView.getComputedStyle(elem,null);
if(computedStyle&&!color(elem)){ret=computedStyle.getPropertyValue(name)}else{var swap=[],stack=[],a=elem,i=0;
for(;a&&color(a);a=a.parentNode){stack.unshift(a)}for(;i<stack.length;i++){if(color(stack[i])){swap[i]=stack[i].style.display;
stack[i].style.display="block"}}ret=name=="display"&&swap[stack.length-1]!=null?"none":(computedStyle&&computedStyle.getPropertyValue(name))||"";
for(i=0;i<swap.length;i++){if(swap[i]!=null){stack[i].style.display=swap[i]}}}if(name=="opacity"&&ret==""){ret="1"
}}else{if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase()
});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var left=style.left,rsLeft=elem.runtimeStyle.left;
elem.runtimeStyle.left=elem.currentStyle.left;style.left=ret||0;ret=style.pixelLeft+"px";
style.left=left;elem.runtimeStyle.left=rsLeft}}}}return ret},clean:function(elems,context){var ret=[];
context=context||document;if(typeof context.createElement=="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document
}jQuery.each(elems,function(i,elem){if(!elem){return}if(elem.constructor==Number){elem+=""
}if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">"
});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];
div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--){div=div.lastChild}if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];
for(var j=tbody.length-1;j>=0;--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])
}}if(/^\s/.test(elem)){div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild)
}}elem=jQuery.makeArray(div.childNodes)}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select"))){return
}if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options){ret.push(elem)
}else{ret=jQuery.merge(ret,elem)}});return ret},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8){return undefined
}var notxml=!jQuery.isXMLDoc(elem),set=value!==undefined,msie=jQuery.browser.msie;
name=notxml&&jQuery.props[name]||name;if(elem.tagName){var special=/href|src|style/.test(name);
if(name=="selected"&&jQuery.browser.safari){elem.parentNode.selectedIndex}if(name in elem&&notxml&&!special){if(set){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode){throw"type property can't be changed"
}elem[name]=value}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name)){return elem.getAttributeNode(name).nodeValue
}return elem[name]}if(msie&&notxml&&name=="style"){return jQuery.attr(elem.style,"cssText",value)
}if(set){elem.setAttribute(name,""+value)}var attr=msie&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);
return attr===null?undefined:attr}if(msie&&name=="opacity"){if(set){elem.zoom=1;elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(value)+""=="NaN"?"":"alpha(opacity="+value*100+")")
}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100)+"":""
}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase()});
if(set){elem[name]=value}return elem[name]},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"")
},makeArray:function(array){var ret=[];if(array!=null){var i=array.length;if(i==null||array.split||array.setInterval||array.call){ret[0]=array
}else{while(i){ret[--i]=array[i]}}}return ret},inArray:function(elem,array){for(var i=0,length=array.length;
i<length;i++){if(array[i]===elem){return i}}return -1},merge:function(first,second){var i=0,elem,pos=first.length;
if(jQuery.browser.msie){while(elem=second[i++]){if(elem.nodeType!=8){first[pos++]=elem
}}}else{while(elem=second[i++]){first[pos++]=elem}}return first},unique:function(array){var ret=[],done={};
try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;
ret.push(array[i])}}}catch(e){ret=array}return ret},grep:function(elems,callback,inv){var ret=[];
for(var i=0,length=elems.length;i<length;i++){if(!inv!=!callback(elems[i],i)){ret.push(elems[i])
}}return ret},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;
i<length;i++){var value=callback(elems[i],i);if(value!=null){ret[ret.length]=value
}}return ret.concat.apply([],ret)}});var userAgent=navigator.userAgent.toLowerCase();
jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};
var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing"}});
jQuery.each({parent:function(elem){return elem.parentNode},parents:function(elem){return jQuery.dir(elem,"parentNode")
},next:function(elem){return jQuery.nth(elem,2,"nextSibling")},prev:function(elem){return jQuery.nth(elem,2,"previousSibling")
},nextAll:function(elem){return jQuery.dir(elem,"nextSibling")},prevAll:function(elem){return jQuery.dir(elem,"previousSibling")
},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem)},children:function(elem){return jQuery.sibling(elem.firstChild)
},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)
}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);
if(selector&&typeof selector=="string"){ret=jQuery.multiFilter(selector,ret)}return this.pushStack(jQuery.unique(ret))
}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;
return this.each(function(){for(var i=0,length=args.length;i<length;i++){jQuery(args[i])[original](this)
}})}});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1){this.removeAttribute(name)
}},addClass:function(classNames){jQuery.className.add(this,classNames)},removeClass:function(classNames){jQuery.className.remove(this,classNames)
},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames)
},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);
jQuery.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){jQuery(">*",this).remove();
while(this.firstChild){this.removeChild(this.firstChild)}}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments)
}});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px")
}});function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0
}var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");
jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2])
},"#":function(a,i,m){return a.getAttribute("id")==m[2]},":":{lt:function(a,i,m){return i<m[3]-0
},gt:function(a,i,m){return i>m[3]-0},nth:function(a,i,m){return m[3]-0==i},eq:function(a,i,m){return m[3]-0==i
},first:function(a,i){return i==0},last:function(a,i,m,r){return i==r.length-1},even:function(a,i){return i%2==0
},odd:function(a,i){return i%2},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a
},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a
},"only-child":function(a){return !jQuery.nth(a.parentNode.lastChild,2,"previousSibling")
},parent:function(a){return a.firstChild},empty:function(a){return !a.firstChild},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0
},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"
},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"
},enabled:function(a){return !a.disabled},disabled:function(a){return a.disabled},checked:function(a){return a.checked
},selected:function(a){return a.selected||jQuery.attr(a,"selected")},text:function(a){return"text"==a.type
},radio:function(a){return"radio"==a.type},checkbox:function(a){return"checkbox"==a.type
},file:function(a){return"file"==a.type},password:function(a){return"password"==a.type
},submit:function(a){return"submit"==a.type},image:function(a){return"image"==a.type
},reset:function(a){return"reset"==a.type},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button")
},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},has:function(a,i,m){return jQuery.find(m[3],a).length
},header:function(a){return/h\d/i.test(a.nodeName)},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem
}).length}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];
while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");
cur=not?elems=f.r:jQuery.merge(cur,f.r)}return cur},find:function(t,context){if(typeof t!="string"){return[t]
}if(context&&context.nodeType!=1&&context.nodeType!=9){return[]}context=context||document;
var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;t=jQuery.trim(t);
var foundToken=false,re=quickChild,m=re.exec(t);if(m){nodeName=m[1].toUpperCase();
for(var i=0;ret[i];i++){for(var c=ret[i].firstChild;c;c=c.nextSibling){if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName)){r.push(c)
}}}ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0){continue}foundToken=true}else{re=/^([>+~])\s*(\w*)/i;
if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;
j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling){if(n.nodeType==1){var id=jQuery.data(n);
if(m=="~"&&merge[id]){break}if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~"){merge[id]=true
}r.push(n)}if(m=="+"){break}}}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true
}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0]){ret.shift()}done=jQuery.merge(done,ret);
r=ret=[context];t=" "+t.substr(1,t.length)}else{var re2=quickID;var m=re2.exec(t);
if(m){m=[0,m[2],m[3],m[1]]}else{re2=quickClass;m=re2.exec(t)}m[2]=m[2].replace(/\\/g,"");
var elem=ret[ret.length-1];if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);
if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2]){oid=jQuery('[@id="'+m[2]+'"]',elem)[0]
}ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[]}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];
if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object"){tag="param"}r=jQuery.merge(r,ret[i].getElementsByTagName(tag))
}if(m[1]=="."){r=jQuery.classFilter(r,m[2])}if(m[1]=="#"){var tmp=[];for(var i=0;
r[i];i++){if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];break}}r=tmp}ret=r}t=t.replace(re2,"")
}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t)}}if(t){ret=[]
}if(ret&&context==ret[0]){ret.shift()}done=jQuery.merge(done,ret);return done},classFilter:function(r,m,not){m=" "+m+" ";
var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;
if(!not&&pass||not&&!pass){tmp.push(r[i])}}return tmp},filter:function(t,r,not){var last;
while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;p[i];i++){m=p[i].exec(t);
if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break}}if(!m){break}if(m[1]==":"&&m[2]=="not"){r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3])
}else{if(m[1]=="."){r=jQuery.classFilter(r,m[2],not)}else{if(m[1]=="["){var tmp=[],type=m[3];
for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];if(z==null||/href|src|selected/.test(m[2])){z=jQuery.attr(a,m[2])||""
}if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not){tmp.push(a)
}}r=tmp}else{if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;
for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);
if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling){if(n.nodeType==1){n.nodeIndex=c++
}}merge[id]=true}var add=false;if(first==0){if(node.nodeIndex==last){add=true}}else{if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0){add=true
}}if(add^not){tmp.push(node)}}r=tmp}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object"){fn=fn[m[2]]
}if(typeof fn=="string"){fn=eval("false||function(a,i){return "+fn+";}")}r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r)
},not)}}}}}return{r:r,t:t}},dir:function(elem,dir){var matched=[],cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1){matched.push(cur)
}cur=cur[dir]}return matched},nth:function(cur,result,dir,elem){result=result||1;
var num=0;for(;cur;cur=cur[dir]){if(cur.nodeType==1&&++num==result){break}}return cur
},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&n!=elem){r.push(n)
}}return r}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8){return
}if(jQuery.browser.msie&&elem.setInterval){elem=window}if(!handler.guid){handler.guid=this.guid++
}if(data!=undefined){var fn=handler;handler=this.proxy(fn,function(){return fn.apply(this,arguments)
});handler.data=data}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){if(typeof jQuery!="undefined"&&!jQuery.event.triggered){return jQuery.event.handle.apply(arguments.callee.elem,arguments)
}});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");
type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};
if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener){elem.addEventListener(type,handle,false)
}else{if(elem.attachEvent){elem.attachEvent("on"+type,handle)}}}}handlers[handler.guid]=handler;
jQuery.event.global[type]=true});elem=null},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8){return
}var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)==".")){for(var type in events){this.remove(elem,type+(types||""))
}}else{if(types.type){handler=types.handler;types=types.type}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");
type=parts[0];if(events[type]){if(handler){delete events[type][handler.guid]}else{for(handler in events[type]){if(!parts[1]||events[type][handler].type==parts[1]){delete events[type][handler]
}}}for(ret in events[type]){break}if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener){elem.removeEventListener(type,jQuery.data(elem,"handle"),false)
}else{if(elem.detachEvent){elem.detachEvent("on"+type,jQuery.data(elem,"handle"))
}}}ret=null;delete events[type]}}})}for(ret in events){break}if(!ret){var handle=jQuery.data(elem,"handle");
if(handle){handle.elem=null}jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle")
}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data);if(type.indexOf("!")>=0){type=type.slice(0,-1);
var exclusive=true}if(!elem){if(this.global[type]){jQuery("*").add([window,document]).trigger(type,data)
}}else{if(elem.nodeType==3||elem.nodeType==8){return undefined}var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;
if(event){data.unshift({type:type,target:elem,preventDefault:function(){},stopPropagation:function(){},timeStamp:now()});
data[0][expando]=true}data[0].type=type;if(exclusive){data[0].exclusive=true}var handle=jQuery.data(elem,"handle");
if(handle){val=handle.apply(elem,data)}if((!fn||(jQuery.nodeName(elem,"a")&&type=="click"))&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false){val=false
}if(event){data.shift()}if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));
if(ret!==undefined){val=ret}}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,"a")&&type=="click")){this.triggered=true;
try{elem[type]()}catch(e){}}this.triggered=false}return val},handle:function(event){var val,ret,namespace,all,handlers;
event=arguments[0]=jQuery.event.fix(event||window.event);namespace=event.type.split(".");
event.type=namespace[0];namespace=namespace[1];all=!namespace&&!event.exclusive;handlers=(jQuery.data(this,"events")||{})[event.type];
for(var j in handlers){var handler=handlers[j];if(all||handler.type==namespace){event.handler=handler;
event.data=handler.data;ret=handler.apply(this,arguments);if(val!==false){val=ret
}if(ret===false){event.preventDefault();event.stopPropagation()}}}return val},fix:function(event){if(event[expando]==true){return event
}var originalEvent=event;event={originalEvent:originalEvent};var props="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");
for(var i=props.length;i;i--){event[props[i]]=originalEvent[props[i]]}event[expando]=true;
event.preventDefault=function(){if(originalEvent.preventDefault){originalEvent.preventDefault()
}originalEvent.returnValue=false};event.stopPropagation=function(){if(originalEvent.stopPropagation){originalEvent.stopPropagation()
}originalEvent.cancelBubble=true};event.timeStamp=event.timeStamp||now();if(!event.target){event.target=event.srcElement||document
}if(event.target.nodeType==3){event.target=event.target.parentNode}if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement
}if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;
event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);
event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0)
}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode)){event.which=event.charCode||event.keyCode
}if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey}if(!event.which&&event.button){event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)))
}return event},proxy:function(fn,proxy){proxy.guid=fn.guid=fn.guid||proxy.guid||this.guid++;
return proxy},special:{ready:{setup:function(){bindReady();return},teardown:function(){return
}},mouseenter:{setup:function(){if(jQuery.browser.msie){return false}jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);
return true},teardown:function(){if(jQuery.browser.msie){return false}jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);
return true},handler:function(event){if(withinElement(event,this)){return true}event.type="mouseenter";
return jQuery.event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(jQuery.browser.msie){return false
}jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true
},teardown:function(){if(jQuery.browser.msie){return false}jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);
return true},handler:function(event){if(withinElement(event,this)){return true}event.type="mouseleave";
return jQuery.event.handle.apply(this,arguments)}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data)
})},one:function(type,data,fn){var one=jQuery.event.proxy(fn||data,function(event){jQuery(this).unbind(event,one);
return(fn||data).apply(this,arguments)});return this.each(function(){jQuery.event.add(this,type,one,fn&&data)
})},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn)
})},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn)
})},triggerHandler:function(type,data,fn){return this[0]&&jQuery.event.trigger(type,data,this[0],false,fn)
},toggle:function(fn){var args=arguments,i=1;while(i<args.length){jQuery.event.proxy(fn,args[i++])
}return this.click(jQuery.event.proxy(fn,function(event){this.lastToggle=(this.lastToggle||0)%i;
event.preventDefault();return args[this.lastToggle++].apply(this,arguments)||false
}))},hover:function(fnOver,fnOut){return this.bind("mouseenter",fnOver).bind("mouseleave",fnOut)
},ready:function(fn){bindReady();if(jQuery.isReady){fn.call(document,jQuery)}else{jQuery.readyList.push(function(){return fn.call(this,jQuery)
})}return this}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;
if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.call(document)});
jQuery.readyList=null}jQuery(document).triggerHandler("ready")}}});var readyBound=false;
function bindReady(){if(readyBound){return}readyBound=true;if(document.addEventListener&&!jQuery.browser.opera){document.addEventListener("DOMContentLoaded",jQuery.ready,false)
}if(jQuery.browser.msie&&window==top){(function(){if(jQuery.isReady){return}try{document.documentElement.doScroll("left")
}catch(error){setTimeout(arguments.callee,0);return}jQuery.ready()})()}if(jQuery.browser.opera){document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady){return
}for(var i=0;i<document.styleSheets.length;i++){if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);
return}}jQuery.ready()},false)}if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady){return
}if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);
return}if(numStyles===undefined){numStyles=jQuery("style, link[rel=stylesheet]").length
}if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return
}jQuery.ready()})()}jQuery.event.add(window,"load",jQuery.ready)}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,change,select,submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name)
}});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem){try{parent=parent.parentNode
}catch(error){parent=elem}}return parent==elem};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind()
});jQuery.fn.extend({_load:jQuery.fn.load,load:function(url,params,callback){if(typeof url!="string"){return this._load(url)
}var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off)
}callback=callback||function(){};var type="GET";if(params){if(jQuery.isFunction(params)){callback=params;
params=null}else{params=jQuery.param(params);type="POST"}}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified"){self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText)
}self.each(callback,[res.responseText,status,res])}});return this},serialize:function(){return jQuery.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type))
}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val}
}):{name:elem.name,value:val}}).get()}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f)
}});var jsc=now();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;
data=null}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type})
},getScript:function(url,callback){return jQuery.get(url,null,callback,"script")},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")
},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;
data={}}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type})
},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings)},ajaxSettings:{url:location.href,global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));
var jsonp,jsre=/=\?(&|$)/g,status,data,type=s.type.toUpperCase();if(s.data&&s.processData&&typeof s.data!="string"){s.data=jQuery.param(s.data)
}if(s.dataType=="jsonp"){if(type=="GET"){if(!s.url.match(jsre)){s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?"
}}else{if(!s.data||!s.data.match(jsre)){s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?"
}}s.dataType="json"}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;
if(s.data){s.data=(s.data+"").replace(jsre,"="+jsonp+"$1")}s.url=s.url.replace(jsre,"="+jsonp+"$1");
s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();complete();window[jsonp]=undefined;
try{delete window[jsonp]}catch(e){}if(head){head.removeChild(script)}}}if(s.dataType=="script"&&s.cache==null){s.cache=false
}if(s.cache===false&&type=="GET"){var ts=now();var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");
s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"")}if(s.data&&type=="GET"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;
s.data=null}if(s.global&&!jQuery.active++){jQuery.event.trigger("ajaxStart")}var remote=/^(?:\w+:)?\/\/([^\/?#]+)/;
if(s.dataType=="script"&&type=="GET"&&remote.test(s.url)&&remote.exec(s.url)[1]!=location.host){var head=document.getElementsByTagName("head")[0];
var script=document.createElement("script");script.src=s.url;if(s.scriptCharset){script.charset=s.scriptCharset
}if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;
success();complete();head.removeChild(script)}}}head.appendChild(script);return undefined
}var requestDone=false;var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
if(s.username){xhr.open(type,s.url,s.async,s.username,s.password)}else{xhr.open(type,s.url,s.async)
}try{if(s.data){xhr.setRequestHeader("Content-Type",s.contentType)}if(s.ifModified){xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT")
}xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default)
}catch(e){}if(s.beforeSend&&s.beforeSend(xhr,s)===false){s.global&&jQuery.active--;
xhr.abort();return false}if(s.global){jQuery.event.trigger("ajaxSend",[xhr,s])}var onreadystatechange=function(isTimeout){if(!requestDone&&xhr&&(xhr.readyState==4||isTimeout=="timeout")){requestDone=true;
if(ival){clearInterval(ival);ival=null}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xhr)&&"error"||s.ifModified&&jQuery.httpNotModified(xhr,s.url)&&"notmodified"||"success";
if(status=="success"){try{data=jQuery.httpData(xhr,s.dataType,s.dataFilter)}catch(e){status="parsererror"
}}if(status=="success"){var modRes;try{modRes=xhr.getResponseHeader("Last-Modified")
}catch(e){}if(s.ifModified&&modRes){jQuery.lastModified[s.url]=modRes}if(!jsonp){success()
}}else{jQuery.handleError(s,xhr,status)}complete();if(s.async){xhr=null}}};if(s.async){var ival=setInterval(onreadystatechange,13);
if(s.timeout>0){setTimeout(function(){if(xhr){xhr.abort();if(!requestDone){onreadystatechange("timeout")
}}},s.timeout)}}try{xhr.send(s.data)}catch(e){jQuery.handleError(s,xhr,null,e)}if(!s.async){onreadystatechange()
}function success(){if(s.success){s.success(data,status)}if(s.global){jQuery.event.trigger("ajaxSuccess",[xhr,s])
}}function complete(){if(s.complete){s.complete(xhr,status)}if(s.global){jQuery.event.trigger("ajaxComplete",[xhr,s])
}if(s.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop")}}return xhr},handleError:function(s,xhr,status,e){if(s.error){s.error(xhr,status,e)
}if(s.global){jQuery.event.trigger("ajaxError",[xhr,s,e])}},active:0,httpSuccess:function(xhr){try{return !xhr.status&&location.protocol=="file:"||(xhr.status>=200&&xhr.status<300)||xhr.status==304||xhr.status==1223||jQuery.browser.safari&&xhr.status==undefined
}catch(e){}return false},httpNotModified:function(xhr,url){try{var xhrRes=xhr.getResponseHeader("Last-Modified");
return xhr.status==304||xhrRes==jQuery.lastModified[url]||jQuery.browser.safari&&xhr.status==undefined
}catch(e){}return false},httpData:function(xhr,type,filter){var ct=xhr.getResponseHeader("content-type"),xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.tagName=="parsererror"){throw"parsererror"}if(filter){data=filter(data,type)
}if(type=="script"){jQuery.globalEval(data)}if(type=="json"){data=eval("("+data+")")
}return data},param:function(a){var s=[];if(a.constructor==Array||a.jquery){jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value))
})}else{for(var j in a){if(a[j]&&a[j].constructor==Array){jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this))
})}else{s.push(encodeURIComponent(j)+"="+encodeURIComponent(jQuery.isFunction(a[j])?a[j]():a[j]))
}}}return s.join("&").replace(/%20/g,"+")}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";
if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");
this.style.display=elem.css("display");if(this.style.display=="none"){this.style.display="block"
}elem.remove()}}).end()},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");
this.style.display="none"}).end()},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle.apply(this,arguments):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]()
})},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback)
},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback)
},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback)
},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback)
},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback)
},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback)
},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);
return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1){return false
}var opt=jQuery.extend({},optall),p,hidden=jQuery(this).is(":hidden"),self=this;for(p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden){return opt.complete.call(this)
}if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow
}}if(opt.overflow!=null){this.style.overflow="hidden"}opt.curAnim=jQuery.extend({},prop);
jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(/toggle|show|hide/.test(val)){e[val=="toggle"?hidden?"show":"hide":val](prop)
}else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;
if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;
start=((end||1)/e.cur(true))*start;self.style[name]=start+unit}if(parts[1]){end=((parts[1]=="-="?-1:1)*end)+start
}e.custom(start,end,unit)}else{e.custom(start,val,"")}}});return true})},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;
type="fx"}if(!type||(typeof type=="string"&&!fn)){return queue(this[0],type)}return this.each(function(){if(fn.constructor==Array){queue(this,type,fn)
}else{queue(this,type).push(fn);if(queue(this,type).length==1){fn.call(this)}}})},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;
if(clearQueue){this.queue([])}this.each(function(){for(var i=timers.length-1;i>=0;
i--){if(timers[i].elem==this){if(gotoEnd){timers[i](true)}timers.splice(i,1)}}});
if(!gotoEnd){this.dequeue()}return this}});var queue=function(elem,type,array){if(elem){type=type||"fx";
var q=jQuery.data(elem,type+"queue");if(!q||array){q=jQuery.data(elem,type+"queue",jQuery.makeArray(array))
}}return q};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);
q.shift();if(q.length){q[0].call(this)}})};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};
opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:jQuery.fx.speeds[opt.duration])||jQuery.fx.speeds.def;
opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false){jQuery(this).dequeue()
}if(jQuery.isFunction(opt.old)){opt.old.call(this)}};return opt},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p
},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum
}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;
this.prop=prop;if(!options.orig){options.orig={}}}});jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)
}(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width"){this.elem.style.display="block"
}},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null){return this.elem[this.prop]
}var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0
},custom:function(from,to,unit){this.startTime=now();this.start=from;this.end=to;
this.unit=unit||this.unit||"px";this.now=this.start;this.pos=this.state=0;this.update();
var self=this;function t(gotoEnd){return self.step(gotoEnd)}t.elem=this.elem;jQuery.timers.push(t);
if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;
for(var i=0;i<timers.length;i++){if(!timers[i]()){timers.splice(i--,1)}}if(!timers.length){clearInterval(jQuery.timerId);
jQuery.timerId=null}},13)}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);
this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height"){this.elem.style[this.prop]="1px"
}jQuery(this.elem).show()},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);
this.options.hide=true;this.custom(this.cur(),0)},step:function(gotoEnd){var t=now();
if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;
this.update();this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim){if(this.options.curAnim[i]!==true){done=false
}}if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;
this.elem.style.display=this.options.display;if(jQuery.css(this.elem,"display")=="none"){this.elem.style.display="block"
}}if(this.options.hide){this.elem.style.display="none"}if(this.options.hide||this.options.show){for(var p in this.options.curAnim){jQuery.attr(this.elem.style,p,this.options.orig[p])
}}}if(done){this.options.complete.call(this.elem)}return false}else{var n=t-this.startTime;
this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};
jQuery.extend(jQuery.fx,{speeds:{slow:600,fast:200,def:400},step:{scrollLeft:function(fx){fx.elem.scrollLeft=fx.now
},scrollTop:function(fx){fx.elem.scrollTop=fx.now},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now)
},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit}}});jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;
if(elem){with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),css=jQuery.curCSS,fixed=css(elem,"position")=="fixed";
if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));
add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop)}else{add(elem.offsetLeft,elem.offsetTop);
while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2){border(offsetParent)
}if(!fixed&&css(offsetParent,"position")=="fixed"){fixed=true}offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;
offsetParent=offsetParent.offsetParent}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(css(parent,"display"))){add(-parent.scrollLeft,-parent.scrollTop)
}if(mozilla&&css(parent,"overflow")!="visible"){border(parent)}parent=parent.parentNode
}if((safari2&&(fixed||css(offsetChild,"position")=="absolute"))||(mozilla&&css(offsetChild,"position")!="absolute")){add(-doc.body.offsetLeft,-doc.body.offsetTop)
}if(fixed){add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop))
}}results={top:top,left:left}}}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true))
}function add(l,t){left+=parseInt(l,10)||0;top+=parseInt(t,10)||0}return results};
jQuery.fn.extend({position:function(){var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();
offset.top-=num(this,"marginTop");offset.left-=num(this,"marginLeft");parentOffset.top+=num(offsetParent,"borderTopWidth");
parentOffset.left+=num(offsetParent,"borderLeftWidth");results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}
}return results},offsetParent:function(){var offsetParent=this[0].offsetParent;while(offsetParent&&(!/^body|html$/i.test(offsetParent.tagName)&&jQuery.css(offsetParent,"position")=="static")){offsetParent=offsetParent.offsetParent
}return jQuery(offsetParent)}});jQuery.each(["Left","Top"],function(i,name){var method="scroll"+name;
jQuery.fn[method]=function(val){if(!this[0]){return}return val!=undefined?this.each(function(){this==window||this==document?window.scrollTo(!i?val:jQuery(window).scrollLeft(),i?val:jQuery(window).scrollTop()):this[method]=val
}):this[0]==window||this[0]==document?self[i?"pageYOffset":"pageXOffset"]||jQuery.boxModel&&document.documentElement[method]||document.body[method]:this[0][method]
}});jQuery.each(["Height","Width"],function(i,name){var tl=i?"Left":"Top",br=i?"Right":"Bottom";
jQuery.fn["inner"+name]=function(){return this[name.toLowerCase()]()+num(this,"padding"+tl)+num(this,"padding"+br)
};jQuery.fn["outer"+name]=function(margin){return this["inner"+name]()+num(this,"border"+tl+"Width")+num(this,"border"+br+"Width")+(margin?num(this,"margin"+tl)+num(this,"margin"+br):0)
}})})();if((typeof SC!=="undefined")&&SC&&SC.bundleDidLoad){SC.bundleDidLoad("raphael_views/raphael-git")
};