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
};Raphael.fn.g.linechart=function(ac,ad,aI,aG,ar,at,aj){function ak(h,f){var b=h.length/f,c=0,e=b,g=0,a=[];
while(c<h.length){e--;if(e<0){g+=h[c]*(1+e);a.push(g/b);g=h[c++]*-e;e+=b}else{g+=h[c++]
}}return a}aj=aj||{};if(!this.raphael.is(ar[0],"array")){ar=[ar]}if(!this.raphael.is(at[0],"array")){at=[at]
}var X=Array.prototype.concat.apply([],ar),Z=Array.prototype.concat.apply([],at),aw=this.g.snapEnds(Math.min.apply(Math,X),Math.max.apply(Math,X),ar[0].length-1),ao=aw.from,aB=aw.to,az=aj.gutter||10,W=(aI-az*2)/(aB-ao),af=this.g.snapEnds(Math.min.apply(Math,Z),Math.max.apply(Math,Z),at[0].length-1),ap=af.from,aC=af.to,Y=(aG-az*2)/(aC-ap),aq=Math.max(ar[0].length,at[0].length),ax=aj.symbol||"",ab=aj.colors||Raphael.fn.g.colors,ae=this,av=null,aA=null,j=this.set(),aa=[];
for(var x=0,ah=at.length;x<ah;x++){aq=Math.max(aq,at[x].length)}var i=this.set();
for(var x=0,ah=at.length;x<ah;x++){if(aj.shade){i.push(this.path().attr({stroke:"none",fill:ab[x],opacity:aj.nostroke?1:0.3}))
}if(at[x].length>aI-2*az){at[x]=ak(at[x],aI-2*az);aq=aI-2*az}if(ar[x]&&ar[x].length>aI-2*az){ar[x]=ak(ar[x],aI-2*az)
}}var an=this.set();if(aj.axis){var aD=(aj.axis+"").split(/[,\s]+/);+aD[0]&&an.push(this.g.axis(ac+az,ad+az,aI-2*az,ao,aB,aj.axisxstep||Math.floor((aI-2*az)/20),2));
+aD[1]&&an.push(this.g.axis(ac+aI-az,ad+aG-az,aG-2*az,ap,aC,aj.axisystep||Math.floor((aG-2*az)/20),3));
+aD[2]&&an.push(this.g.axis(ac+az,ad+aG-az,aI-2*az,ao,aB,aj.axisxstep||Math.floor((aI-2*az)/20),0));
+aD[3]&&an.push(this.g.axis(ac+az,ad+aG-az,aG-2*az,ap,aC,aj.axisystep||Math.floor((aG-2*az)/20),1))
}var ag=this.set(),V=this.set(),ay;for(var x=0,ah=at.length;x<ah;x++){if(!aj.nostroke){ag.push(ay=this.path().attr({stroke:ab[x],"stroke-width":aj.width||2,"stroke-linejoin":"round","stroke-linecap":"round","stroke-dasharray":aj.dash||""}))
}var aH=this.raphael.is(ax,"array")?ax[x]:ax,am=this.set();aa=[];for(var y=0,au=at[x].length;
y<au;y++){var aE=ac+az+((ar[x]||ar[0])[y]-ao)*W;var aF=ad+aG-az-(at[x][y]-ap)*Y;(Raphael.is(aH,"array")?aH[y]:aH)&&am.push(this.g[Raphael.fn.g.markers[this.raphael.is(aH,"array")?aH[y]:aH]](aE,aF,(aj.width||2)*3).attr({fill:ab[x],stroke:"none"}));
aa=aa.concat([y?"L":"M",aE,aF])}V.push(am);if(aj.shade){i[x].attr({path:aa.concat(["L",aE,ad+aG-az,"L",ac+az+((ar[x]||ar[0])[0]-ao)*W,ad+aG-az,"z"]).join(",")})
}!aj.nostroke&&ay.attr({path:aa.join(",")})}function ai(n){var q=[];for(var p=0,l=ar.length;
p<l;p++){q=q.concat(ar[p])}q.sort();var h=[],c=[];for(var p=0,l=q.length;p<l;p++){q[p]!=q[p-1]&&h.push(q[p])&&c.push(ac+az+(q[p]-ao)*W)
}q=h;l=q.length;var e=n||ae.set();for(var p=0;p<l;p++){var f=c[p]-(c[p]-(c[p-1]||ac))/2,m=((c[p+1]||ac+aI)-c[p])/2+(c[p]-(c[p-1]||ac))/2,k;
n?(k={}):e.push(k=ae.rect(f-1,ad,Math.max(m+1,1),aG).attr({stroke:"none",fill:"#000",opacity:0}));
k.values=[];k.symbols=ae.set();k.y=[];k.x=c[p];k.axis=q[p];for(var a=0,o=at.length;
a<o;a++){h=ar[a]||ar[0];for(var b=0,g=h.length;b<g;b++){if(h[b]==q[p]){k.values.push(at[a][b]);
k.y.push(ad+aG-az-(at[a][b]-ap)*Y);k.symbols.push(j.symbols[a][b])}}}n&&n.call(k)
}!n&&(av=e)}function al(l){var c=l||ae.set(),g;for(var a=0,h=at.length;a<h;a++){for(var b=0,m=at[a].length;
b<m;b++){var e=ac+az+((ar[a]||ar[0])[b]-ao)*W,k=ac+az+((ar[a]||ar[0])[b?b-1:1]-ao)*W,f=ad+aG-az-(at[a][b]-ap)*Y;
l?(g={}):c.push(g=ae.circle(e,f,Math.abs(k-e)/2).attr({stroke:"none",fill:"#000",opacity:0}));
g.x=e;g.y=f;g.value=at[a][b];g.line=j.lines[a];g.shade=j.shades[a];g.symbol=j.symbols[a][b];
g.symbols=j.symbols[a];g.axis=(ar[a]||ar[0])[b];l&&l.call(g)}}!l&&(aA=c)}j.push(ag,i,V,an,av,aA);
j.lines=ag;j.shades=i;j.symbols=V;j.axis=an;j.hoverColumn=function(a,b){!av&&ai();
av.mouseover(a).mouseout(b);return this};j.clickColumn=function(a){!av&&ai();av.click(a);
return this};j.hrefColumn=function(a){var f=ae.raphael.is(arguments[0],"array")?arguments[0]:arguments;
if(!(arguments.length-1)&&typeof a=="object"){for(var c in a){for(var e=0,b=av.length;
e<b;e++){if(av[e].axis==c){av[e].attr("href",a[c])}}}}!av&&ai();for(var e=0,b=f.length;
e<b;e++){av[e]&&av[e].attr("href",f[e])}return this};j.hover=function(a,b){!aA&&al();
aA.mouseover(a).mouseout(b);return this};j.click=function(a){!aA&&al();aA.click(a);
return this};j.each=function(a){al(a);return this};j.eachColumn=function(a){ai(a);
return this};return j};
/*
 * g.Raphael 0.4.1 - Charting library, based on Raphaël
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://g.raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael.fn.g.linechart=function(L,K,a,c,u,t,E){function D(y,aa){var x=y.length/aa,X=0,i=x,Z=0,Y=[];
while(X<y.length){i--;if(i<0){Z+=y[X]*(1+i);Y.push(Z/x);Z=y[X++]*-i;i+=x}else{Z+=y[X++]
}}return Y}E=E||{};if(!this.raphael.is(u[0],"array")){u=[u]}if(!this.raphael.is(t[0],"array")){t=[t]
}var Q=Array.prototype.concat.apply([],u),O=Array.prototype.concat.apply([],t),p=this.g.snapEnds(Math.min.apply(Math,Q),Math.max.apply(Math,Q),u[0].length-1),z=p.from,k=p.to,m=E.gutter||10,R=(a-m*2)/(k-z),I=this.g.snapEnds(Math.min.apply(Math,O),Math.max.apply(Math,O),t[0].length-1),w=I.from,h=I.to,P=(c-m*2)/(h-w),v=Math.max(u[0].length,t[0].length),o=E.symbol||"",M=E.colors||Raphael.fn.g.colors,J=this,q=null,l=null,V=this.set(),N=[];
for(var U=0,G=t.length;U<G;U++){v=Math.max(v,t[U].length)}var W=this.set();for(var U=0,G=t.length;
U<G;U++){if(E.shade){W.push(this.path().attr({stroke:"none",fill:M[U],opacity:E.nostroke?1:0.3}))
}if(t[U].length>a-2*m){t[U]=D(t[U],a-2*m);v=a-2*m}if(u[U]&&u[U].length>a-2*m){u[U]=D(u[U],a-2*m)
}}var A=this.set();if(E.axis){var g=(E.axis+"").split(/[,\s]+/);+g[0]&&A.push(this.g.axis(L+m,K+m,a-2*m,z,k,E.axisxstep||Math.floor((a-2*m)/20),2));
+g[1]&&A.push(this.g.axis(L+a-m,K+c-m,c-2*m,w,h,E.axisystep||Math.floor((c-2*m)/20),3));
+g[2]&&A.push(this.g.axis(L+m,K+c-m,a-2*m,z,k,E.axisxstep||Math.floor((a-2*m)/20),0));
+g[3]&&A.push(this.g.axis(L+m,K+c-m,c-2*m,w,h,E.axisystep||Math.floor((c-2*m)/20),1))
}var H=this.set(),S=this.set(),n;for(var U=0,G=t.length;U<G;U++){if(!E.nostroke){H.push(n=this.path().attr({stroke:M[U],"stroke-width":E.width||2,"stroke-linejoin":"round","stroke-linecap":"round","stroke-dasharray":E.dash||""}))
}var b=this.raphael.is(o,"array")?o[U]:o,B=this.set();N=[];for(var T=0,s=t[U].length;
T<s;T++){var f=L+m+((u[U]||u[0])[T]-z)*R;var e=K+c-m-(t[U][T]-w)*P;(Raphael.is(b,"array")?b[T]:b)&&B.push(this.g[Raphael.fn.g.markers[this.raphael.is(b,"array")?b[T]:b]](f,e,(E.width||2)*3).attr({fill:M[U],stroke:"none"}));
N=N.concat([T?"L":"M",f,e])}S.push(B);if(E.shade){W[U].attr({path:N.concat(["L",f,K+c-m,"L",L+m+((u[U]||u[0])[0]-z)*R,K+c-m,"z"]).join(",")})
}!E.nostroke&&n.attr({path:N.join(",")})}function F(ag){var ad=[];for(var ae=0,ai=u.length;
ae<ai;ae++){ad=ad.concat(u[ae])}ad.sort();var aj=[],aa=[];for(var ae=0,ai=ad.length;
ae<ai;ae++){ad[ae]!=ad[ae-1]&&aj.push(ad[ae])&&aa.push(L+m+(ad[ae]-z)*R)}ad=aj;ai=ad.length;
var Z=ag||J.set();for(var ae=0;ae<ai;ae++){var Y=aa[ae]-(aa[ae]-(aa[ae-1]||L))/2,ah=((aa[ae+1]||L+a)-aa[ae])/2+(aa[ae]-(aa[ae-1]||L))/2,x;
ag?(x={}):Z.push(x=J.rect(Y-1,K,Math.max(ah+1,1),c).attr({stroke:"none",fill:"#000",opacity:0}));
x.values=[];x.symbols=J.set();x.y=[];x.x=aa[ae];x.axis=ad[ae];for(var ac=0,af=t.length;
ac<af;ac++){aj=u[ac]||u[0];for(var ab=0,y=aj.length;ab<y;ab++){if(aj[ab]==ad[ae]){x.values.push(t[ac][ab]);
x.y.push(K+c-m-(t[ac][ab]-w)*P);x.symbols.push(V.symbols[ac][ab])}}}ag&&ag.call(x)
}!ag&&(q=Z)}function C(ae){var aa=ae||J.set(),x;for(var ac=0,ag=t.length;ac<ag;ac++){for(var ab=0,ad=t[ac].length;
ab<ad;ab++){var Z=L+m+((u[ac]||u[0])[ab]-z)*R,af=L+m+((u[ac]||u[0])[ab?ab-1:1]-z)*R,y=K+c-m-(t[ac][ab]-w)*P;
ae?(x={}):aa.push(x=J.circle(Z,y,Math.abs(af-Z)/2).attr({stroke:"none",fill:"#000",opacity:0}));
x.x=Z;x.y=y;x.value=t[ac][ab];x.line=V.lines[ac];x.shade=V.shades[ac];x.symbol=V.symbols[ac][ab];
x.symbols=V.symbols[ac];x.axis=(u[ac]||u[0])[ab];ae&&ae.call(x)}}!ae&&(l=aa)}V.push(H,W,S,A,q,l);
V.lines=H;V.shades=W;V.symbols=S;V.axis=A;V.hoverColumn=function(j,i){!q&&F();q.mouseover(j).mouseout(i);
return this};V.clickColumn=function(i){!q&&F();q.click(i);return this};V.hrefColumn=function(Y){var Z=J.raphael.is(arguments[0],"array")?arguments[0]:arguments;
if(!(arguments.length-1)&&typeof Y=="object"){for(var j in Y){for(var y=0,X=q.length;
y<X;y++){if(q[y].axis==j){q[y].attr("href",Y[j])}}}}!q&&F();for(var y=0,X=Z.length;
y<X;y++){q[y]&&q[y].attr("href",Z[y])}return this};V.hover=function(j,i){!l&&C();
l.mouseover(j).mouseout(i);return this};V.click=function(i){!l&&C();l.click(i);return this
};V.each=function(i){C(i);return this};V.eachColumn=function(i){F(i);return this};
return V};Raphael.fn.g.piechart=function(S,T,J,V,M){M=M||{};var N=this,L=[],Q=this.set(),K=this.set(),O=this.set(),E=[],C=V.length,B=0,I=0,i=0,U=9,p=true;
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
return l[0].paper};Raphael=function(){function ay(){if(ay.is(arguments[0],aQ)){for(var o=arguments[0],m=bL[a2](ay,o.splice(0,3+ay.is(o[0],aY))),v=m.set(),u=0,p=o[aw];
u<p;u++){var s=o[u]||{};bc.test(s.type)&&v[bf](m[s.type]().attr(s))}return v}return bL[a2](ay,arguments)
}ay.version="1.4.3";var aP=/[, ]+/,bc=/^(circle|rect|path|ellipse|text|image)$/,au="prototype",am="hasOwnProperty",bj=document,aN=window,l={was:Object[au][am].call(aN,"Raphael"),is:aN.Raphael};
function a8(){}var an="appendChild",a2="apply",a0="concat",bw="createTouch" in bj,at="",aW=" ",a7="split",bS="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend"[a7](aW),a6={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},aU="join",aw="length",ax=String[au].toLowerCase,ap=Math,aM=ap.max,bB=ap.min,aY="number",e="string",aQ="array",aZ="toString",bs="fill",aD=Object[au][aZ],bh=ap.pow,bf="push",bv=/^(?=[\da-f]$)/,bE=/^url\(['"]?([^\)]+?)['"]?\)$/i,af=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+(?:\s*,\s*[\d\.]+)?)\s*\)|rgba?\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%(?:\s*,\s*[\d\.]+%))\s*\)|hs[bl]\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hs[bl]\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i,a9=ap.round,aO="setAttribute",bk=parseFloat,J=parseInt,aC=" progid:DXImageTransform.Microsoft",ah=String[au].toUpperCase,k={blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},ae={along:"along",blur:aY,"clip-rect":"csv",cx:aY,cy:aY,fill:"colour","fill-opacity":aY,"font-size":aY,height:aY,opacity:aY,path:"path",r:aY,rotation:"csv",rx:aY,ry:aY,scale:"csv",stroke:"colour","stroke-opacity":aY,"stroke-width":aY,translation:"csv",width:aY,x:aY,y:aY},a5="replace";
ay.type=aN.SVGAngle||bj.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML";
if(ay.type=="VML"){var a4=bj.createElement("div");a4.innerHTML="<!--[if vml]><br><br><![endif]-->";
if(a4.childNodes[aw]!=2){return ay.type=null}a4=null}ay.svg=!(ay.vml=ay.type=="VML");
a8[au]=ay[au];ay._id=0;ay._oid=0;ay.fn={};ay.is=function(o,m){m=ax.call(m);return m=="object"&&o===Object(o)||m=="undefined"&&typeof o==m||m=="null"&&o==null||ax.call(aD.call(o).slice(8,-1))==m
};ay.setWindow=function(m){aN=m;bj=aN.document};function bR(o){if(ay.vml){var m=/^\s+|\s+$/g;
bR=aR(function(z){var w;z=(z+at)[a5](m,at);try{var y=new aN.ActiveXObject("htmlfile");
y.write("<body>");y.close();w=y.body}catch(v){w=aN.createPopup().document.body}y=w.createTextRange();
try{w.style.color=z;var u=y.queryCommandValue("ForeColor");u=(u&255)<<16|u&65280|(u&16711680)>>>16;
return"#"+("000000"+u[aZ](16)).slice(-6)}catch(s){return"none"}})}else{var p=bj.createElement("i");
p.title="Rapha\u00ebl Colour Picker";p.style.display="none";bj.body[an](p);bR=aR(function(s){p.style.color=s;
return bj.defaultView.getComputedStyle(p,at).getPropertyValue("color")})}return bR(o)
}function j(){return"hsb("+[this.h,this.s,this.b]+")"}function bQ(){return this.hex
}ay.hsb2rgb=aR(function(o,m,w){if(ay.is(o,"object")&&"h" in o&&"s" in o&&"b" in o){w=o.b;
m=o.s;o=o.h}var v;if(w==0){return{r:0,g:0,b:0,hex:"#000"}}if(o>1||m>1||w>1){o/=255;
m/=255;w/=255}v=~~(o*6);o=o*6-v;var s=w*(1-m),u=w*(1-m*o),p=w*(1-m*(1-o));o=[w,u,s,s,p,w,w][v];
m=[p,w,w,u,s,s,p][v];v=[s,s,p,w,w,u,s][v];o*=255;m*=255;v*=255;w={r:o,g:m,b:v,toString:bQ};
o=(~~o)[aZ](16);m=(~~m)[aZ](16);v=(~~v)[aZ](16);o=o[a5](bv,"0");m=m[a5](bv,"0");v=v[a5](bv,"0");
w.hex="#"+o+m+v;return w},ay);ay.rgb2hsb=aR(function(o,m,w){if(ay.is(o,"object")&&"r" in o&&"g" in o&&"b" in o){w=o.b;
m=o.g;o=o.r}if(ay.is(o,e)){var v=ay.getRGB(o);o=v.r;m=v.g;w=v.b}if(o>1||m>1||w>1){o/=255;
m/=255;w/=255}var s=aM(o,m,w),u=bB(o,m,w);v=s;if(u==s){return{h:0,s:0,b:s}}else{var p=s-u;
u=p/s;o=o==s?(m-w)/p:m==s?2+(w-o)/p:4+(o-m)/p;o/=6;o<0&&o++;o>1&&o--}return{h:o,s:u,b:v,toString:j}
},ay);var bC=/,?([achlmqrstvxz]),?/gi,bD=/\s*,\s*/,bl={hs:1,rg:1};ay._path2string=function(){return this.join(",")[a5](bC,"$1")
};function aR(o,m,s){function p(){var w=Array[au].slice.call(arguments,0),y=w[aU]("\u25ba"),v=p.cache=p.cache||{},u=p.count=p.count||[];
if(v[am](y)){return s?s(v[y]):v[y]}u[aw]>=1000&&delete v[u.shift()];u[bf](y);v[y]=o[a2](m,w);
return s?s(v[y]):v[y]}return p}ay.getRGB=aR(function(o){if(!o||(o+=at).indexOf("-")+1){return{r:-1,g:-1,b:-1,hex:"none",error:1}
}if(o=="none"){return{r:-1,g:-1,b:-1,hex:"none"}}!(bl[am](o.substring(0,2))||o.charAt()=="#")&&(o=bR(o));
var m,v,u,p,s;if(o=o.match(af)){if(o[2]){u=J(o[2].substring(5),16);v=J(o[2].substring(3,5),16);
m=J(o[2].substring(1,3),16)}if(o[3]){u=J((s=o[3].charAt(3))+s,16);v=J((s=o[3].charAt(2))+s,16);
m=J((s=o[3].charAt(1))+s,16)}if(o[4]){o=o[4][a7](bD);m=bk(o[0]);v=bk(o[1]);u=bk(o[2]);
p=bk(o[3])}if(o[5]){o=o[5][a7](bD);m=bk(o[0])*2.55;v=bk(o[1])*2.55;u=bk(o[2])*2.55;
p=bk(o[3])}if(o[6]){o=o[6][a7](bD);m=bk(o[0]);v=bk(o[1]);u=bk(o[2]);return ay.hsb2rgb(m,v,u)
}if(o[7]){o=o[7][a7](bD);m=bk(o[0])*2.55;v=bk(o[1])*2.55;u=bk(o[2])*2.55;return ay.hsb2rgb(m,v,u)
}o={r:m,g:v,b:u};m=(~~m)[aZ](16);v=(~~v)[aZ](16);u=(~~u)[aZ](16);m=m[a5](bv,"0");
v=v[a5](bv,"0");u=u[a5](bv,"0");o.hex="#"+m+v+u;isFinite(bk(p))&&(o.o=p);return o
}return{r:-1,g:-1,b:-1,hex:"none",error:1}},ay);ay.getColor=function(o){o=this.getColor.start=this.getColor.start||{h:0,s:1,b:o||0.75};
var m=this.hsb2rgb(o.h,o.s,o.b);o.h+=0.075;if(o.h>1){o.h=0;o.s-=0.2;o.s<=0&&(this.getColor.start={h:0,s:1,b:o.b})
}return m.hex};ay.getColor.reset=function(){delete this.start};var aH=/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,aj=/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig;
ay.parsePathString=aR(function(o){if(!o){return null}var m={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},p=[];
if(ay.is(o,aQ)&&ay.is(o[0],aQ)){p=bm(o)}p[aw]||(o+at)[a5](aH,function(w,u,v){var s=[];
w=ax.call(u);v[a5](aj,function(z,y){y&&s[bf](+y)});if(w=="m"&&s[aw]>2){p[bf]([u][a0](s.splice(0,2)));
w="l";u=u=="m"?"l":"L"}for(;s[aw]>=m[w];){p[bf]([u][a0](s.splice(0,m[w])));if(!m[w]){break
}}});p[aZ]=ay._path2string;return p});ay.findDotsAtSegment=function(G,F,E,D,A,C,z,y,w){var v=1-w,s=bh(v,3)*G+bh(v,2)*3*w*E+v*3*w*w*A+bh(w,3)*z;
v=bh(v,3)*F+bh(v,2)*3*w*D+v*3*w*w*C+bh(w,3)*y;var p=G+2*w*(E-G)+w*w*(A-2*E+G),m=F+2*w*(D-F)+w*w*(C-2*D+F),o=E+2*w*(A-E)+w*w*(z-2*A+E),u=D+2*w*(C-D)+w*w*(y-2*C+D);
G=(1-w)*G+w*E;F=(1-w)*F+w*D;A=(1-w)*A+w*z;C=(1-w)*C+w*y;y=90-ap.atan((p-o)/(m-u))*180/ap.PI;
(p>o||m<u)&&(y+=180);return{x:s,y:v,m:{x:p,y:m},n:{x:o,y:u},start:{x:G,y:F},end:{x:A,y:C},alpha:y}
};var ak=aR(function(o){if(!o){return{x:0,y:0,width:0,height:0}}o=aI(o);for(var m=0,y=0,w=[],u=[],v,s=0,p=o[aw];
s<p;s++){v=o[s];if(v[0]=="M"){m=v[1];y=v[2];w[bf](m);u[bf](y)}else{m=n(m,y,v[1],v[2],v[3],v[4],v[5],v[6]);
w=w[a0](m.min.x,m.max.x);u=u[a0](m.min.y,m.max.y);m=v[5];y=v[6]}}o=bB[a2](0,w);v=bB[a2](0,u);
return{x:o,y:v,width:aM[a2](0,w)-o,height:aM[a2](0,u)-v}});function bm(o){var m=[];
if(!ay.is(o,aQ)||!ay.is(o&&o[0],aQ)){o=ay.parsePathString(o)}for(var v=0,u=o[aw];
v<u;v++){m[v]=[];for(var p=0,s=o[v][aw];p<s;p++){m[v][p]=o[v][p]}}m[aZ]=ay._path2string;
return m}var bn=aR(function(D){if(!ay.is(D,aQ)||!ay.is(D&&D[0],aQ)){D=ay.parsePathString(D)
}var C=[],A=0,z=0,w=0,y=0,v=0;if(D[0][0]=="M"){A=D[0][1];z=D[0][2];w=A;y=z;v++;C[bf](["M",A,z])
}v=v;for(var u=D[aw];v<u;v++){var s=C[v]=[],p=D[v];if(p[0]!=ax.call(p[0])){s[0]=ax.call(p[0]);
switch(s[0]){case"a":s[1]=p[1];s[2]=p[2];s[3]=p[3];s[4]=p[4];s[5]=p[5];s[6]=+(p[6]-A).toFixed(3);
s[7]=+(p[7]-z).toFixed(3);break;case"v":s[1]=+(p[1]-z).toFixed(3);break;case"m":w=p[1];
y=p[2];default:for(var o=1,m=p[aw];o<m;o++){s[o]=+(p[o]-(o%2?A:z)).toFixed(3)}}}else{C[v]=[];
if(p[0]=="m"){w=p[1]+A;y=p[2]+z}s=0;for(o=p[aw];s<o;s++){C[v][s]=p[s]}}p=C[v][aw];
switch(C[v][0]){case"z":A=w;z=y;break;case"h":A+=+C[v][p-1];break;case"v":z+=+C[v][p-1];
break;default:A+=+C[v][p-2];z+=+C[v][p-1]}}C[aZ]=ay._path2string;return C},0,bm),h=aR(function(D){if(!ay.is(D,aQ)||!ay.is(D&&D[0],aQ)){D=ay.parsePathString(D)
}var C=[],A=0,z=0,w=0,y=0,v=0;if(D[0][0]=="M"){A=+D[0][1];z=+D[0][2];w=A;y=z;v++;
C[0]=["M",A,z]}v=v;for(var u=D[aw];v<u;v++){var s=C[v]=[],p=D[v];if(p[0]!=ah.call(p[0])){s[0]=ah.call(p[0]);
switch(s[0]){case"A":s[1]=p[1];s[2]=p[2];s[3]=p[3];s[4]=p[4];s[5]=p[5];s[6]=+(p[6]+A);
s[7]=+(p[7]+z);break;case"V":s[1]=+p[1]+z;break;case"H":s[1]=+p[1]+A;break;case"M":w=+p[1]+A;
y=+p[2]+z;default:for(var o=1,m=p[aw];o<m;o++){s[o]=+p[o]+(o%2?A:z)}}}else{o=0;for(m=p[aw];
o<m;o++){C[v][o]=p[o]}}switch(s[0]){case"Z":A=w;z=y;break;case"H":A=s[1];break;case"V":z=s[1];
break;default:A=C[v][C[v][aw]-2];z=C[v][C[v][aw]-1]}}C[aZ]=ay._path2string;return C
},null,bm);function q(o,m,s,p){return[o,m,s,p,s,p]}function aJ(o,m,y,w,u,v){var s=1/3,p=2/3;
return[s*o+p*y,s*m+p*w,s*u+p*y,s*v+p*w,u,v]}function al(M,K,I,H,F,G,E,D,C,A){var y=ap.PI,w=y*120/180,s=y/180*(+F||0),v=[],z,p=aR(function(N,O,Q){var P=N*ap.cos(Q)-O*ap.sin(Q);
N=N*ap.sin(Q)+O*ap.cos(Q);return{x:P,y:N}});if(A){o=A[0];z=A[1];G=A[2];u=A[3]}else{z=p(M,K,-s);
M=z.x;K=z.y;z=p(D,C,-s);D=z.x;C=z.y;ap.cos(y/180*F);ap.sin(y/180*F);z=(M-D)/2;o=(K-C)/2;
u=z*z/(I*I)+o*o/(H*H);if(u>1){u=ap.sqrt(u);I=u*I;H=u*H}u=I*I;var m=H*H;u=(G==E?-1:1)*ap.sqrt(ap.abs((u*m-u*o*o-m*z*z)/(u*o*o+m*z*z)));
G=u*I*o/H+(M+D)/2;var u=u*-H*z/I+(K+C)/2,o=ap.asin(((K-u)/H).toFixed(7));z=ap.asin(((C-u)/H).toFixed(7));
o=M<G?y-o:o;z=D<G?y-z:z;o<0&&(o=y*2+o);z<0&&(z=y*2+z);if(E&&o>z){o-=y*2}if(!E&&z>o){z-=y*2
}}y=z-o;if(ap.abs(y)>w){v=z;y=D;m=C;z=o+w*(E&&z>o?1:-1);D=G+I*ap.cos(z);C=u+H*ap.sin(z);
v=al(D,C,I,H,F,0,E,y,m,[z,v,G,u])}y=z-o;F=ap.cos(o);G=ap.sin(o);E=ap.cos(z);z=ap.sin(z);
y=ap.tan(y/4);I=4/3*I*y;y=4/3*H*y;H=[M,K];M=[M+I*G,K-y*F];K=[D+I*z,C-y*E];D=[D,C];
M[0]=2*H[0]-M[0];M[1]=2*H[1]-M[1];if(A){return[M,K,D][a0](v)}else{v=[M,K,D][a0](v)[aU]()[a7](",");
A=[];D=0;for(C=v[aw];D<C;D++){A[D]=D%2?p(v[D-1],v[D],s).y:p(v[D],v[D+1],s).x}return A
}}function bO(A,z,y,w,u,v,s,p,o){var m=1-o;return{x:bh(m,3)*A+bh(m,2)*3*o*y+m*3*o*o*u+bh(o,3)*s,y:bh(m,3)*z+bh(m,2)*3*o*w+m*3*o*o*v+bh(o,3)*p}
}var n=aR(function(F,E,D,C,z,A,y,w){var v=z-2*D+F-(y-2*z+D),u=2*(D-F)-2*(z-D),s=F-D,p=(-u+ap.sqrt(u*u-4*v*s))/2/v;
v=(-u-ap.sqrt(u*u-4*v*s))/2/v;var m=[E,w],o=[F,y];ap.abs(p)>1000000000000&&(p=0.5);
ap.abs(v)>1000000000000&&(v=0.5);if(p>0&&p<1){p=bO(F,E,D,C,z,A,y,w,p);o[bf](p.x);
m[bf](p.y)}if(v>0&&v<1){p=bO(F,E,D,C,z,A,y,w,v);o[bf](p.x);m[bf](p.y)}v=A-2*C+E-(w-2*A+C);
u=2*(C-E)-2*(A-C);s=E-C;p=(-u+ap.sqrt(u*u-4*v*s))/2/v;v=(-u-ap.sqrt(u*u-4*v*s))/2/v;
ap.abs(p)>1000000000000&&(p=0.5);ap.abs(v)>1000000000000&&(v=0.5);if(p>0&&p<1){p=bO(F,E,D,C,z,A,y,w,p);
o[bf](p.x);m[bf](p.y)}if(v>0&&v<1){p=bO(F,E,D,C,z,A,y,w,v);o[bf](p.x);m[bf](p.y)}return{min:{x:bB[a2](0,o),y:bB[a2](0,m)},max:{x:aM[a2](0,o),y:aM[a2](0,m)}}
}),aI=aR(function(E,D){var C=h(E),A=D&&h(D);E={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null};
D={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null};function y(H,F){var G;if(!H){return["C",F.x,F.y,F.x,F.y,F.x,F.y]
}!(H[0] in {T:1,Q:1})&&(F.qx=F.qy=null);switch(H[0]){case"M":F.X=H[1];F.Y=H[2];break;
case"A":H=["C"][a0](al[a2](0,[F.x,F.y][a0](H.slice(1))));break;case"S":G=F.x+(F.x-(F.bx||F.x));
F=F.y+(F.y-(F.by||F.y));H=["C",G,F][a0](H.slice(1));break;case"T":F.qx=F.x+(F.x-(F.qx||F.x));
F.qy=F.y+(F.y-(F.qy||F.y));H=["C"][a0](aJ(F.x,F.y,F.qx,F.qy,H[1],H[2]));break;case"Q":F.qx=H[1];
F.qy=H[2];H=["C"][a0](aJ(F.x,F.y,H[1],H[2],H[3],H[4]));break;case"L":H=["C"][a0](q(F.x,F.y,H[1],H[2]));
break;case"H":H=["C"][a0](q(F.x,F.y,H[1],F.y));break;case"V":H=["C"][a0](q(F.x,F.y,F.x,H[1]));
break;case"Z":H=["C"][a0](q(F.x,F.y,F.X,F.Y));break}return H}function z(H,F){if(H[F][aw]>7){H[F].shift();
for(var G=H[F];G[aw];){H.splice(F++,0,["C"][a0](G.splice(0,6)))}H.splice(F,1);u=aM(C[aw],A&&A[aw]||0)
}}function w(I,G,H,F,K){if(I&&G&&I[K][0]=="M"&&G[K][0]!="M"){G.splice(K,0,["M",F.x,F.y]);
H.bx=0;H.by=0;H.x=I[K][1];H.y=I[K][2];u=aM(C[aw],A&&A[aw]||0)}}for(var v=0,u=aM(C[aw],A&&A[aw]||0);
v<u;v++){C[v]=y(C[v],E);z(C,v);A&&(A[v]=y(A[v],D));A&&z(A,v);w(C,A,E,D,v);w(A,C,D,E,v);
var s=C[v],p=A&&A[v],o=s[aw],m=A&&p[aw];E.x=s[o-2];E.y=s[o-1];E.bx=bk(s[o-4])||E.x;
E.by=bk(s[o-3])||E.y;D.bx=A&&(bk(p[m-4])||D.x);D.by=A&&(bk(p[m-3])||D.y);D.x=A&&p[m-2];
D.y=A&&p[m-1]}return A?[C,A]:C},null,bm),t=aR(function(o){for(var m=[],v=0,u=o[aw];
v<u;v++){var p={},s=o[v].match(/^([^:]*):?([\d\.]*)/);p.color=ay.getRGB(s[1]);if(p.color.error){return null
}p.color=p.color.hex;s[2]&&(p.offset=s[2]+"%");m[bf](p)}v=1;for(u=m[aw]-1;v<u;v++){if(!m[v].offset){o=bk(m[v-1].offset||0);
s=0;for(p=v+1;p<u;p++){if(m[p].offset){s=m[p].offset;break}}if(!s){s=100;p=u}s=bk(s);
for(s=(s-o)/(p-v+1);v<p;v++){o+=s;m[v].offset=o+"%"}}}return m});function a(o,m,s,p){if(ay.is(o,e)||ay.is(o,"object")){o=ay.is(o,e)?bj.getElementById(o):o;
if(o.tagName){return m==null?{container:o,width:o.style.pixelWidth||o.offsetWidth,height:o.style.pixelHeight||o.offsetHeight}:{container:o,width:m,height:s}
}}else{return{container:1,x:o,y:m,width:s,height:p}}}function i(o,m){var s=this;for(var p in m){if(m[am](p)&&!(p in o)){switch(typeof m[p]){case"function":(function(u){o[p]=o===s?u:function(){return u[a2](s,arguments)
}})(m[p]);break;case"object":o[p]=o[p]||{};i.call(this,o[p],m[p]);break;default:o[p]=m[p];
break}}}}function aB(o,m){o==m.top&&(m.top=o.prev);o==m.bottom&&(m.bottom=o.next);
o.next&&(o.next.prev=o.prev);o.prev&&(o.prev.next=o.next)}function bH(o,m){if(m.top!==o){aB(o,m);
o.next=null;o.prev=m.top;m.top.next=o;m.top=o}}function bq(o,m){if(m.bottom!==o){aB(o,m);
o.next=m.bottom;o.prev=null;m.bottom.prev=o;m.bottom=o}}function aL(o,m,p){aB(o,p);
m==p.top&&(p.top=o);m.next&&(m.next.prev=o);o.next=m.next;o.prev=m;m.next=o}function ao(o,m,p){aB(o,p);
m==p.bottom&&(p.bottom=o);m.prev&&(m.prev.next=o);o.prev=m.prev;m.prev=o;o.next=m
}function x(m){return function(){throw new Error("Rapha\u00ebl: you are calling to method \u201c"+m+"\u201d of removed object")
}}var b=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;if(ay.svg){a8[au].svgns="http://www.w3.org/2000/svg";
a8[au].xlink="http://www.w3.org/1999/xlink";a9=function(m){return +m+(~~m===m)*0.5
};var aq=function(o,m){if(m){for(var p in m){m[am](p)&&o[aO](p,m[p]+at)}}else{o=bj.createElementNS(a8[au].svgns,o);
o.style.webkitTapHighlightColor="rgba(0,0,0,0)";return o}};ay[aZ]=function(){return"Your browser supports SVG.\nYou are running Rapha\u00ebl "+this.version
};var bI=function(o,m){var p=aq("path");m.canvas&&m.canvas[an](p);m=new ar(p,m);m.type="path";
aX(m,{fill:"none",stroke:"#000",path:o});return m},bz=function(A,z,y){var w="linear",u=0.5,v=0.5,s=A.style;
z=(z+at)[a5](b,function(C,E,D){w="radial";if(E&&D){u=bk(E);v=bk(D);C=(v>0.5)*2-1;
bh(u-0.5,2)+bh(v-0.5,2)>0.25&&(v=ap.sqrt(0.25-bh(u-0.5,2))*C+0.5)&&v!=0.5&&(v=v.toFixed(5)-0.00001*C)
}return at});z=z[a7](/\s*\-\s*/);if(w=="linear"){var p=z.shift();p=-bk(p);if(isNaN(p)){return null
}p=[0,0,ap.cos(p*ap.PI/180),ap.sin(p*ap.PI/180)];var o=1/(aM(ap.abs(p[2]),ap.abs(p[3]))||1);
p[2]*=o;p[3]*=o;if(p[2]<0){p[0]=-p[2];p[2]=0}if(p[3]<0){p[1]=-p[3];p[3]=0}}z=t(z);
if(!z){return null}o=A.getAttribute(bs);(o=o.match(/^url\(#(.*)\)$/))&&y.defs.removeChild(bj.getElementById(o[1]));
o=aq(w+"Gradient");o.id="r"+(ay._id++)[aZ](36);aq(o,w=="radial"?{fx:u,fy:v}:{x1:p[0],y1:p[1],x2:p[2],y2:p[3]});
y.defs[an](o);y=0;for(p=z[aw];y<p;y++){var m=aq("stop");aq(m,{offset:z[y].offset?z[y].offset:!y?"0%":"100%","stop-color":z[y].color||"#fff"});
o[an](m)}aq(A,{fill:"url(#"+o.id+")",opacity:1,"fill-opacity":1});s.fill=at;s.opacity=1;
return s.fillOpacity=1},bP=function(o){var m=o.getBBox();aq(o.pattern,{patternTransform:ay.format("translate({0},{1})",m.x,m.y)})
},aX=function(F,E){var D={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},C=F.node,z=F.attrs,A=F.rotate();
function y(I,K){if(K=D[ax.call(K)]){var H=I.attrs["stroke-width"]||"1";I={round:H,square:H,butt:0}[I.attrs["stroke-linecap"]||E["stroke-linecap"]]||0;
for(var M=[],G=K[aw];G--;){M[G]=K[G]*H+(G%2?1:-1)*I}aq(C,{"stroke-dasharray":M[aU](",")})
}}E[am]("rotation")&&(A=E.rotation);var w=(A+at)[a7](aP);if(w.length-1){w[1]=+w[1];
w[2]=+w[2]}else{w=null}bk(A)&&F.rotate(0,true);for(var v in E){if(E[am](v)){if(k[am](v)){var u=E[v];
z[v]=u;switch(v){case"blur":F.blur(u);break;case"rotation":F.rotate(u,true);break;
case"href":case"title":case"target":var s=C.parentNode;if(ax.call(s.tagName)!="a"){var p=aq("a");
s.insertBefore(p,C);p[an](C);s=p}s.setAttributeNS(F.paper.xlink,v,u);break;case"cursor":C.style.cursor=u;
break;case"clip-rect":s=(u+at)[a7](aP);if(s[aw]==4){F.clip&&F.clip.parentNode.parentNode.removeChild(F.clip.parentNode);
var m=aq("clipPath");p=aq("rect");m.id="r"+(ay._id++)[aZ](36);aq(p,{x:s[0],y:s[1],width:s[2],height:s[3]});
m[an](p);F.paper.defs[an](m);aq(C,{"clip-path":"url(#"+m.id+")"});F.clip=p}if(!u){(u=bj.getElementById(C.getAttribute("clip-path")[a5](/(^url\(#|\)$)/g,at)))&&u.parentNode.removeChild(u);
aq(C,{"clip-path":at});delete F.clip}break;case"path":if(F.type=="path"){aq(C,{d:u?(z.path=h(u)):"M0,0"})
}break;case"width":C[aO](v,u);if(z.fx){v="x";u=z.x}else{break}case"x":if(z.fx){u=-z.x-(z.width||0)
}case"rx":if(v=="rx"&&F.type=="rect"){break}case"cx":w&&(v=="x"||v=="cx")&&(w[1]+=u-z[v]);
C[aO](v,a9(u));F.pattern&&bP(F);break;case"height":C[aO](v,u);if(z.fy){v="y";u=z.y
}else{break}case"y":if(z.fy){u=-z.y-(z.height||0)}case"ry":if(v=="ry"&&F.type=="rect"){break
}case"cy":w&&(v=="y"||v=="cy")&&(w[2]+=u-z[v]);C[aO](v,a9(u));F.pattern&&bP(F);break;
case"r":F.type=="rect"?aq(C,{rx:u,ry:u}):C[aO](v,u);break;case"src":F.type=="image"&&C.setAttributeNS(F.paper.xlink,"href",u);
break;case"stroke-width":C.style.strokeWidth=u;C[aO](v,u);z["stroke-dasharray"]&&y(F,z["stroke-dasharray"]);
break;case"stroke-dasharray":y(F,u);break;case"translation":u=(u+at)[a7](aP);u[0]=+u[0]||0;
u[1]=+u[1]||0;if(w){w[1]+=u[0];w[2]+=u[1]}bG.call(F,u[0],u[1]);break;case"scale":u=(u+at)[a7](aP);
F.scale(+u[0]||1,+u[1]||+u[0]||1,isNaN(bk(u[2]))?null:+u[2],isNaN(bk(u[3]))?null:+u[3]);
break;case bs:if(s=(u+at).match(bE)){m=aq("pattern");var o=aq("image");m.id="r"+(ay._id++)[aZ](36);
aq(m,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});aq(o,{x:0,y:0});o.setAttributeNS(F.paper.xlink,"href",s[1]);
m[an](o);u=bj.createElement("img");u.style.cssText="position:absolute;left:-9999em;top-9999em";
u.onload=function(){aq(m,{width:this.offsetWidth,height:this.offsetHeight});aq(o,{width:this.offsetWidth,height:this.offsetHeight});
bj.body.removeChild(this);F.paper.safari()};bj.body[an](u);u.src=s[1];F.paper.defs[an](m);
C.style.fill="url(#"+m.id+")";aq(C,{fill:"url(#"+m.id+")"});F.pattern=m;F.pattern&&bP(F);
break}s=ay.getRGB(u);if(s.error){if(({circle:1,ellipse:1}[am](F.type)||(u+at).charAt()!="r")&&bz(C,u,F.paper)){z.gradient=u;
z.fill="none";break}}else{delete E.gradient;delete z.gradient;!ay.is(z.opacity,"undefined")&&ay.is(E.opacity,"undefined")&&aq(C,{opacity:z.opacity});
!ay.is(z["fill-opacity"],"undefined")&&ay.is(E["fill-opacity"],"undefined")&&aq(C,{"fill-opacity":z["fill-opacity"]})
}s[am]("o")&&aq(C,{"fill-opacity":s.o/100});case"stroke":s=ay.getRGB(u);C[aO](v,s.hex);
v=="stroke"&&s[am]("o")&&aq(C,{"stroke-opacity":s.o/100});break;case"gradient":(({circle:1,ellipse:1})[am](F.type)||(u+at).charAt()!="r")&&bz(C,u,F.paper);
break;case"opacity":case"fill-opacity":if(z.gradient){if(s=bj.getElementById(C.getAttribute(bs)[a5](/^url\(#|\)$/g,at))){s=s.getElementsByTagName("stop");
s[s[aw]-1][aO]("stop-opacity",u)}break}default:v=="font-size"&&(u=J(u,10)+"px");s=v[a5](/(\-.)/g,function(G){return ah.call(G.substring(1))
});C.style[s]=u;C[aO](v,u);break}}}}bF(F,E);if(w){F.rotate(w.join(aW))}else{bk(A)&&F.rotate(A,true)
}},bi=1.2,bF=function(o,m){if(!(o.type!="text"||!(m[am]("text")||m[am]("font")||m[am]("font-size")||m[am]("x")||m[am]("y")))){var y=o.attrs,w=o.node,u=w.firstChild?J(bj.defaultView.getComputedStyle(w.firstChild,at).getPropertyValue("font-size"),10):10;
if(m[am]("text")){for(y.text=m.text;w.firstChild;){w.removeChild(w.firstChild)}m=(m.text+at)[a7]("\n");
for(var v=0,s=m[aw];v<s;v++){if(m[v]){var p=aq("tspan");v&&aq(p,{dy:u*bi,x:y.x});
p[an](bj.createTextNode(m[v]));w[an](p)}}}else{m=w.getElementsByTagName("tspan");
v=0;for(s=m[aw];v<s;v++){v&&aq(m[v],{dy:u*bi,x:y.x})}}aq(w,{y:y.y});o=o.getBBox();
(o=y.y-(o.y+o.height/2))&&isFinite(o)&&aq(w,{y:y.y+o})}},ar=function(o,m){this[0]=o;
this.id=ay._oid++;this.node=o;o.raphael=this;this.paper=m;this.attrs=this.attrs||{};
this.transformations=[];this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!m.bottom&&(m.bottom=this);
(this.prev=m.top)&&(m.top.next=this);m.top=this;this.next=null};ar[au].rotate=function(o,m,s){if(this.removed){return this
}if(o==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aU](aW)
}return this._.rt.deg}var p=this.getBBox();o=(o+at)[a7](aP);if(o[aw]-1){m=bk(o[1]);
s=bk(o[2])}o=bk(o[0]);if(m!=null){this._.rt.deg=o}else{this._.rt.deg+=o}s==null&&(m=null);
this._.rt.cx=m;this._.rt.cy=s;m=m==null?p.x+p.width/2:m;s=s==null?p.y+p.height/2:s;
if(this._.rt.deg){this.transformations[0]=ay.format("rotate({0} {1} {2})",this._.rt.deg,m,s);
this.clip&&aq(this.clip,{transform:ay.format("rotate({0} {1} {2})",-this._.rt.deg,m,s)})
}else{this.transformations[0]=at;this.clip&&aq(this.clip,{transform:at})}aq(this.node,{transform:this.transformations[aU](aW)});
return this};ar[au].hide=function(){!this.removed&&(this.node.style.display="none");
return this};ar[au].show=function(){!this.removed&&(this.node.style.display="");return this
};ar[au].remove=function(){if(!this.removed){aB(this,this.paper);this.node.parentNode.removeChild(this.node);
for(var m in this){delete this[m]}this.removed=true}};ar[au].getBBox=function(){if(this.removed){return this
}if(this.type=="path"){return ak(this.attrs.path)}if(this.node.style.display=="none"){this.show();
var o=true}var m={};try{m=this.node.getBBox()}catch(v){}finally{m=m||{}}if(this.type=="text"){m={x:m.x,y:Infinity,width:0,height:0};
for(var u=0,p=this.node.getNumberOfChars();u<p;u++){var s=this.node.getExtentOfChar(u);
s.y<m.y&&(m.y=s.y);s.y+s.height-m.y>m.height&&(m.height=s.y+s.height-m.y);s.x+s.width-m.x>m.width&&(m.width=s.x+s.width-m.x)
}}o&&this.hide();return m};ar[au].attr=function(o,m){if(this.removed){return this
}if(o==null){o={};for(var s in this.attrs){if(this.attrs[am](s)){o[s]=this.attrs[s]
}}this._.rt.deg&&(o.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(o.scale=this.scale());
o.gradient&&o.fill=="none"&&(o.fill=o.gradient)&&delete o.gradient;return o}if(m==null&&ay.is(o,e)){if(o=="translation"){return bG.call(this)
}if(o=="rotation"){return this.rotate()}if(o=="scale"){return this.scale()}if(o==bs&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[o]}if(m==null&&ay.is(o,aQ)){m={};s=0;for(var p=o.length;s<p;s++){m[o[s]]=this.attr(o[s])
}return m}if(m!=null){s={};s[o]=m;aX(this,s)}else{o!=null&&ay.is(o,"object")&&aX(this,o)
}return this};ar[au].toFront=function(){if(this.removed){return this}this.node.parentNode[an](this.node);
var m=this.paper;m.top!=this&&bH(this,m);return this};ar[au].toBack=function(){if(this.removed){return this
}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);
bq(this,this.paper)}return this};ar[au].insertAfter=function(o){if(this.removed){return this
}var m=o.node;m.nextSibling?m.parentNode.insertBefore(this.node,m.nextSibling):m.parentNode[an](this.node);
aL(this,o,this.paper);return this};ar[au].insertBefore=function(o){if(this.removed){return this
}var m=o.node;m.parentNode.insertBefore(this.node,m);ao(this,o,this.paper);return this
};ar[au].blur=function(o){var m=this;if(+o!==0){var s=aq("filter"),p=aq("feGaussianBlur");
m.attrs.blur=o;s.id="r"+(ay._id++)[aZ](36);aq(p,{stdDeviation:+o||1.5});s.appendChild(p);
m.paper.defs.appendChild(s);m._blur=s;aq(m.node,{filter:"url(#"+s.id+")"})}else{if(m._blur){m._blur.parentNode.removeChild(m._blur);
delete m._blur;delete m.attrs.blur}m.node.removeAttribute("filter")}};var br=function(o,m,u,s){m=a9(m);
u=a9(u);var p=aq("circle");o.canvas&&o.canvas[an](p);o=new ar(p,o);o.attrs={cx:m,cy:u,r:s,fill:"none",stroke:"#000"};
o.type="circle";aq(p,o.attrs);return o},aV=function(o,m,w,v,s,u){m=a9(m);w=a9(w);
var p=aq("rect");o.canvas&&o.canvas[an](p);o=new ar(p,o);o.attrs={x:m,y:w,width:v,height:s,r:u||0,rx:u||0,ry:u||0,fill:"none",stroke:"#000"};
o.type="rect";aq(p,o.attrs);return o},av=function(o,m,v,u,p){m=a9(m);v=a9(v);var s=aq("ellipse");
o.canvas&&o.canvas[an](s);o=new ar(s,o);o.attrs={cx:m,cy:v,rx:u,ry:p,fill:"none",stroke:"#000"};
o.type="ellipse";aq(s,o.attrs);return o},B=function(o,m,w,v,s,u){var p=aq("image");
aq(p,{x:w,y:v,width:s,height:u,preserveAspectRatio:"none"});p.setAttributeNS(o.xlink,"href",m);
o.canvas&&o.canvas[an](p);o=new ar(p,o);o.attrs={x:w,y:v,width:s,height:u,src:m};
o.type="image";return o},c=function(o,m,u,s){var p=aq("text");aq(p,{x:m,y:u,"text-anchor":"middle"});
o.canvas&&o.canvas[an](p);o=new ar(p,o);o.attrs={x:m,y:u,"text-anchor":"middle",text:s,font:k.font,stroke:"none",fill:"#000"};
o.type="text";aX(o,o.attrs);return o},bJ=function(o,m){this.width=o||this.width;this.height=m||this.height;
this.canvas[aO]("width",this.width);this.canvas[aO]("height",this.height);return this
},bL=function(){var o=a[a2](0,arguments),m=o&&o.container,v=o.x,u=o.y,p=o.width;o=o.height;
if(!m){throw new Error("SVG container not found.")}var s=aq("svg");v=v||0;u=u||0;
p=p||512;o=o||342;aq(s,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:p,height:o});
if(m==1){s.style.cssText="position:absolute;left:"+v+"px;top:"+u+"px";bj.body[an](s)
}else{m.firstChild?m.insertBefore(s,m.firstChild):m[an](s)}m=new a8;m.width=p;m.height=o;
m.canvas=s;i.call(m,m,ay.fn);m.clear();return m};a8[au].clear=function(){for(var m=this.canvas;
m.firstChild;){m.removeChild(m.firstChild)}this.bottom=this.top=null;(this.desc=aq("desc"))[an](bj.createTextNode("Created with Rapha\u00ebl"));
m[an](this.desc);m[an](this.defs=aq("defs"))};a8[au].remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);
for(var m in this){this[m]=x(m)}}}if(ay.vml){var bt={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},bo=/([clmz]),?([^clmz]*)/gi,bK=/-?[^,\s-]+/g,be=1000+aW+1000,ad=10,aF={path:1,rect:1},bu=function(o){var m=/[ahqstv]/ig,y=h;
(o+at).match(m)&&(y=aI);m=/[clmz]/g;if(y==h&&!(o+at).match(m)){return o=(o+at)[a5](bo,function(C,A,z){var F=[],D=ax.call(A)=="m",E=bt[A];
z[a5](bK,function(G){if(D&&F[aw]==2){E+=F+bt[A=="m"?"l":"L"];F=[]}F[bf](a9(G*ad))
});return E+F})}m=y(o);var w;o=[];for(var u=0,v=m[aw];u<v;u++){y=m[u];w=ax.call(m[u][0]);
w=="z"&&(w="x");for(var s=1,p=y[aw];s<p;s++){w+=a9(y[s]*ad)+(s!=p-1?",":at)}o[bf](w)
}return o[aU](aW)};ay[aZ]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\u00ebl "+this.version
};bI=function(o,m){var u=aT("group");u.style.cssText="position:absolute;left:0;top:0;width:"+m.width+"px;height:"+m.height+"px";
u.coordsize=m.coordsize;u.coordorigin=m.coordorigin;var s=aT("shape"),p=s.style;p.width=m.width+"px";
p.height=m.height+"px";s.coordsize=be;s.coordorigin=m.coordorigin;u[an](s);s=new ar(s,u,m);
p={fill:"none",stroke:"#000"};o&&(p.path=o);s.isAbsolute=true;s.type="path";s.path=[];
s.Path=at;aX(s,p);m.canvas[an](u);return s};aX=function(A,z){A.attrs=A.attrs||{};
var y=A.node,w=A.attrs,u=y.style,v;v=(z.x!=w.x||z.y!=w.y||z.width!=w.width||z.height!=w.height||z.r!=w.r)&&A.type=="rect";
var s=A;for(var p in z){if(z[am](p)){w[p]=z[p]}}if(v){w.path=a1(w.x,w.y,w.width,w.height,w.r);
A.X=w.x;A.Y=w.y;A.W=w.width;A.H=w.height}z.href&&(y.href=z.href);z.title&&(y.title=z.title);
z.target&&(y.target=z.target);z.cursor&&(u.cursor=z.cursor);"blur" in z&&A.blur(z.blur);
if(z.path&&A.type=="path"||v){y.path=bu(w.path)}z.rotation!=null&&A.rotate(z.rotation,true);
if(z.translation){v=(z.translation+at)[a7](aP);bG.call(A,v[0],v[1]);if(A._.rt.cx!=null){A._.rt.cx+=+v[0];
A._.rt.cy+=+v[1];A.setBox(A.attrs,v[0],v[1])}}if(z.scale){v=(z.scale+at)[a7](aP);
A.scale(+v[0]||1,+v[1]||+v[0]||1,+v[2]||null,+v[3]||null)}if("clip-rect" in z){v=(z["clip-rect"]+at)[a7](aP);
if(v[aw]==4){v[2]=+v[2]+ +v[0];v[3]=+v[3]+ +v[1];p=y.clipRect||bj.createElement("div");
var o=p.style,m=y.parentNode;o.clip=ay.format("rect({1}px {2}px {3}px {0}px)",v);
if(!y.clipRect){o.position="absolute";o.top=0;o.left=0;o.width=A.paper.width+"px";
o.height=A.paper.height+"px";m.parentNode.insertBefore(p,m);p[an](m);y.clipRect=p
}}if(!z["clip-rect"]){y.clipRect&&(y.clipRect.style.clip=at)}}if(A.type=="image"&&z.src){y.src=z.src
}if(A.type=="image"&&z.opacity){y.filterOpacity=aC+".Alpha(opacity="+z.opacity*100+")";
u.filter=(y.filterMatrix||at)+(y.filterOpacity||at)}z.font&&(u.font=z.font);z["font-family"]&&(u.fontFamily='"'+z["font-family"][a7](",")[0][a5](/^['"]+|['"]+$/g,at)+'"');
z["font-size"]&&(u.fontSize=z["font-size"]);z["font-weight"]&&(u.fontWeight=z["font-weight"]);
z["font-style"]&&(u.fontStyle=z["font-style"]);if(z.opacity!=null||z["stroke-width"]!=null||z.fill!=null||z.stroke!=null||z["stroke-width"]!=null||z["stroke-opacity"]!=null||z["fill-opacity"]!=null||z["stroke-dasharray"]!=null||z["stroke-miterlimit"]!=null||z["stroke-linejoin"]!=null||z["stroke-linecap"]!=null){y=A.shape||y;
u=y.getElementsByTagName(bs)&&y.getElementsByTagName(bs)[0];v=false;!u&&(v=u=aT(bs));
if("fill-opacity" in z||"opacity" in z){A=((+w["fill-opacity"]+1||2)-1)*((+w.opacity+1||2)-1)*((+ay.getRGB(z.fill).o+1||2)-1);
A<0&&(A=0);A>1&&(A=1);u.opacity=A}z.fill&&(u.on=true);if(u.on==null||z.fill=="none"){u.on=false
}if(u.on&&z.fill){if(A=z.fill.match(bE)){u.src=A[1];u.type="tile"}else{u.color=ay.getRGB(z.fill).hex;
u.src=at;u.type="solid";if(ay.getRGB(z.fill).error&&(s.type in {circle:1,ellipse:1}||(z.fill+at).charAt()!="r")&&bz(s,z.fill)){w.fill="none";
w.gradient=z.fill}}}v&&y[an](u);u=y.getElementsByTagName("stroke")&&y.getElementsByTagName("stroke")[0];
v=false;!u&&(v=u=aT("stroke"));if(z.stroke&&z.stroke!="none"||z["stroke-width"]||z["stroke-opacity"]!=null||z["stroke-dasharray"]||z["stroke-miterlimit"]||z["stroke-linejoin"]||z["stroke-linecap"]){u.on=true
}(z.stroke=="none"||u.on==null||z.stroke==0||z["stroke-width"]==0)&&(u.on=false);
A=ay.getRGB(z.stroke);u.on&&z.stroke&&(u.color=A.hex);A=((+w["stroke-opacity"]+1||2)-1)*((+w.opacity+1||2)-1)*((+A.o+1||2)-1);
p=(bk(z["stroke-width"])||1)*0.75;A<0&&(A=0);A>1&&(A=1);z["stroke-width"]==null&&(p=w["stroke-width"]);
z["stroke-width"]&&(u.weight=p);p&&p<1&&(A*=p)&&(u.weight=1);u.opacity=A;z["stroke-linejoin"]&&(u.joinstyle=z["stroke-linejoin"]||"miter");
u.miterlimit=z["stroke-miterlimit"]||8;z["stroke-linecap"]&&(u.endcap=z["stroke-linecap"]=="butt"?"flat":z["stroke-linecap"]=="square"?"square":"round");
if(z["stroke-dasharray"]){A={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};
u.dashstyle=A[am](z["stroke-dasharray"])?A[z["stroke-dasharray"]]:at}v&&y[an](u)}if(s.type=="text"){u=s.paper.span.style;
w.font&&(u.font=w.font);w["font-family"]&&(u.fontFamily=w["font-family"]);w["font-size"]&&(u.fontSize=w["font-size"]);
w["font-weight"]&&(u.fontWeight=w["font-weight"]);w["font-style"]&&(u.fontStyle=w["font-style"]);
s.node.string&&(s.paper.span.innerHTML=(s.node.string+at)[a5](/</g,"&#60;")[a5](/&/g,"&#38;")[a5](/\n/g,"<br>"));
s.W=w.w=s.paper.span.offsetWidth;s.H=w.h=s.paper.span.offsetHeight;s.X=w.x;s.Y=w.y+a9(s.H/2);
switch(w["text-anchor"]){case"start":s.node.style["v-text-align"]="left";s.bbx=a9(s.W/2);
break;case"end":s.node.style["v-text-align"]="right";s.bbx=-a9(s.W/2);break;default:s.node.style["v-text-align"]="center";
break}}};bz=function(o,m){o.attrs=o.attrs||{};var y="linear",w=".5 .5";o.attrs.gradient=m;
m=(m+at)[a5](b,function(C,A,z){y="radial";if(A&&z){A=bk(A);z=bk(z);bh(A-0.5,2)+bh(z-0.5,2)>0.25&&(z=ap.sqrt(0.25-bh(A-0.5,2))*((z>0.5)*2-1)+0.5);
w=A+aW+z}return at});m=m[a7](/\s*\-\s*/);if(y=="linear"){var u=m.shift();u=-bk(u);
if(isNaN(u)){return null}}var v=t(m);if(!v){return null}o=o.shape||o.node;m=o.getElementsByTagName(bs)[0]||aT(bs);
!m.parentNode&&o.appendChild(m);if(v[aw]){m.on=true;m.method="none";m.color=v[0].color;
m.color2=v[v[aw]-1].color;o=[];for(var s=0,p=v[aw];s<p;s++){v[s].offset&&o[bf](v[s].offset+aW+v[s].color)
}m.colors&&(m.colors.value=o[aw]?o[aU]():"0% "+m.color);if(y=="radial"){m.type="gradientradial";
m.focus="100%";m.focussize=w;m.focusposition=w}else{m.type="gradient";m.angle=(270-u)%360
}}return 1};ar=function(o,m,p){this[0]=o;this.id=ay._oid++;this.node=o;o.raphael=this;
this.Y=this.X=0;this.attrs={};this.Group=m;this.paper=p;this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};
!p.bottom&&(p.bottom=this);(this.prev=p.top)&&(p.top.next=this);p.top=this;this.next=null
};ar[au].rotate=function(o,m,p){if(this.removed){return this}if(o==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aU](aW)
}return this._.rt.deg}o=(o+at)[a7](aP);if(o[aw]-1){m=bk(o[1]);p=bk(o[2])}o=bk(o[0]);
if(m!=null){this._.rt.deg=o}else{this._.rt.deg+=o}p==null&&(m=null);this._.rt.cx=m;
this._.rt.cy=p;this.setBox(this.attrs,m,p);this.Group.style.rotation=this._.rt.deg;
return this};ar[au].setBox=function(z,y,w){if(this.removed){return this}var v=this.Group.style,s=this.shape&&this.shape.style||this.node.style;
z=z||{};for(var u in z){if(z[am](u)){this.attrs[u]=z[u]}}y=y||this._.rt.cx;w=w||this._.rt.cy;
var p=this.attrs,o;switch(this.type){case"circle":z=p.cx-p.r;u=p.cy-p.r;o=p=p.r*2;
break;case"ellipse":z=p.cx-p.rx;u=p.cy-p.ry;o=p.rx*2;p=p.ry*2;break;case"image":z=+p.x;
u=+p.y;o=p.width||0;p=p.height||0;break;case"text":this.textpath.v=["m",a9(p.x),", ",a9(p.y-2),"l",a9(p.x)+1,", ",a9(p.y-2)][aU](at);
z=p.x-a9(this.W/2);u=p.y-this.H/2;o=this.W;p=this.H;break;case"rect":case"path":if(this.attrs.path){p=ak(this.attrs.path);
z=p.x;u=p.y;o=p.width;p=p.height}else{u=z=0;o=this.paper.width;p=this.paper.height
}break;default:u=z=0;o=this.paper.width;p=this.paper.height;break}y=y==null?z+o/2:y;
w=w==null?u+p/2:w;y=y-this.paper.width/2;w=w-this.paper.height/2;var m;v.left!=(m=y+"px")&&(v.left=m);
v.top!=(m=w+"px")&&(v.top=m);this.X=aF[am](this.type)?-y:z;this.Y=aF[am](this.type)?-w:u;
this.W=o;this.H=p;if(aF[am](this.type)){s.left!=(m=-y*ad+"px")&&(s.left=m);s.top!=(m=-w*ad+"px")&&(s.top=m)
}else{if(this.type=="text"){s.left!=(m=-y+"px")&&(s.left=m);s.top!=(m=-w+"px")&&(s.top=m)
}else{v.width!=(m=this.paper.width+"px")&&(v.width=m);v.height!=(m=this.paper.height+"px")&&(v.height=m);
s.left!=(m=z-y+"px")&&(s.left=m);s.top!=(m=u-w+"px")&&(s.top=m);s.width!=(m=o+"px")&&(s.width=m);
s.height!=(m=p+"px")&&(s.height=m)}}};ar[au].hide=function(){!this.removed&&(this.Group.style.display="none");
return this};ar[au].show=function(){!this.removed&&(this.Group.style.display="block");
return this};ar[au].getBBox=function(){if(this.removed){return this}if(aF[am](this.type)){return ak(this.attrs.path)
}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H}};ar[au].remove=function(){if(!this.removed){aB(this,this.paper);
this.node.parentNode.removeChild(this.node);this.Group.parentNode.removeChild(this.Group);
this.shape&&this.shape.parentNode.removeChild(this.shape);for(var m in this){delete this[m]
}this.removed=true}};ar[au].attr=function(o,m){if(this.removed){return this}if(o==null){o={};
for(var s in this.attrs){if(this.attrs[am](s)){o[s]=this.attrs[s]}}this._.rt.deg&&(o.rotation=this.rotate());
(this._.sx!=1||this._.sy!=1)&&(o.scale=this.scale());o.gradient&&o.fill=="none"&&(o.fill=o.gradient)&&delete o.gradient;
return o}if(m==null&&ay.is(o,e)){if(o=="translation"){return bG.call(this)}if(o=="rotation"){return this.rotate()
}if(o=="scale"){return this.scale()}if(o==bs&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[o]}if(this.attrs&&m==null&&ay.is(o,aQ)){var p={};s=0;for(m=o[aw];
s<m;s++){p[o[s]]=this.attr(o[s])}return p}if(m!=null){p={};p[o]=m}m==null&&ay.is(o,"object")&&(p=o);
if(p){if(p.text&&this.type=="text"){this.node.string=p.text}aX(this,p);if(p.gradient&&({circle:1,ellipse:1}[am](this.type)||(p.gradient+at).charAt()!="r")){bz(this,p.gradient)
}(!aF[am](this.type)||this._.rt.deg)&&this.setBox(this.attrs)}return this};ar[au].toFront=function(){!this.removed&&this.Group.parentNode[an](this.Group);
this.paper.top!=this&&bH(this,this.paper);return this};ar[au].toBack=function(){if(this.removed){return this
}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);
bq(this,this.paper)}return this};ar[au].insertAfter=function(m){if(this.removed){return this
}m.Group.nextSibling?m.Group.parentNode.insertBefore(this.Group,m.Group.nextSibling):m.Group.parentNode[an](this.Group);
aL(this,m,this.paper);return this};ar[au].insertBefore=function(m){if(this.removed){return this
}m.Group.parentNode.insertBefore(this.Group,m.Group);ao(this,m,this.paper);return this
};var a3=/ progid:\S+Blur\([^\)]+\)/g;ar[au].blur=function(o){var m=this.node.style,p=m.filter;
p=p.replace(a3,"");if(+o!==0){this.attrs.blur=o;m.filter=p+aC+".Blur(pixelradius="+(+o||1.5)+")";
m.margin=Raphael.format("-{0}px 0 0 -{0}px",Math.round(+o||1.5))}else{m.filter=p;
m.margin=0;delete this.attrs.blur}};br=function(o,m,v,u){var p=aT("group"),s=aT("oval");
p.style.cssText="position:absolute;left:0;top:0;width:"+o.width+"px;height:"+o.height+"px";
p.coordsize=be;p.coordorigin=o.coordorigin;p[an](s);s=new ar(s,p,o);s.type="circle";
aX(s,{stroke:"#000",fill:"none"});s.attrs.cx=m;s.attrs.cy=v;s.attrs.r=u;s.setBox({x:m-u,y:v-u,width:u*2,height:u*2});
o.canvas[an](p);return s};function a1(o,m,u,s,p){return p?ay.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z",o+p,m,u-p*2,p,-p,s-p*2,p*2-u,p*2-s):ay.format("M{0},{1}l{2},0,0,{3},{4},0z",o,m,u,s,-u)
}aV=function(o,m,y,w,u,v){var s=a1(m,y,w,u,v);o=o.path(s);var p=o.attrs;o.X=p.x=m;
o.Y=p.y=y;o.W=p.width=w;o.H=p.height=u;p.r=v;p.path=s;o.type="rect";return o};av=function(o,m,w,v,s){var u=aT("group"),p=aT("oval");
u.style.cssText="position:absolute;left:0;top:0;width:"+o.width+"px;height:"+o.height+"px";
u.coordsize=be;u.coordorigin=o.coordorigin;u[an](p);p=new ar(p,u,o);p.type="ellipse";
aX(p,{stroke:"#000"});p.attrs.cx=m;p.attrs.cy=w;p.attrs.rx=v;p.attrs.ry=s;p.setBox({x:m-v,y:w-s,width:v*2,height:s*2});
o.canvas[an](u);return p};B=function(o,m,y,w,u,v){var s=aT("group"),p=aT("image");
s.style.cssText="position:absolute;left:0;top:0;width:"+o.width+"px;height:"+o.height+"px";
s.coordsize=be;s.coordorigin=o.coordorigin;p.src=m;s[an](p);p=new ar(p,s,o);p.type="image";
p.attrs.src=m;p.attrs.x=y;p.attrs.y=w;p.attrs.w=u;p.attrs.h=v;p.setBox({x:y,y:w,width:u,height:v});
o.canvas[an](s);return p};c=function(z,y,w,v){var s=aT("group"),u=aT("shape"),p=u.style,o=aT("path"),m=aT("textpath");
s.style.cssText="position:absolute;left:0;top:0;width:"+z.width+"px;height:"+z.height+"px";
s.coordsize=be;s.coordorigin=z.coordorigin;o.v=ay.format("m{0},{1}l{2},{1}",a9(y*10),a9(w*10),a9(y*10)+1);
o.textpathok=true;p.width=z.width;p.height=z.height;m.string=v+at;m.on=true;u[an](m);
u[an](o);s[an](u);p=new ar(m,s,z);p.shape=u;p.textpath=o;p.type="text";p.attrs.text=v;
p.attrs.x=y;p.attrs.y=w;p.attrs.w=1;p.attrs.h=1;aX(p,{font:k.font,stroke:"none",fill:"#000"});
p.setBox();z.canvas[an](s);return p};bJ=function(o,m){var p=this.canvas.style;o==+o&&(o+="px");
m==+m&&(m+="px");p.width=o;p.height=m;p.clip="rect(0 "+o+" "+m+" 0)";return this};
var aT;bj.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!bj.namespaces.rvml&&bj.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
aT=function(m){return bj.createElement("<rvml:"+m+' class="rvml">')}}catch(ag){aT=function(m){return bj.createElement("<"+m+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
}}bL=function(){var o=a[a2](0,arguments),m=o.container,y=o.height,w=o.width,u=o.x;
o=o.y;if(!m){throw new Error("VML container not found.")}var v=new a8,s=v.canvas=bj.createElement("div"),p=s.style;
u=u||0;o=o||0;w=w||512;y=y||342;w==+w&&(w+="px");y==+y&&(y+="px");v.width=1000;v.height=1000;
v.coordsize=ad*1000+aW+ad*1000;v.coordorigin="0 0";v.span=bj.createElement("span");
v.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
s[an](v.span);p.cssText=ay.format("width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",w,y);
if(m==1){bj.body[an](s);p.left=u+"px";p.top=o+"px";p.position="absolute"}else{m.firstChild?m.insertBefore(s,m.firstChild):m[an](s)
}i.call(v,v,ay.fn);return v};a8[au].clear=function(){this.canvas.innerHTML=at;this.span=bj.createElement("span");
this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
this.canvas[an](this.span);this.bottom=this.top=null};a8[au].remove=function(){this.canvas.parentNode.removeChild(this.canvas);
for(var m in this){this[m]=x(m)}return true}}a8[au].safari=/^Apple|^Google/.test(aN.navigator.vendor)&&(!(aN.navigator.userAgent.indexOf("Version/4.0")+1)||aN.navigator.platform.slice(0,2)=="iP")?function(){var m=this.rect(-99,-99,this.width+99,this.height+99);
aN.setTimeout(function(){m.remove()})}:function(){};function aA(){this.returnValue=false
}function ac(){return this.originalEvent.preventDefault()}function g(){this.cancelBubble=true
}function bN(){return this.originalEvent.stopPropagation()}var by=function(){if(bj.addEventListener){return function(o,m,v,u){var p=bw&&a6[m]?a6[m]:m;
function s(z){if(bw&&a6[am](m)){for(var y=0,w=z.targetTouches&&z.targetTouches.length;
y<w;y++){if(z.targetTouches[y].target==o){w=z;z=z.targetTouches[y];z.originalEvent=w;
z.preventDefault=ac;z.stopPropagation=bN;break}}}return v.call(u,z)}o.addEventListener(p,s,false);
return function(){o.removeEventListener(p,s,false);return true}}}else{if(bj.attachEvent){return function(o,m,v,u){function p(w){w=w||aN.event;
w.preventDefault=w.preventDefault||aA;w.stopPropagation=w.stopPropagation||g;return v.call(u,w)
}o.attachEvent("on"+m,p);function s(){o.detachEvent("on"+m,p);return true}return s
}}}}();for(a4=bS[aw];a4--;){(function(m){ay[m]=ar[au][m]=function(o){if(ay.is(o,"function")){this.events=this.events||[];
this.events.push({name:m,f:o,unbind:by(this.shape||this.node||bj,m,o,this)})}return this
};ay["un"+m]=ar[au]["un"+m]=function(o){for(var s=this.events,p=s[aw];p--;){if(s[p].name==m&&s[p].f==o){s[p].unbind();
s.splice(p,1);!s.length&&delete this.events;return this}}return this}})(bS[a4])}ar[au].hover=function(o,m){return this.mouseover(o).mouseout(m)
};ar[au].unhover=function(o,m){return this.unmouseover(o).unmouseout(m)};ar[au].drag=function(o,m,v){this._drag={};
var u=this.mousedown(function(w){(w.originalEvent?w.originalEvent:w).preventDefault();
this._drag.x=w.clientX;this._drag.y=w.clientY;this._drag.id=w.identifier;m&&m.call(this,w.clientX,w.clientY);
Raphael.mousemove(p).mouseup(s)});function p(C){var A=C.clientX,z=C.clientY;if(bw){for(var y=C.touches.length,w;
y--;){w=C.touches[y];if(w.identifier==u._drag.id){A=w.clientX;z=w.clientY;(C.originalEvent?C.originalEvent:C).preventDefault();
break}}}else{C.preventDefault()}o&&o.call(u,A-u._drag.x,z-u._drag.y,A,z)}function s(){u._drag={};
Raphael.unmousemove(p).unmouseup(s);v&&v.call(u)}return this};a8[au].circle=function(o,m,p){return br(this,o||0,m||0,p||0)
};a8[au].rect=function(o,m,u,s,p){return aV(this,o||0,m||0,u||0,s||0,p||0)};a8[au].ellipse=function(o,m,s,p){return av(this,o||0,m||0,s||0,p||0)
};a8[au].path=function(m){m&&!ay.is(m,e)&&!ay.is(m[0],aQ)&&(m+=at);return bI(ay.format[a2](ay,arguments),this)
};a8[au].image=function(o,m,u,s,p){return B(this,o||"about:blank",m||0,u||0,s||0,p||0)
};a8[au].text=function(o,m,p){return c(this,o||0,m||0,p||at)};a8[au].set=function(m){arguments[aw]>1&&(m=Array[au].splice.call(arguments,0,arguments[aw]));
return new aK(m)};a8[au].setSize=bJ;a8[au].top=a8[au].bottom=null;a8[au].raphael=ay;
function az(){return this.x+aW+this.y}ar[au].resetScale=function(){if(this.removed){return this
}this._.sx=1;this._.sy=1;this.attrs.scale="1 1"};ar[au].scale=function(O,N,M,K){if(this.removed){return this
}if(O==null&&N==null){return{x:this._.sx,y:this._.sy,toString:az}}N=N||O;!+N&&(N=O);
var H,I,G=this.attrs;if(O!=0){var F=this.getBBox(),E=F.x+F.width/2,D=F.y+F.height/2;
H=O/this._.sx;I=N/this._.sy;M=+M||M==0?M:E;K=+K||K==0?K:D;F=~~(O/ap.abs(O));var A=~~(N/ap.abs(N)),z=this.node.style,u=M+(E-M)*H;
D=K+(D-K)*I;switch(this.type){case"rect":case"image":var w=G.width*F*H,C=G.height*A*I;
this.attr({height:C,r:G.r*bB(F*H,A*I),width:w,x:u-w/2,y:D-C/2});break;case"circle":case"ellipse":this.attr({rx:G.rx*F*H,ry:G.ry*A*I,r:G.r*bB(F*H,A*I),cx:u,cy:D});
break;case"text":this.attr({x:u,y:D});break;case"path":E=bn(G.path);for(var s=true,m=0,v=E[aw];
m<v;m++){var p=E[m],o=ah.call(p[0]);if(!(o=="M"&&s)){s=false;if(o=="A"){p[E[m][aw]-2]*=H;
p[E[m][aw]-1]*=I;p[1]*=F*H;p[2]*=A*I;p[5]=+!(F+A?!+p[5]:+p[5])}else{if(o=="H"){o=1;
for(var y=p[aw];o<y;o++){p[o]*=H}}else{if(o=="V"){o=1;for(y=p[aw];o<y;o++){p[o]*=I
}}else{o=1;for(y=p[aw];o<y;o++){p[o]*=o%2?H:I}}}}}}I=ak(E);H=u-I.x-I.width/2;I=D-I.y-I.height/2;
E[0][1]+=H;E[0][2]+=I;this.attr({path:E});break}if(this.type in {text:1,image:1}&&(F!=1||A!=1)){if(this.transformations){this.transformations[2]="scale("[a0](F,",",A,")");
this.node[aO]("transform",this.transformations[aU](aW));H=F==-1?-G.x-(w||0):G.x;I=A==-1?-G.y-(C||0):G.y;
this.attr({x:H,y:I});G.fx=F-1;G.fy=A-1}else{this.node.filterMatrix=aC+".Matrix(M11="[a0](F,", M12=0, M21=0, M22=",A,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
z.filter=(this.node.filterMatrix||at)+(this.node.filterOpacity||at)}}else{if(this.transformations){this.transformations[2]=at;
this.node[aO]("transform",this.transformations[aU](aW));G.fx=0;G.fy=0}else{this.node.filterMatrix=at;
z.filter=(this.node.filterMatrix||at)+(this.node.filterOpacity||at)}}G.scale=[O,N,M,K][aU](aW);
this._.sx=O;this._.sy=N}return this};ar[au].clone=function(){if(this.removed){return null
}var m=this.attr();delete m.scale;delete m.translation;return this.paper[this.type]().attr(m)
};var L=aR(function(E,D,C,A,y,z,w,v,u){for(var s=0,p,o=0;o<1.001;o+=0.001){var m=ay.findDotsAtSegment(E,D,C,A,y,z,w,v,o);
o&&(s+=bh(bh(p.x-m.x,2)+bh(p.y-m.y,2),0.5));if(s>=u){return m}p=m}});function bA(o,m){return function(F,E,C){F=aI(F);
for(var D,A,z,y,w="",v={},u=0,p=0,s=F.length;p<s;p++){z=F[p];if(z[0]=="M"){D=+z[1];
A=+z[2]}else{y=bd(D,A,z[1],z[2],z[3],z[4],z[5],z[6]);if(u+y>E){if(m&&!v.start){D=L(D,A,z[1],z[2],z[3],z[4],z[5],z[6],E-u);
w+=["C",D.start.x,D.start.y,D.m.x,D.m.y,D.x,D.y];if(C){return w}v.start=w;w=["M",D.x,D.y+"C",D.n.x,D.n.y,D.end.x,D.end.y,z[5],z[6]][aU]();
u+=y;D=+z[5];A=+z[6];continue}if(!o&&!m){D=L(D,A,z[1],z[2],z[3],z[4],z[5],z[6],E-u);
return{x:D.x,y:D.y,alpha:D.alpha}}}u+=y;D=+z[5];A=+z[6]}w+=z}v.end=w;D=o?u:m?v:ay.findDotsAtSegment(D,A,z[1],z[2],z[3],z[4],z[5],z[6],1);
D.alpha&&(D={x:D.x,y:D.y,alpha:D.alpha});return D}}var bd=aR(function(D,C,A,z,w,y,v,u){for(var s={x:0,y:0},p=0,o=0;
o<1.01;o+=0.01){var m=bO(D,C,A,z,w,y,v,u,o);o&&(p+=bh(bh(s.x-m.x,2)+bh(s.y-m.y,2),0.5));
s=m}return p}),f=bA(1),bp=bA(),bg=bA(0,1);ar[au].getTotalLength=function(){if(this.type=="path"){if(this.node.getTotalLength){return this.node.getTotalLength()
}return f(this.attrs.path)}};ar[au].getPointAtLength=function(m){if(this.type=="path"){return bp(this.attrs.path,m)
}};ar[au].getSubpath=function(o,m){if(this.type=="path"){if(ap.abs(this.getTotalLength()-m)<0.000001){return bg(this.attrs.path,o).end
}m=bg(this.attrs.path,m,1);return o?bg(m,o).end:m}};ay.easing_formulas={linear:function(m){return m
},"<":function(m){return bh(m,3)},">":function(m){return bh(m-1,3)+1},"<>":function(m){m*=2;
if(m<1){return bh(m,3)/2}m-=2;return(bh(m,3)+2)/2},backIn:function(o){var m=1.70158;
return o*o*((m+1)*o-m)},backOut:function(o){o-=1;var m=1.70158;return o*o*((m+1)*o+m)+1
},elastic:function(o){if(o==0||o==1){return o}var m=0.3,p=m/4;return bh(2,-10*o)*ap.sin((o-p)*2*ap.PI/m)+1
},bounce:function(o){var m=7.5625,p=2.75;if(o<1/p){o=m*o*o}else{if(o<2/p){o-=1.5/p;
o=m*o*o+0.75}else{if(o<2.5/p){o-=2.25/p;o=m*o*o+0.9375}else{o-=2.625/p;o=m*o*o+0.984375
}}}return o}};var aS={length:0};function bM(){var M=+new Date;for(var K in aS){if(K!="length"&&aS[am](K)){var I=aS[K];
if(I.stop||I.el.removed){delete aS[K];aS[aw]--}else{var H=M-I.start,F=I.ms,G=I.easing,E=I.from,D=I.diff,C=I.to,A=I.t,y=I.prev||0,w=I.el,s=I.callback,v={},z;
if(H<F){s=ay.easing_formulas[G]?ay.easing_formulas[G](H/F):H/F;for(var p in E){if(E[am](p)){switch(ae[p]){case"along":z=s*F*D[p];
C.back&&(z=C.len-z);G=bp(C[p],z);w.translate(D.sx-D.x||0,D.sy-D.y||0);D.x=G.x;D.y=G.y;
w.translate(G.x-D.sx,G.y-D.sy);C.rot&&w.rotate(D.r+G.alpha,G.x,G.y);break;case aY:z=+E[p]+s*F*D[p];
break;case"colour":z="rgb("+[aG(a9(E[p].r+s*F*D[p].r)),aG(a9(E[p].g+s*F*D[p].g)),aG(a9(E[p].b+s*F*D[p].b))][aU](",")+")";
break;case"path":z=[];G=0;for(var m=E[p][aw];G<m;G++){z[G]=[E[p][G][0]];for(var u=1,o=E[p][G][aw];
u<o;u++){z[G][u]=+E[p][G][u]+s*F*D[p][G][u]}z[G]=z[G][aU](aW)}z=z[aU](aW);break;case"csv":switch(p){case"translation":z=D[p][0]*(H-y);
G=D[p][1]*(H-y);A.x+=z;A.y+=G;z=z+aW+G;break;case"rotation":z=+E[p][0]+s*F*D[p][0];
E[p][1]&&(z+=","+E[p][1]+","+E[p][2]);break;case"scale":z=[+E[p][0]+s*F*D[p][0],+E[p][1]+s*F*D[p][1],2 in C[p]?C[p][2]:at,3 in C[p]?C[p][3]:at][aU](aW);
break;case"clip-rect":z=[];for(G=4;G--;){z[G]=+E[p][G]+s*F*D[p][G]}break}break}v[p]=z
}}w.attr(v);w._run&&w._run.call(w)}else{if(C.along){G=bp(C.along,C.len*!C.back);w.translate(D.sx-(D.x||0)+G.x-D.sx,D.sy-(D.y||0)+G.y-D.sy);
C.rot&&w.rotate(D.r+G.alpha,G.x,G.y)}(A.x||A.y)&&w.translate(-A.x,-A.y);C.scale&&(C.scale+=at);
w.attr(C);delete aS[K];aS[aw]--;w.in_animation=null;ay.is(s,"function")&&s.call(w)
}I.prev=H}}}ay.svg&&w&&w.paper&&w.paper.safari();aS[aw]&&aN.setTimeout(bM)}function aG(m){return aM(bB(m,255),0)
}function bG(o,m){if(o==null){return{x:this._.tx,y:this._.ty,toString:az}}this._.tx+=+o;
this._.ty+=+m;switch(this.type){case"circle":case"ellipse":this.attr({cx:+o+this.attrs.cx,cy:+m+this.attrs.cy});
break;case"rect":case"image":case"text":this.attr({x:+o+this.attrs.x,y:+m+this.attrs.y});
break;case"path":var p=bn(this.attrs.path);p[0][1]+=+o;p[0][2]+=+m;this.attr({path:p});
break}return this}ar[au].animateWith=function(o,m,u,s,p){aS[o.id]&&(m.start=aS[o.id].start);
return this.animate(m,u,s,p)};ar[au].animateAlong=bx();ar[au].animateAlongBack=bx(1);
function bx(m){return function(o,v,u,p){var s={back:m};ay.is(u,"function")?(p=u):(s.rot=u);
o&&o.constructor==ar&&(o=o.attrs.path);o&&(s.along=o);return this.animate(s,v,p)}
}ar[au].onAnimation=function(m){this._run=m||0;return this};ar[au].animate=function(E,D,C,A){if(ay.is(C,"function")||!C){A=C||null
}var y={},z={},w={};for(var v in E){if(E[am](v)){if(ae[am](v)){y[v]=this.attr(v);
y[v]==null&&(y[v]=k[v]);z[v]=E[v];switch(ae[v]){case"along":var u=f(E[v]),s=bp(E[v],u*!!E.back),p=this.getBBox();
w[v]=u/D;w.tx=p.x;w.ty=p.y;w.sx=s.x;w.sy=s.y;z.rot=E.rot;z.back=E.back;z.len=u;E.rot&&(w.r=bk(this.rotate())||0);
break;case aY:w[v]=(z[v]-y[v])/D;break;case"colour":y[v]=ay.getRGB(y[v]);u=ay.getRGB(z[v]);
w[v]={r:(u.r-y[v].r)/D,g:(u.g-y[v].g)/D,b:(u.b-y[v].b)/D};break;case"path":u=aI(y[v],z[v]);
y[v]=u[0];s=u[1];w[v]=[];u=0;for(p=y[v][aw];u<p;u++){w[v][u]=[0];for(var o=1,m=y[v][u][aw];
o<m;o++){w[v][u][o]=(s[u][o]-y[v][u][o])/D}}break;case"csv":s=(E[v]+at)[a7](aP);u=(y[v]+at)[a7](aP);
switch(v){case"translation":y[v]=[0,0];w[v]=[s[0]/D,s[1]/D];break;case"rotation":y[v]=u[1]==s[1]&&u[2]==s[2]?u:[0,s[1],s[2]];
w[v]=[(s[0]-y[v][0])/D,0,0];break;case"scale":E[v]=s;y[v]=(y[v]+at)[a7](aP);w[v]=[(s[0]-y[v][0])/D,(s[1]-y[v][1])/D,0,0];
break;case"clip-rect":y[v]=(y[v]+at)[a7](aP);w[v]=[];for(u=4;u--;){w[v][u]=(s[u]-y[v][u])/D
}break}z[v]=s}}}}this.stop();this.in_animation=1;aS[this.id]={start:E.start||+new Date,ms:D,easing:C,from:y,diff:w,to:z,el:this,callback:A,t:{x:0,y:0}};
++aS[aw]==1&&bM();return this};ar[au].stop=function(){aS[this.id]&&aS[aw]--;delete aS[this.id];
return this};ar[au].translate=function(o,m){return this.attr({translation:o+" "+m})
};ar[au][aZ]=function(){return"Rapha\u00ebl\u2019s object"};ay.ae=aS;function aK(o){this.items=[];
this[aw]=0;this.type="set";if(o){for(var m=0,p=o[aw];m<p;m++){if(o[m]&&(o[m].constructor==ar||o[m].constructor==aK)){this[this.items[aw]]=this.items[this.items[aw]]=o[m];
this[aw]++}}}}aK[au][bf]=function(){for(var o,m,s=0,p=arguments[aw];s<p;s++){if((o=arguments[s])&&(o.constructor==ar||o.constructor==aK)){m=this.items[aw];
this[m]=this.items[m]=o;this[aw]++}}return this};aK[au].pop=function(){delete this[this[aw]--];
return this.items.pop()};for(var ai in ar[au]){if(ar[au][am](ai)){aK[au][ai]=function(m){return function(){for(var o=0,p=this.items[aw];
o<p;o++){this.items[o][m][a2](this.items[o],arguments)}return this}}(ai)}}aK[au].attr=function(o,m){if(o&&ay.is(o,aQ)&&ay.is(o[0],"object")){m=0;
for(var s=o[aw];m<s;m++){this.items[m].attr(o[m])}}else{s=0;for(var p=this.items[aw];
s<p;s++){this.items[s].attr(o,m)}}return this};aK[au].animate=function(z,y,w,v){(ay.is(w,"function")||!w)&&(v=w||null);
var s=this.items[aw],u=s,p,o=this,m;v&&(m=function(){!--s&&v.call(o)});w=ay.is(w,e)?w:m;
for(p=this.items[--u].animate(z,y,w,m);u--;){this.items[u].animateWith(p,z,y,w,m)
}return this};aK[au].insertAfter=function(o){for(var m=this.items[aw];m--;){this.items[m].insertAfter(o)
}return this};aK[au].getBBox=function(){for(var o=[],m=[],v=[],u=[],p=this.items[aw];
p--;){var s=this.items[p].getBBox();o[bf](s.x);m[bf](s.y);v[bf](s.x+s.width);u[bf](s.y+s.height)
}o=bB[a2](0,o);m=bB[a2](0,m);return{x:o,y:m,width:aM[a2](0,v)-o,height:aM[a2](0,u)-m}
};aK[au].clone=function(o){o=new aK;for(var m=0,p=this.items[aw];m<p;m++){o[bf](this.items[m].clone())
}return o};ay.registerFont=function(o){if(!o.face){return o}this.fonts=this.fonts||{};
var m={w:o.w,face:{},glyphs:{}},v=o.face["font-family"];for(var u in o.face){if(o.face[am](u)){m.face[u]=o.face[u]
}}if(this.fonts[v]){this.fonts[v][bf](m)}else{this.fonts[v]=[m]}if(!o.svg){m.face["units-per-em"]=J(o.face["units-per-em"],10);
for(var p in o.glyphs){if(o.glyphs[am](p)){v=o.glyphs[p];m.glyphs[p]={w:v.w,k:{},d:v.d&&"M"+v.d[a5](/[mlcxtrv]/g,function(w){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[w]||"M"
})+"z"};if(v.k){for(var s in v.k){if(v[am](s)){m.glyphs[p].k[s]=v.k[s]}}}}}}return o
};a8[au].getFont=function(o,m,w,v){v=v||"normal";w=w||"normal";m=+m||{normal:400,bold:700,lighter:300,bolder:800}[m]||400;
if(ay.fonts){var s=ay.fonts[o];if(!s){o=new RegExp("(^|\\s)"+o[a5](/[^\w\d\s+!~.:_-]/g,at)+"(\\s|$)","i");
for(var u in ay.fonts){if(ay.fonts[am](u)){if(o.test(u)){s=ay.fonts[u];break}}}}var p;
if(s){u=0;for(o=s[aw];u<o;u++){p=s[u];if(p.face["font-weight"]==m&&(p.face["font-style"]==w||!p.face["font-style"])&&p.face["font-stretch"]==v){break
}}}return p}};a8[au].print=function(E,D,C,A,y,z){z=z||"middle";var w=this.set(),v=(C+at)[a7](at),u=0;
ay.is(A,C)&&(A=this.getFont(A));if(A){C=(y||16)/A.face["units-per-em"];var s=A.face.bbox.split(aP);
y=+s[0];z=+s[1]+(z=="baseline"?s[3]-s[1]+ +A.face.descent:(s[3]-s[1])/2);s=0;for(var p=v[aw];
s<p;s++){var o=s&&A.glyphs[v[s-1]]||{},m=A.glyphs[v[s]];u+=s?(o.w||A.w)+(o.k&&o.k[v[s]]||0):0;
m&&m.d&&w[bf](this.path(m.d).attr({fill:"#000",stroke:"none",translation:[u,0]}))
}w.scale(C,C,y,z).translate(E-y,D-z)}return w};var aE=/\{(\d+)\}/g;ay.format=function(o,m){var p=ay.is(m,aQ)?[0][a0](m):arguments;
o&&ay.is(o,e)&&p[aw]-1&&(o=o[a5](aE,function(u,s){return p[++s]==null?at:p[s]}));
return o||at};ay.ninja=function(){l.was?(Raphael=l.is):delete Raphael;return ay};
ay.el=ar[au];return ay}();
/*
 * Raphael 1.4.3 - JavaScript Vector Library
 *
 * Copyright (c) 2010 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
Raphael=(function(){function aB(){if(aB.is(arguments[0],aW)){var e=arguments[0],E=C[bl](aB,e.splice(0,3+aB.is(e[0],ay))),bq=E.set();
for(var S=0,br=e[o];S<br;S++){var R=e[S]||{};ba.test(R.type)&&bq[f](E[R.type]().attr(R))
}return bq}return C[bl](aB,arguments)}aB.version="1.4.3";var a=/[, ]+/,ba=/^(circle|rect|path|ellipse|text|image)$/,bn="prototype",ac="hasOwnProperty",W=document,aI=window,n={was:Object[bn][ac].call(aI,"Raphael"),is:aI.Raphael},bi=function(){},a6="appendChild",bl="apply",bg="concat",Q="createTouch" in W,aH="",aA=" ",G="split",N="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend"[G](aA),bb={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},aO="join",o="length",bp=String[bn].toLowerCase,ak=Math,h=ak.max,a4=ak.min,ay="number",ab="string",aW="array",aQ="toString",aT="fill",aL=Object[bn][aQ],bd={},a7=ak.pow,f="push",bj=/^(?=[\da-f]$)/,c=/^url\(['"]?([^\)]+?)['"]?\)$/i,D=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+(?:\s*,\s*[\d\.]+)?)\s*\)|rgba?\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%(?:\s*,\s*[\d\.]+%))\s*\)|hs[bl]\(\s*([\d\.]+\s*,\s*[\d\.]+\s*,\s*[\d\.]+)\s*\)|hs[bl]\(\s*([\d\.]+%\s*,\s*[\d\.]+%\s*,\s*[\d\.]+%)\s*\))\s*$/i,Z=ak.round,B="setAttribute",af=parseFloat,O=parseInt,aU=" progid:DXImageTransform.Microsoft",a9=String[bn].toUpperCase,l={blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/",opacity:1,path:"M0,0",r:0,rotation:0,rx:0,ry:0,scale:"1 1",src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",translation:"0 0",width:0,x:0,y:0},ai={along:"along",blur:ay,"clip-rect":"csv",cx:ay,cy:ay,fill:"colour","fill-opacity":ay,"font-size":ay,height:ay,opacity:ay,path:"path",r:ay,rotation:"csv",rx:ay,ry:ay,scale:"csv",stroke:"colour","stroke-opacity":ay,"stroke-width":ay,translation:"csv",width:ay,x:ay,y:ay},bc="replace";
aB.type=(aI.SVGAngle||W.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML");
if(aB.type=="VML"){var aq=W.createElement("div");aq.innerHTML="<!--[if vml]><br><br><![endif]-->";
if(aq.childNodes[o]!=2){return aB.type=null}aq=null}aB.svg=!(aB.vml=aB.type=="VML");
bi[bn]=aB[bn];aB._id=0;aB._oid=0;aB.fn={};aB.is=function(i,e){e=bp.call(e);return(e=="object"&&i===Object(i))||(e=="undefined"&&typeof i==e)||(e=="null"&&i==null)||bp.call(aL.call(i).slice(8,-1))==e
};aB.setWindow=function(e){aI=e;W=aI.document};var aX=function(E){if(aB.vml){var e=/^\s+|\s+$/g;
aX=au(function(S){var bq;S=(S+aH)[bc](e,aH);try{var br=new aI.ActiveXObject("htmlfile");
br.write("<body>");br.close();bq=br.body}catch(bt){bq=aI.createPopup().document.body
}var i=bq.createTextRange();try{bq.style.color=S;var bs=i.queryCommandValue("ForeColor");
bs=((bs&255)<<16)|(bs&65280)|((bs&16711680)>>>16);return"#"+("000000"+bs[aQ](16)).slice(-6)
}catch(bt){return"none"}})}else{var R=W.createElement("i");R.title="Rapha\xebl Colour Picker";
R.style.display="none";W.body[a6](R);aX=au(function(i){R.style.color=i;return W.defaultView.getComputedStyle(R,aH).getPropertyValue("color")
})}return aX(E)};var av=function(){return"hsb("+[this.h,this.s,this.b]+")"},z=function(){return this.hex
};aB.hsb2rgb=au(function(bu,bs,by){if(aB.is(bu,"object")&&"h" in bu&&"s" in bu&&"b" in bu){by=bu.b;
bs=bu.s;bu=bu.h}var S,bq,bz;if(by==0){return{r:0,g:0,b:0,hex:"#000"}}if(bu>1||bs>1||by>1){bu/=255;
bs/=255;by/=255}var br=~~(bu*6),bv=(bu*6)-br,R=by*(1-bs),E=by*(1-(bs*bv)),bA=by*(1-(bs*(1-bv)));
S=[by,E,R,R,bA,by,by][br];bq=[bA,by,by,E,R,R,bA][br];bz=[R,R,bA,by,by,E,R][br];S*=255;
bq*=255;bz*=255;var bw={r:S,g:bq,b:bz,toString:z},e=(~~S)[aQ](16),bt=(~~bq)[aQ](16),bx=(~~bz)[aQ](16);
e=e[bc](bj,"0");bt=bt[bc](bj,"0");bx=bx[bc](bj,"0");bw.hex="#"+e+bt+bx;return bw},aB);
aB.rgb2hsb=au(function(e,i,bs){if(aB.is(e,"object")&&"r" in e&&"g" in e&&"b" in e){bs=e.b;
i=e.g;e=e.r}if(aB.is(e,ab)){var bu=aB.getRGB(e);e=bu.r;i=bu.g;bs=bu.b}if(e>1||i>1||bs>1){e/=255;
i/=255;bs/=255}var br=h(e,i,bs),E=a4(e,i,bs),S,R,bq=br;if(E==br){return{h:0,s:0,b:br}
}else{var bt=(br-E);R=bt/br;if(e==br){S=(i-bs)/bt}else{if(i==br){S=2+((bs-e)/bt)}else{S=4+((e-i)/bt)
}}S/=6;S<0&&S++;S>1&&S--}return{h:S,s:R,b:bq,toString:av}},aB);var aY=/,?([achlmqrstvxz]),?/gi,a0=/\s*,\s*/,j={hs:1,rg:1};
aB._path2string=function(){return this.join(",")[bc](aY,"$1")};function au(R,i,e){function E(){var S=Array[bn].slice.call(arguments,0),br=S[aO]("\u25ba"),bq=E.cache=E.cache||{},bs=E.count=E.count||[];
if(bq[ac](br)){return e?e(bq[br]):bq[br]}bs[o]>=1000&&delete bq[bs.shift()];bs[f](br);
bq[br]=R[bl](i,S);return e?e(bq[br]):bq[br]}return E}aB.getRGB=au(function(i){if(!i||!!((i=i+aH).indexOf("-")+1)){return{r:-1,g:-1,b:-1,hex:"none",error:1}
}if(i=="none"){return{r:-1,g:-1,b:-1,hex:"none"}}!(j[ac](i.substring(0,2))||i.charAt()=="#")&&(i=aX(i));
var br,E,R,bu,bq,bv,bs=i.match(D);if(bs){if(bs[2]){bu=O(bs[2].substring(5),16);R=O(bs[2].substring(3,5),16);
E=O(bs[2].substring(1,3),16)}if(bs[3]){bu=O((bv=bs[3].charAt(3))+bv,16);R=O((bv=bs[3].charAt(2))+bv,16);
E=O((bv=bs[3].charAt(1))+bv,16)}if(bs[4]){bs=bs[4][G](a0);E=af(bs[0]);R=af(bs[1]);
bu=af(bs[2]);bq=af(bs[3])}if(bs[5]){bs=bs[5][G](a0);E=af(bs[0])*2.55;R=af(bs[1])*2.55;
bu=af(bs[2])*2.55;bq=af(bs[3])}if(bs[6]){bs=bs[6][G](a0);E=af(bs[0]);R=af(bs[1]);
bu=af(bs[2]);return aB.hsb2rgb(E,R,bu)}if(bs[7]){bs=bs[7][G](a0);E=af(bs[0])*2.55;
R=af(bs[1])*2.55;bu=af(bs[2])*2.55;return aB.hsb2rgb(E,R,bu)}bs={r:E,g:R,b:bu};var e=(~~E)[aQ](16),S=(~~R)[aQ](16),bt=(~~bu)[aQ](16);
e=e[bc](bj,"0");S=S[bc](bj,"0");bt=bt[bc](bj,"0");bs.hex="#"+e+S+bt;isFinite(af(bq))&&(bs.o=bq);
return bs}return{r:-1,g:-1,b:-1,hex:"none",error:1}},aB);aB.getColor=function(i){var E=this.getColor.start=this.getColor.start||{h:0,s:1,b:i||0.75},e=this.hsb2rgb(E.h,E.s,E.b);
E.h+=0.075;if(E.h>1){E.h=0;E.s-=0.2;E.s<=0&&(this.getColor.start={h:0,s:1,b:E.b})
}return e.hex};aB.getColor.reset=function(){delete this.start};var aJ=/([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,az=/(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig;
aB.parsePathString=au(function(e){if(!e){return null}var E={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},i=[];
if(aB.is(e,aW)&&aB.is(e[0],aW)){i=aK(e)}if(!i[o]){(e+aH)[bc](aJ,function(S,R,bs){var br=[],bq=bp.call(R);
bs[bc](az,function(bu,bt){bt&&br[f](+bt)});if(bq=="m"&&br[o]>2){i[f]([R][bg](br.splice(0,2)));
bq="l";R=R=="m"?"l":"L"}while(br[o]>=E[bq]){i[f]([R][bg](br.splice(0,E[bq])));if(!E[bq]){break
}}})}i[aQ]=aB._path2string;return i});aB.findDotsAtSegment=function(i,e,bF,bD,br,S,bt,bs,bz){var bx=1-bz,bw=a7(bx,3)*i+a7(bx,2)*3*bz*bF+bx*3*bz*bz*br+a7(bz,3)*bt,bu=a7(bx,3)*e+a7(bx,2)*3*bz*bD+bx*3*bz*bz*S+a7(bz,3)*bs,bB=i+2*bz*(bF-i)+bz*bz*(br-2*bF+i),bA=e+2*bz*(bD-e)+bz*bz*(S-2*bD+e),bE=bF+2*bz*(br-bF)+bz*bz*(bt-2*br+bF),bC=bD+2*bz*(S-bD)+bz*bz*(bs-2*S+bD),by=(1-bz)*i+bz*bF,bv=(1-bz)*e+bz*bD,R=(1-bz)*br+bz*bt,E=(1-bz)*S+bz*bs,bq=(90-ak.atan((bB-bE)/(bA-bC))*180/ak.PI);
(bB>bE||bA<bC)&&(bq+=180);return{x:bw,y:bu,m:{x:bB,y:bA},n:{x:bE,y:bC},start:{x:by,y:bv},end:{x:R,y:E},alpha:bq}
};var ae=au(function(bw){if(!bw){return{x:0,y:0,width:0,height:0}}bw=P(bw);var bt=0,bs=0,S=[],E=[],R;
for(var bq=0,bv=bw[o];bq<bv;bq++){R=bw[bq];if(R[0]=="M"){bt=R[1];bs=R[2];S[f](bt);
E[f](bs)}else{var br=aV(bt,bs,R[1],R[2],R[3],R[4],R[5],R[6]);S=S[bg](br.min.x,br.max.x);
E=E[bg](br.min.y,br.max.y);bt=R[5];bs=R[6]}}var e=a4[bl](0,S),bu=a4[bl](0,E);return{x:e,y:bu,width:h[bl](0,S)-e,height:h[bl](0,E)-bu}
}),aK=function(br){var R=[];if(!aB.is(br,aW)||!aB.is(br&&br[0],aW)){br=aB.parsePathString(br)
}for(var E=0,S=br[o];E<S;E++){R[E]=[];for(var e=0,bq=br[E][o];e<bq;e++){R[E][e]=br[E][e]
}}R[aQ]=aB._path2string;return R},an=au(function(S){if(!aB.is(S,aW)||!aB.is(S&&S[0],aW)){S=aB.parsePathString(S)
}var bv=[],bx=0,bw=0,bA=0,bz=0,R=0;if(S[0][0]=="M"){bx=S[0][1];bw=S[0][2];bA=bx;bz=bw;
R++;bv[f](["M",bx,bw])}for(var bs=R,bB=S[o];bs<bB;bs++){var e=bv[bs]=[],by=S[bs];
if(by[0]!=bp.call(by[0])){e[0]=bp.call(by[0]);switch(e[0]){case"a":e[1]=by[1];e[2]=by[2];
e[3]=by[3];e[4]=by[4];e[5]=by[5];e[6]=+(by[6]-bx).toFixed(3);e[7]=+(by[7]-bw).toFixed(3);
break;case"v":e[1]=+(by[1]-bw).toFixed(3);break;case"m":bA=by[1];bz=by[2];default:for(var br=1,bt=by[o];
br<bt;br++){e[br]=+(by[br]-((br%2)?bx:bw)).toFixed(3)}}}else{e=bv[bs]=[];if(by[0]=="m"){bA=by[1]+bx;
bz=by[2]+bw}for(var bq=0,E=by[o];bq<E;bq++){bv[bs][bq]=by[bq]}}var bu=bv[bs][o];switch(bv[bs][0]){case"z":bx=bA;
bw=bz;break;case"h":bx+=+bv[bs][bu-1];break;case"v":bw+=+bv[bs][bu-1];break;default:bx+=+bv[bs][bu-2];
bw+=+bv[bs][bu-1]}}bv[aQ]=aB._path2string;return bv},0,aK),w=au(function(S){if(!aB.is(S,aW)||!aB.is(S&&S[0],aW)){S=aB.parsePathString(S)
}var bu=[],bw=0,bv=0,bz=0,by=0,R=0;if(S[0][0]=="M"){bw=+S[0][1];bv=+S[0][2];bz=bw;
by=bv;R++;bu[0]=["M",bw,bv]}for(var bs=R,bA=S[o];bs<bA;bs++){var e=bu[bs]=[],bx=S[bs];
if(bx[0]!=a9.call(bx[0])){e[0]=a9.call(bx[0]);switch(e[0]){case"A":e[1]=bx[1];e[2]=bx[2];
e[3]=bx[3];e[4]=bx[4];e[5]=bx[5];e[6]=+(bx[6]+bw);e[7]=+(bx[7]+bv);break;case"V":e[1]=+bx[1]+bv;
break;case"H":e[1]=+bx[1]+bw;break;case"M":bz=+bx[1]+bw;by=+bx[2]+bv;default:for(var br=1,bt=bx[o];
br<bt;br++){e[br]=+bx[br]+((br%2)?bw:bv)}}}else{for(var bq=0,E=bx[o];bq<E;bq++){bu[bs][bq]=bx[bq]
}}switch(e[0]){case"Z":bw=bz;bv=by;break;case"H":bw=e[1];break;case"V":bv=e[1];break;
default:bw=bu[bs][bu[bs][o]-2];bv=bu[bs][bu[bs][o]-1]}}bu[aQ]=aB._path2string;return bu
},null,aK),bm=function(i,R,e,E){return[i,R,e,E,e,E]},a5=function(i,R,br,S,e,E){var bq=1/3,bs=2/3;
return[bq*i+bs*br,bq*R+bs*S,bq*e+bs*br,bq*E+bs*S,e,E]},V=function(bA,b5,bJ,bH,bB,bv,bq,bz,b4,bC){var S=ak.PI,bG=S*120/180,e=S/180*(+bB||0),bN=[],bK,b1=au(function(b6,b9,i){var b8=b6*ak.cos(i)-b9*ak.sin(i),b7=b6*ak.sin(i)+b9*ak.cos(i);
return{x:b8,y:b7}});if(!bC){bK=b1(bA,b5,-e);bA=bK.x;b5=bK.y;bK=b1(bz,b4,-e);bz=bK.x;
b4=bK.y;var E=ak.cos(S/180*bB),bx=ak.sin(S/180*bB),bP=(bA-bz)/2,bO=(b5-b4)/2;var bZ=(bP*bP)/(bJ*bJ)+(bO*bO)/(bH*bH);
if(bZ>1){bZ=ak.sqrt(bZ);bJ=bZ*bJ;bH=bZ*bH}var R=bJ*bJ,bS=bH*bH,bU=(bv==bq?-1:1)*ak.sqrt(ak.abs((R*bS-R*bO*bO-bS*bP*bP)/(R*bO*bO+bS*bP*bP))),bE=bU*bJ*bO/bH+(bA+bz)/2,bD=bU*-bH*bP/bJ+(b5+b4)/2,bu=ak.asin(((b5-bD)/bH).toFixed(7)),bt=ak.asin(((b4-bD)/bH).toFixed(7));
bu=bA<bE?S-bu:bu;bt=bz<bE?S-bt:bt;bu<0&&(bu=S*2+bu);bt<0&&(bt=S*2+bt);if(bq&&bu>bt){bu=bu-S*2
}if(!bq&&bt>bu){bt=bt-S*2}}else{bu=bC[0];bt=bC[1];bE=bC[2];bD=bC[3]}var by=bt-bu;
if(ak.abs(by)>bG){var bF=bt,bI=bz,bw=b4;bt=bu+bG*(bq&&bt>bu?1:-1);bz=bE+bJ*ak.cos(bt);
b4=bD+bH*ak.sin(bt);bN=V(bz,b4,bJ,bH,bB,0,bq,bI,bw,[bt,bF,bE,bD])}by=bt-bu;var bs=ak.cos(bu),b3=ak.sin(bu),br=ak.cos(bt),b2=ak.sin(bt),bQ=ak.tan(by/4),bT=4/3*bJ*bQ,bR=4/3*bH*bQ,b0=[bA,b5],bY=[bA+bT*b3,b5-bR*bs],bX=[bz+bT*b2,b4-bR*br],bV=[bz,b4];
bY[0]=2*b0[0]-bY[0];bY[1]=2*b0[1]-bY[1];if(bC){return[bY,bX,bV][bg](bN)}else{bN=[bY,bX,bV][bg](bN)[aO]()[G](",");
var bL=[];for(var bW=0,bM=bN[o];bW<bM;bW++){bL[bW]=bW%2?b1(bN[bW-1],bN[bW],e).y:b1(bN[bW],bN[bW+1],e).x
}return bL}},Y=function(i,e,R,E,bt,bs,br,bq,bu){var S=1-bu;return{x:a7(S,3)*i+a7(S,2)*3*bu*R+S*3*bu*bu*bt+a7(bu,3)*br,y:a7(S,3)*e+a7(S,2)*3*bu*E+S*3*bu*bu*bs+a7(bu,3)*bq}
},aV=au(function(E,e,S,R,bA,bz,bw,bt){var by=(bA-2*S+E)-(bw-2*bA+S),bv=2*(S-E)-2*(bA-S),bs=E-S,br=(-bv+ak.sqrt(bv*bv-4*by*bs))/2/by,bq=(-bv-ak.sqrt(bv*bv-4*by*bs))/2/by,bu=[e,bt],bx=[E,bw],i;
ak.abs(br)>1000000000000&&(br=0.5);ak.abs(bq)>1000000000000&&(bq=0.5);if(br>0&&br<1){i=Y(E,e,S,R,bA,bz,bw,bt,br);
bx[f](i.x);bu[f](i.y)}if(bq>0&&bq<1){i=Y(E,e,S,R,bA,bz,bw,bt,bq);bx[f](i.x);bu[f](i.y)
}by=(bz-2*R+e)-(bt-2*bz+R);bv=2*(R-e)-2*(bz-R);bs=e-R;br=(-bv+ak.sqrt(bv*bv-4*by*bs))/2/by;
bq=(-bv-ak.sqrt(bv*bv-4*by*bs))/2/by;ak.abs(br)>1000000000000&&(br=0.5);ak.abs(bq)>1000000000000&&(bq=0.5);
if(br>0&&br<1){i=Y(E,e,S,R,bA,bz,bw,bt,br);bx[f](i.x);bu[f](i.y)}if(bq>0&&bq<1){i=Y(E,e,S,R,bA,bz,bw,bt,bq);
bx[f](i.x);bu[f](i.y)}return{min:{x:a4[bl](0,bx),y:a4[bl](0,bu)},max:{x:h[bl](0,bx),y:h[bl](0,bu)}}
}),P=au(function(bA,bv){var S=w(bA),bw=bv&&w(bv),bx={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},e={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},br=function(bB,bC){var i,bD;
if(!bB){return["C",bC.x,bC.y,bC.x,bC.y,bC.x,bC.y]}!(bB[0] in {T:1,Q:1})&&(bC.qx=bC.qy=null);
switch(bB[0]){case"M":bC.X=bB[1];bC.Y=bB[2];break;case"A":bB=["C"][bg](V[bl](0,[bC.x,bC.y][bg](bB.slice(1))));
break;case"S":i=bC.x+(bC.x-(bC.bx||bC.x));bD=bC.y+(bC.y-(bC.by||bC.y));bB=["C",i,bD][bg](bB.slice(1));
break;case"T":bC.qx=bC.x+(bC.x-(bC.qx||bC.x));bC.qy=bC.y+(bC.y-(bC.qy||bC.y));bB=["C"][bg](a5(bC.x,bC.y,bC.qx,bC.qy,bB[1],bB[2]));
break;case"Q":bC.qx=bB[1];bC.qy=bB[2];bB=["C"][bg](a5(bC.x,bC.y,bB[1],bB[2],bB[3],bB[4]));
break;case"L":bB=["C"][bg](bm(bC.x,bC.y,bB[1],bB[2]));break;case"H":bB=["C"][bg](bm(bC.x,bC.y,bB[1],bC.y));
break;case"V":bB=["C"][bg](bm(bC.x,bC.y,bC.x,bB[1]));break;case"Z":bB=["C"][bg](bm(bC.x,bC.y,bC.X,bC.Y));
break}return bB},E=function(bB,bC){if(bB[bC][o]>7){bB[bC].shift();var bD=bB[bC];while(bD[o]){bB.splice(bC++,0,["C"][bg](bD.splice(0,6)))
}bB.splice(bC,1);by=h(S[o],bw&&bw[o]||0)}},R=function(bF,bE,bC,bB,bD){if(bF&&bE&&bF[bD][0]=="M"&&bE[bD][0]!="M"){bE.splice(bD,0,["M",bB.x,bB.y]);
bC.bx=0;bC.by=0;bC.x=bF[bD][1];bC.y=bF[bD][2];by=h(S[o],bw&&bw[o]||0)}};for(var bt=0,by=h(S[o],bw&&bw[o]||0);
bt<by;bt++){S[bt]=br(S[bt],bx);E(S,bt);bw&&(bw[bt]=br(bw[bt],e));bw&&E(bw,bt);R(S,bw,bx,e,bt);
R(bw,S,e,bx,bt);var bs=S[bt],bz=bw&&bw[bt],bq=bs[o],bu=bw&&bz[o];bx.x=bs[bq-2];bx.y=bs[bq-1];
bx.bx=af(bs[bq-4])||bx.x;bx.by=af(bs[bq-3])||bx.y;e.bx=bw&&(af(bz[bu-4])||e.x);e.by=bw&&(af(bz[bu-3])||e.y);
e.x=bw&&bz[bu-2];e.y=bw&&bz[bu-1]}return bw?[S,bw]:S},null,aK),u=au(function(bu){var bt=[];
for(var bq=0,bv=bu[o];bq<bv;bq++){var e={},bs=bu[bq].match(/^([^:]*):?([\d\.]*)/);
e.color=aB.getRGB(bs[1]);if(e.color.error){return null}e.color=e.color.hex;bs[2]&&(e.offset=bs[2]+"%");
bt[f](e)}for(bq=1,bv=bt[o]-1;bq<bv;bq++){if(!bt[bq].offset){var E=af(bt[bq-1].offset||0),R=0;
for(var S=bq+1;S<bv;S++){if(bt[S].offset){R=bt[S].offset;break}}if(!R){R=100;S=bv
}R=af(R);var br=(R-E)/(S-bq+1);for(;bq<S;bq++){E+=br;bt[bq].offset=E+"%"}}}return bt
}),aC=function(e,S,E,R){var i;if(aB.is(e,ab)||aB.is(e,"object")){i=aB.is(e,ab)?W.getElementById(e):e;
if(i.tagName){if(S==null){return{container:i,width:i.style.pixelWidth||i.offsetWidth,height:i.style.pixelHeight||i.offsetHeight}
}else{return{container:i,width:S,height:E}}}}else{return{container:1,x:e,y:S,width:E,height:R}
}},a1=function(e,E){var i=this;for(var R in E){if(E[ac](R)&&!(R in e)){switch(typeof E[R]){case"function":(function(S){e[R]=e===i?S:function(){return S[bl](i,arguments)
}})(E[R]);break;case"object":e[R]=e[R]||{};a1.call(this,e[R],E[R]);break;default:e[R]=E[R];
break}}}},ax=function(e,i){e==i.top&&(i.top=e.prev);e==i.bottom&&(i.bottom=e.next);
e.next&&(e.next.prev=e.prev);e.prev&&(e.prev.next=e.next)},ah=function(e,i){if(i.top===e){return
}ax(e,i);e.next=null;e.prev=i.top;i.top.next=e;i.top=e},m=function(e,i){if(i.bottom===e){return
}ax(e,i);e.next=i.bottom;e.prev=null;i.bottom.prev=e;i.bottom=e},H=function(i,e,E){ax(i,E);
e==E.top&&(E.top=i);e.next&&(e.next.prev=i);i.next=e.next;i.prev=e;e.next=i},aE=function(i,e,E){ax(i,E);
e==E.bottom&&(E.bottom=i);e.prev&&(e.prev.next=i);i.prev=e.prev;e.prev=i;i.next=e
},x=function(e){return function(){throw new Error("Rapha\xebl: you are calling to method \u201c"+e+"\u201d of removed object")
}},aG=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/;if(aB.svg){bi[bn].svgns="http://www.w3.org/2000/svg";
bi[bn].xlink="http://www.w3.org/1999/xlink";Z=function(e){return +e+(~~e===e)*0.5
};var a3=function(E,e){if(e){for(var i in e){if(e[ac](i)){E[B](i,e[i]+aH)}}}else{E=W.createElementNS(bi[bn].svgns,E);
E.style.webkitTapHighlightColor="rgba(0,0,0,0)";return E}};aB[aQ]=function(){return"Your browser supports SVG.\nYou are running Rapha\xebl "+this.version
};var v=function(e,R){var i=a3("path");R.canvas&&R.canvas[a6](i);var E=new aM(i,R);
E.type="path";aj(E,{fill:"none",stroke:"#000",path:e});return E};var b=function(S,bz,e){var bw="linear",bt=0.5,br=0.5,bB=S.style;
bz=(bz+aH)[bc](aG,function(bD,i,bE){bw="radial";if(i&&bE){bt=af(i);br=af(bE);var bC=((br>0.5)*2-1);
a7(bt-0.5,2)+a7(br-0.5,2)>0.25&&(br=ak.sqrt(0.25-a7(bt-0.5,2))*bC+0.5)&&br!=0.5&&(br=br.toFixed(5)-0.00001*bC)
}return aH});bz=bz[G](/\s*\-\s*/);if(bw=="linear"){var bs=bz.shift();bs=-af(bs);if(isNaN(bs)){return null
}var bq=[0,0,ak.cos(bs*ak.PI/180),ak.sin(bs*ak.PI/180)],by=1/(h(ak.abs(bq[2]),ak.abs(bq[3]))||1);
bq[2]*=by;bq[3]*=by;if(bq[2]<0){bq[0]=-bq[2];bq[2]=0}if(bq[3]<0){bq[1]=-bq[3];bq[3]=0
}}var bv=u(bz);if(!bv){return null}var E=S.getAttribute(aT);E=E.match(/^url\(#(.*)\)$/);
E&&e.defs.removeChild(W.getElementById(E[1]));var R=a3(bw+"Gradient");R.id="r"+(aB._id++)[aQ](36);
a3(R,bw=="radial"?{fx:bt,fy:br}:{x1:bq[0],y1:bq[1],x2:bq[2],y2:bq[3]});e.defs[a6](R);
for(var bu=0,bA=bv[o];bu<bA;bu++){var bx=a3("stop");a3(bx,{offset:bv[bu].offset?bv[bu].offset:!bu?"0%":"100%","stop-color":bv[bu].color||"#fff"});
R[a6](bx)}a3(S,{fill:"url(#"+R.id+")",opacity:1,"fill-opacity":1});bB.fill=aH;bB.opacity=1;
bB.fillOpacity=1;return 1};var X=function(i){var e=i.getBBox();a3(i.pattern,{patternTransform:aB.format("translate({0},{1})",e.x,e.y)})
};var aj=function(by,bH){var bB={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},bD=by.node,bz=by.attrs,bv=by.rotate(),br=function(bO,bN){bN=bB[bp.call(bN)];
if(bN){var bL=bO.attrs["stroke-width"]||"1",bJ={round:bL,square:bL,butt:0}[bO.attrs["stroke-linecap"]||bH["stroke-linecap"]]||0,bM=[];
var bK=bN[o];while(bK--){bM[bK]=bN[bK]*bL+((bK%2)?1:-1)*bJ}a3(bD,{"stroke-dasharray":bM[aO](",")})
}};bH[ac]("rotation")&&(bv=bH.rotation);var bu=(bv+aH)[G](a);if(!(bu.length-1)){bu=null
}else{bu[1]=+bu[1];bu[2]=+bu[2]}af(bv)&&by.rotate(0,true);for(var bC in bH){if(bH[ac](bC)){if(!l[ac](bC)){continue
}var bA=bH[bC];bz[bC]=bA;switch(bC){case"blur":by.blur(bA);break;case"rotation":by.rotate(bA,true);
break;case"href":case"title":case"target":var bF=bD.parentNode;if(bp.call(bF.tagName)!="a"){var S=a3("a");
bF.insertBefore(S,bD);S[a6](bD);bF=S}bF.setAttributeNS(by.paper.xlink,bC,bA);break;
case"cursor":bD.style.cursor=bA;break;case"clip-rect":var i=(bA+aH)[G](a);if(i[o]==4){by.clip&&by.clip.parentNode.parentNode.removeChild(by.clip.parentNode);
var E=a3("clipPath"),bE=a3("rect");E.id="r"+(aB._id++)[aQ](36);a3(bE,{x:i[0],y:i[1],width:i[2],height:i[3]});
E[a6](bE);by.paper.defs[a6](E);a3(bD,{"clip-path":"url(#"+E.id+")"});by.clip=bE}if(!bA){var bG=W.getElementById(bD.getAttribute("clip-path")[bc](/(^url\(#|\)$)/g,aH));
bG&&bG.parentNode.removeChild(bG);a3(bD,{"clip-path":aH});delete by.clip}break;case"path":if(by.type=="path"){a3(bD,{d:bA?bz.path=w(bA):"M0,0"})
}break;case"width":bD[B](bC,bA);if(bz.fx){bC="x";bA=bz.x}else{break}case"x":if(bz.fx){bA=-bz.x-(bz.width||0)
}case"rx":if(bC=="rx"&&by.type=="rect"){break}case"cx":bu&&(bC=="x"||bC=="cx")&&(bu[1]+=bA-bz[bC]);
bD[B](bC,Z(bA));by.pattern&&X(by);break;case"height":bD[B](bC,bA);if(bz.fy){bC="y";
bA=bz.y}else{break}case"y":if(bz.fy){bA=-bz.y-(bz.height||0)}case"ry":if(bC=="ry"&&by.type=="rect"){break
}case"cy":bu&&(bC=="y"||bC=="cy")&&(bu[2]+=bA-bz[bC]);bD[B](bC,Z(bA));by.pattern&&X(by);
break;case"r":if(by.type=="rect"){a3(bD,{rx:bA,ry:bA})}else{bD[B](bC,bA)}break;case"src":if(by.type=="image"){bD.setAttributeNS(by.paper.xlink,"href",bA)
}break;case"stroke-width":bD.style.strokeWidth=bA;bD[B](bC,bA);if(bz["stroke-dasharray"]){br(by,bz["stroke-dasharray"])
}break;case"stroke-dasharray":br(by,bA);break;case"translation":var bs=(bA+aH)[G](a);
bs[0]=+bs[0]||0;bs[1]=+bs[1]||0;if(bu){bu[1]+=bs[0];bu[2]+=bs[1]}y.call(by,bs[0],bs[1]);
break;case"scale":bs=(bA+aH)[G](a);by.scale(+bs[0]||1,+bs[1]||+bs[0]||1,isNaN(af(bs[2]))?null:+bs[2],isNaN(af(bs[3]))?null:+bs[3]);
break;case aT:var bq=(bA+aH).match(c);if(bq){E=a3("pattern");var bx=a3("image");E.id="r"+(aB._id++)[aQ](36);
a3(E,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1});a3(bx,{x:0,y:0});bx.setAttributeNS(by.paper.xlink,"href",bq[1]);
E[a6](bx);var bI=W.createElement("img");bI.style.cssText="position:absolute;left:-9999em;top-9999em";
bI.onload=function(){a3(E,{width:this.offsetWidth,height:this.offsetHeight});a3(bx,{width:this.offsetWidth,height:this.offsetHeight});
W.body.removeChild(this);by.paper.safari()};W.body[a6](bI);bI.src=bq[1];by.paper.defs[a6](E);
bD.style.fill="url(#"+E.id+")";a3(bD,{fill:"url(#"+E.id+")"});by.pattern=E;by.pattern&&X(by);
break}var R=aB.getRGB(bA);if(!R.error){delete bH.gradient;delete bz.gradient;!aB.is(bz.opacity,"undefined")&&aB.is(bH.opacity,"undefined")&&a3(bD,{opacity:bz.opacity});
!aB.is(bz["fill-opacity"],"undefined")&&aB.is(bH["fill-opacity"],"undefined")&&a3(bD,{"fill-opacity":bz["fill-opacity"]})
}else{if((({circle:1,ellipse:1})[ac](by.type)||(bA+aH).charAt()!="r")&&b(bD,bA,by.paper)){bz.gradient=bA;
bz.fill="none";break}}R[ac]("o")&&a3(bD,{"fill-opacity":R.o/100});case"stroke":R=aB.getRGB(bA);
bD[B](bC,R.hex);bC=="stroke"&&R[ac]("o")&&a3(bD,{"stroke-opacity":R.o/100});break;
case"gradient":(({circle:1,ellipse:1})[ac](by.type)||(bA+aH).charAt()!="r")&&b(bD,bA,by.paper);
break;case"opacity":case"fill-opacity":if(bz.gradient){var e=W.getElementById(bD.getAttribute(aT)[bc](/^url\(#|\)$/g,aH));
if(e){var bt=e.getElementsByTagName("stop");bt[bt[o]-1][B]("stop-opacity",bA)}break
}default:bC=="font-size"&&(bA=O(bA,10)+"px");var bw=bC[bc](/(\-.)/g,function(bJ){return a9.call(bJ.substring(1))
});bD.style[bw]=bA;bD[B](bC,bA);break}}}M(by,bH);if(bu){by.rotate(bu.join(aA))}else{af(bv)&&by.rotate(bv,true)
}};var k=1.2,M=function(e,S){if(e.type!="text"||!(S[ac]("text")||S[ac]("font")||S[ac]("font-size")||S[ac]("x")||S[ac]("y"))){return
}var bu=e.attrs,E=e.node,bw=E.firstChild?O(W.defaultView.getComputedStyle(E.firstChild,aH).getPropertyValue("font-size"),10):10;
if(S[ac]("text")){bu.text=S.text;while(E.firstChild){E.removeChild(E.firstChild)}var R=(S.text+aH)[G]("\n");
for(var bq=0,bv=R[o];bq<bv;bq++){if(R[bq]){var bs=a3("tspan");bq&&a3(bs,{dy:bw*k,x:bu.x});
bs[a6](W.createTextNode(R[bq]));E[a6](bs)}}}else{R=E.getElementsByTagName("tspan");
for(bq=0,bv=R[o];bq<bv;bq++){bq&&a3(R[bq],{dy:bw*k,x:bu.x})}}a3(E,{y:bu.y});var br=e.getBBox(),bt=bu.y-(br.y+br.height/2);
bt&&isFinite(bt)&&a3(E,{y:bu.y+bt})},aM=function(i,e){var R=0,E=0;this[0]=i;this.id=aB._oid++;
this.node=i;i.raphael=this;this.paper=e;this.attrs=this.attrs||{};this.transformations=[];
this._={tx:0,ty:0,rt:{deg:0,cx:0,cy:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aM[bn].rotate=function(i,e,R){if(this.removed){return this
}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aO](aA)
}return this._.rt.deg}var E=this.getBBox();i=(i+aH)[G](a);if(i[o]-1){e=af(i[1]);R=af(i[2])
}i=af(i[0]);if(e!=null){this._.rt.deg=i}else{this._.rt.deg+=i}(R==null)&&(e=null);
this._.rt.cx=e;this._.rt.cy=R;e=e==null?E.x+E.width/2:e;R=R==null?E.y+E.height/2:R;
if(this._.rt.deg){this.transformations[0]=aB.format("rotate({0} {1} {2})",this._.rt.deg,e,R);
this.clip&&a3(this.clip,{transform:aB.format("rotate({0} {1} {2})",-this._.rt.deg,e,R)})
}else{this.transformations[0]=aH;this.clip&&a3(this.clip,{transform:aH})}a3(this.node,{transform:this.transformations[aO](aA)});
return this};aM[bn].hide=function(){!this.removed&&(this.node.style.display="none");
return this};aM[bn].show=function(){!this.removed&&(this.node.style.display="");return this
};aM[bn].remove=function(){if(this.removed){return}ax(this,this.paper);this.node.parentNode.removeChild(this.node);
for(var e in this){delete this[e]}this.removed=true};aM[bn].getBBox=function(){if(this.removed){return this
}if(this.type=="path"){return ae(this.attrs.path)}if(this.node.style.display=="none"){this.show();
var R=true}var bs={};try{bs=this.node.getBBox()}catch(bq){}finally{bs=bs||{}}if(this.type=="text"){bs={x:bs.x,y:Infinity,width:0,height:0};
for(var E=0,S=this.node.getNumberOfChars();E<S;E++){var br=this.node.getExtentOfChar(E);
(br.y<bs.y)&&(bs.y=br.y);(br.y+br.height-bs.y>bs.height)&&(bs.height=br.y+br.height-bs.y);
(br.x+br.width-bs.x>bs.width)&&(bs.width=br.x+br.width-bs.x)}}R&&this.hide();return bs
};aM[bn].attr=function(R,bs){if(this.removed){return this}if(R==null){var bq={};for(var S in this.attrs){if(this.attrs[ac](S)){bq[S]=this.attrs[S]
}}this._.rt.deg&&(bq.rotation=this.rotate());(this._.sx!=1||this._.sy!=1)&&(bq.scale=this.scale());
bq.gradient&&bq.fill=="none"&&(bq.fill=bq.gradient)&&delete bq.gradient;return bq
}if(bs==null&&aB.is(R,ab)){if(R=="translation"){return y.call(this)}if(R=="rotation"){return this.rotate()
}if(R=="scale"){return this.scale()}if(R==aT&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[R]}if(bs==null&&aB.is(R,aW)){var e={};for(var E=0,br=R.length;
E<br;E++){e[R[E]]=this.attr(R[E])}return e}if(bs!=null){var bt={};bt[R]=bs;aj(this,bt)
}else{if(R!=null&&aB.is(R,"object")){aj(this,R)}}return this};aM[bn].toFront=function(){if(this.removed){return this
}this.node.parentNode[a6](this.node);var e=this.paper;e.top!=this&&ah(this,e);return this
};aM[bn].toBack=function(){if(this.removed){return this}if(this.node.parentNode.firstChild!=this.node){this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild);
m(this,this.paper);var e=this.paper}return this};aM[bn].insertAfter=function(e){if(this.removed){return this
}var i=e.node;if(i.nextSibling){i.parentNode.insertBefore(this.node,i.nextSibling)
}else{i.parentNode[a6](this.node)}H(this,e,this.paper);return this};aM[bn].insertBefore=function(e){if(this.removed){return this
}var i=e.node;i.parentNode.insertBefore(this.node,i);aE(this,e,this.paper);return this
};aM[bn].blur=function(i){var e=this;if(+i!==0){var E=a3("filter"),R=a3("feGaussianBlur");
e.attrs.blur=i;E.id="r"+(aB._id++)[aQ](36);a3(R,{stdDeviation:+i||1.5});E.appendChild(R);
e.paper.defs.appendChild(E);e._blur=E;a3(e.node,{filter:"url(#"+E.id+")"})}else{if(e._blur){e._blur.parentNode.removeChild(e._blur);
delete e._blur;delete e.attrs.blur}e.node.removeAttribute("filter")}};var aa=function(i,e,bq,S){e=Z(e);
bq=Z(bq);var R=a3("circle");i.canvas&&i.canvas[a6](R);var E=new aM(R,i);E.attrs={cx:e,cy:bq,r:S,fill:"none",stroke:"#000"};
E.type="circle";a3(R,E.attrs);return E};var aZ=function(E,e,bs,i,bq,br){e=Z(e);bs=Z(bs);
var S=a3("rect");E.canvas&&E.canvas[a6](S);var R=new aM(S,E);R.attrs={x:e,y:bs,width:i,height:bq,r:br||0,rx:br||0,ry:br||0,fill:"none",stroke:"#000"};
R.type="rect";a3(S,R.attrs);return R};var at=function(i,e,br,bq,S){e=Z(e);br=Z(br);
var R=a3("ellipse");i.canvas&&i.canvas[a6](R);var E=new aM(R,i);E.attrs={cx:e,cy:br,rx:bq,ry:S,fill:"none",stroke:"#000"};
E.type="ellipse";a3(R,E.attrs);return E};var t=function(E,br,e,bs,i,bq){var S=a3("image");
a3(S,{x:e,y:bs,width:i,height:bq,preserveAspectRatio:"none"});S.setAttributeNS(E.xlink,"href",br);
E.canvas&&E.canvas[a6](S);var R=new aM(S,E);R.attrs={x:e,y:bs,width:i,height:bq,src:br};
R.type="image";return R};var ag=function(i,e,bq,S){var R=a3("text");a3(R,{x:e,y:bq,"text-anchor":"middle"});
i.canvas&&i.canvas[a6](R);var E=new aM(R,i);E.attrs={x:e,y:bq,"text-anchor":"middle",text:S,font:l.font,stroke:"none",fill:"#000"};
E.type="text";aj(E,E.attrs);return E};var bk=function(i,e){this.width=i||this.width;
this.height=e||this.height;this.canvas[B]("width",this.width);this.canvas[B]("height",this.height);
return this};var C=function(){var R=aC[bl](0,arguments),E=R&&R.container,i=R.x,br=R.y,S=R.width,e=R.height;
if(!E){throw new Error("SVG container not found.")}var bq=a3("svg");i=i||0;br=br||0;
S=S||512;e=e||342;a3(bq,{xmlns:"http://www.w3.org/2000/svg",version:1.1,width:S,height:e});
if(E==1){bq.style.cssText="position:absolute;left:"+i+"px;top:"+br+"px";W.body[a6](bq)
}else{if(E.firstChild){E.insertBefore(bq,E.firstChild)}else{E[a6](bq)}}E=new bi;E.width=S;
E.height=e;E.canvas=bq;a1.call(E,E,aB.fn);E.clear();return E};bi[bn].clear=function(){var e=this.canvas;
while(e.firstChild){e.removeChild(e.firstChild)}this.bottom=this.top=null;(this.desc=a3("desc"))[a6](W.createTextNode("Created with Rapha\xebl"));
e[a6](this.desc);e[a6](this.defs=a3("defs"))};bi[bn].remove=function(){this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=x(e)}}}if(aB.vml){var K={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},aF=/([clmz]),?([^clmz]*)/gi,bo=/-?[^,\s-]+/g,aP=1000+aA+1000,s=10,p={path:1,rect:1},a2=function(bw){var bt=/[ahqstv]/ig,R=w;
(bw+aH).match(bt)&&(R=P);bt=/[clmz]/g;if(R==w&&!(bw+aH).match(bt)){var bs=(bw+aH)[bc](aF,function(bz,bB,bx){var bA=[],i=bp.call(bB)=="m",by=K[bB];
bx[bc](bo,function(bC){if(i&&bA[o]==2){by+=bA+K[bB=="m"?"l":"L"];bA=[]}bA[f](Z(bC*s))
});return by+bA});return bs}var bu=R(bw),E,e;bs=[];for(var bq=0,bv=bu[o];bq<bv;bq++){E=bu[bq];
e=bp.call(bu[bq][0]);e=="z"&&(e="x");for(var S=1,br=E[o];S<br;S++){e+=Z(E[S]*s)+(S!=br-1?",":aH)
}bs[f](e)}return bs[aO](aA)};aB[aQ]=function(){return"Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl "+this.version
};v=function(E,i){var bq=ar("group");bq.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
bq.coordsize=i.coordsize;bq.coordorigin=i.coordorigin;var S=ar("shape"),R=S.style;
R.width=i.width+"px";R.height=i.height+"px";S.coordsize=aP;S.coordorigin=i.coordorigin;
bq[a6](S);var br=new aM(S,bq,i),e={fill:"none",stroke:"#000"};E&&(e.path=E);br.isAbsolute=true;
br.type="path";br.path=[];br.Path=aH;aj(br,e);i.canvas[a6](bq);return br};aj=function(bu,bB){bu.attrs=bu.attrs||{};
var by=bu.node,bC=bu.attrs,br=by.style,R,bA=(bB.x!=bC.x||bB.y!=bC.y||bB.width!=bC.width||bB.height!=bC.height||bB.r!=bC.r)&&bu.type=="rect",bG=bu;
for(var bs in bB){if(bB[ac](bs)){bC[bs]=bB[bs]}}if(bA){bC.path=am(bC.x,bC.y,bC.width,bC.height,bC.r);
bu.X=bC.x;bu.Y=bC.y;bu.W=bC.width;bu.H=bC.height}bB.href&&(by.href=bB.href);bB.title&&(by.title=bB.title);
bB.target&&(by.target=bB.target);bB.cursor&&(br.cursor=bB.cursor);"blur" in bB&&bu.blur(bB.blur);
if(bB.path&&bu.type=="path"||bA){by.path=a2(bC.path)}if(bB.rotation!=null){bu.rotate(bB.rotation,true)
}if(bB.translation){R=(bB.translation+aH)[G](a);y.call(bu,R[0],R[1]);if(bu._.rt.cx!=null){bu._.rt.cx+=+R[0];
bu._.rt.cy+=+R[1];bu.setBox(bu.attrs,R[0],R[1])}}if(bB.scale){R=(bB.scale+aH)[G](a);
bu.scale(+R[0]||1,+R[1]||+R[0]||1,+R[2]||null,+R[3]||null)}if("clip-rect" in bB){var e=(bB["clip-rect"]+aH)[G](a);
if(e[o]==4){e[2]=+e[2]+(+e[0]);e[3]=+e[3]+(+e[1]);var bt=by.clipRect||W.createElement("div"),bF=bt.style,bq=by.parentNode;
bF.clip=aB.format("rect({1}px {2}px {3}px {0}px)",e);if(!by.clipRect){bF.position="absolute";
bF.top=0;bF.left=0;bF.width=bu.paper.width+"px";bF.height=bu.paper.height+"px";bq.parentNode.insertBefore(bt,bq);
bt[a6](bq);by.clipRect=bt}}if(!bB["clip-rect"]){by.clipRect&&(by.clipRect.style.clip=aH)
}}if(bu.type=="image"&&bB.src){by.src=bB.src}if(bu.type=="image"&&bB.opacity){by.filterOpacity=aU+".Alpha(opacity="+(bB.opacity*100)+")";
br.filter=(by.filterMatrix||aH)+(by.filterOpacity||aH)}bB.font&&(br.font=bB.font);
bB["font-family"]&&(br.fontFamily='"'+bB["font-family"][G](",")[0][bc](/^['"]+|['"]+$/g,aH)+'"');
bB["font-size"]&&(br.fontSize=bB["font-size"]);bB["font-weight"]&&(br.fontWeight=bB["font-weight"]);
bB["font-style"]&&(br.fontStyle=bB["font-style"]);if(bB.opacity!=null||bB["stroke-width"]!=null||bB.fill!=null||bB.stroke!=null||bB["stroke-width"]!=null||bB["stroke-opacity"]!=null||bB["fill-opacity"]!=null||bB["stroke-dasharray"]!=null||bB["stroke-miterlimit"]!=null||bB["stroke-linejoin"]!=null||bB["stroke-linecap"]!=null){by=bu.shape||by;
var bz=(by.getElementsByTagName(aT)&&by.getElementsByTagName(aT)[0]),bD=false;!bz&&(bD=bz=ar(aT));
if("fill-opacity" in bB||"opacity" in bB){var i=((+bC["fill-opacity"]+1||2)-1)*((+bC.opacity+1||2)-1)*((+aB.getRGB(bB.fill).o+1||2)-1);
i<0&&(i=0);i>1&&(i=1);bz.opacity=i}bB.fill&&(bz.on=true);if(bz.on==null||bB.fill=="none"){bz.on=false
}if(bz.on&&bB.fill){var E=bB.fill.match(c);if(E){bz.src=E[1];bz.type="tile"}else{bz.color=aB.getRGB(bB.fill).hex;
bz.src=aH;bz.type="solid";if(aB.getRGB(bB.fill).error&&(bG.type in {circle:1,ellipse:1}||(bB.fill+aH).charAt()!="r")&&b(bG,bB.fill)){bC.fill="none";
bC.gradient=bB.fill}}}bD&&by[a6](bz);var S=(by.getElementsByTagName("stroke")&&by.getElementsByTagName("stroke")[0]),bE=false;
!S&&(bE=S=ar("stroke"));if((bB.stroke&&bB.stroke!="none")||bB["stroke-width"]||bB["stroke-opacity"]!=null||bB["stroke-dasharray"]||bB["stroke-miterlimit"]||bB["stroke-linejoin"]||bB["stroke-linecap"]){S.on=true
}(bB.stroke=="none"||S.on==null||bB.stroke==0||bB["stroke-width"]==0)&&(S.on=false);
var bx=aB.getRGB(bB.stroke);S.on&&bB.stroke&&(S.color=bx.hex);i=((+bC["stroke-opacity"]+1||2)-1)*((+bC.opacity+1||2)-1)*((+bx.o+1||2)-1);
var bv=(af(bB["stroke-width"])||1)*0.75;i<0&&(i=0);i>1&&(i=1);bB["stroke-width"]==null&&(bv=bC["stroke-width"]);
bB["stroke-width"]&&(S.weight=bv);bv&&bv<1&&(i*=bv)&&(S.weight=1);S.opacity=i;bB["stroke-linejoin"]&&(S.joinstyle=bB["stroke-linejoin"]||"miter");
S.miterlimit=bB["stroke-miterlimit"]||8;bB["stroke-linecap"]&&(S.endcap=bB["stroke-linecap"]=="butt"?"flat":bB["stroke-linecap"]=="square"?"square":"round");
if(bB["stroke-dasharray"]){var bw={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};
S.dashstyle=bw[ac](bB["stroke-dasharray"])?bw[bB["stroke-dasharray"]]:aH}bE&&by[a6](S)
}if(bG.type=="text"){br=bG.paper.span.style;bC.font&&(br.font=bC.font);bC["font-family"]&&(br.fontFamily=bC["font-family"]);
bC["font-size"]&&(br.fontSize=bC["font-size"]);bC["font-weight"]&&(br.fontWeight=bC["font-weight"]);
bC["font-style"]&&(br.fontStyle=bC["font-style"]);bG.node.string&&(bG.paper.span.innerHTML=(bG.node.string+aH)[bc](/</g,"&#60;")[bc](/&/g,"&#38;")[bc](/\n/g,"<br>"));
bG.W=bC.w=bG.paper.span.offsetWidth;bG.H=bC.h=bG.paper.span.offsetHeight;bG.X=bC.x;
bG.Y=bC.y+Z(bG.H/2);switch(bC["text-anchor"]){case"start":bG.node.style["v-text-align"]="left";
bG.bbx=Z(bG.W/2);break;case"end":bG.node.style["v-text-align"]="right";bG.bbx=-Z(bG.W/2);
break;default:bG.node.style["v-text-align"]="center";break}}};b=function(e,bs){e.attrs=e.attrs||{};
var bt=e.attrs,bv,bq="linear",br=".5 .5";e.attrs.gradient=bs;bs=(bs+aH)[bc](aG,function(bx,by,i){bq="radial";
if(by&&i){by=af(by);i=af(i);a7(by-0.5,2)+a7(i-0.5,2)>0.25&&(i=ak.sqrt(0.25-a7(by-0.5,2))*((i>0.5)*2-1)+0.5);
br=by+aA+i}return aH});bs=bs[G](/\s*\-\s*/);if(bq=="linear"){var E=bs.shift();E=-af(E);
if(isNaN(E)){return null}}var S=u(bs);if(!S){return null}e=e.shape||e.node;bv=e.getElementsByTagName(aT)[0]||ar(aT);
!bv.parentNode&&e.appendChild(bv);if(S[o]){bv.on=true;bv.method="none";bv.color=S[0].color;
bv.color2=S[S[o]-1].color;var bw=[];for(var R=0,bu=S[o];R<bu;R++){S[R].offset&&bw[f](S[R].offset+aA+S[R].color)
}bv.colors&&(bv.colors.value=bw[o]?bw[aO]():"0% "+bv.color);if(bq=="radial"){bv.type="gradientradial";
bv.focus="100%";bv.focussize=br;bv.focusposition=br}else{bv.type="gradient";bv.angle=(270-E)%360
}}return 1};aM=function(S,br,e){var bq=0,E=0,i=0,R=1;this[0]=S;this.id=aB._oid++;
this.node=S;S.raphael=this;this.X=0;this.Y=0;this.attrs={};this.Group=br;this.paper=e;
this._={tx:0,ty:0,rt:{deg:0},sx:1,sy:1};!e.bottom&&(e.bottom=this);this.prev=e.top;
e.top&&(e.top.next=this);e.top=this;this.next=null};aM[bn].rotate=function(i,e,E){if(this.removed){return this
}if(i==null){if(this._.rt.cx){return[this._.rt.deg,this._.rt.cx,this._.rt.cy][aO](aA)
}return this._.rt.deg}i=(i+aH)[G](a);if(i[o]-1){e=af(i[1]);E=af(i[2])}i=af(i[0]);
if(e!=null){this._.rt.deg=i}else{this._.rt.deg+=i}E==null&&(e=null);this._.rt.cx=e;
this._.rt.cy=E;this.setBox(this.attrs,e,E);this.Group.style.rotation=this._.rt.deg;
return this};aM[bn].setBox=function(S,bq,R){if(this.removed){return this}var e=this.Group.style,br=(this.shape&&this.shape.style)||this.node.style;
S=S||{};for(var bs in S){if(S[ac](bs)){this.attrs[bs]=S[bs]}}bq=bq||this._.rt.cx;
R=R||this._.rt.cy;var bv=this.attrs,by,bx,bz,bu;switch(this.type){case"circle":by=bv.cx-bv.r;
bx=bv.cy-bv.r;bz=bu=bv.r*2;break;case"ellipse":by=bv.cx-bv.rx;bx=bv.cy-bv.ry;bz=bv.rx*2;
bu=bv.ry*2;break;case"image":by=+bv.x;bx=+bv.y;bz=bv.width||0;bu=bv.height||0;break;
case"text":this.textpath.v=["m",Z(bv.x),", ",Z(bv.y-2),"l",Z(bv.x)+1,", ",Z(bv.y-2)][aO](aH);
by=bv.x-Z(this.W/2);bx=bv.y-this.H/2;bz=this.W;bu=this.H;break;case"rect":case"path":if(!this.attrs.path){by=0;
bx=0;bz=this.paper.width;bu=this.paper.height}else{var bt=ae(this.attrs.path);by=bt.x;
bx=bt.y;bz=bt.width;bu=bt.height}break;default:by=0;bx=0;bz=this.paper.width;bu=this.paper.height;
break}bq=(bq==null)?by+bz/2:bq;R=(R==null)?bx+bu/2:R;var E=bq-this.paper.width/2,bw=R-this.paper.height/2,bA;
e.left!=(bA=E+"px")&&(e.left=bA);e.top!=(bA=bw+"px")&&(e.top=bA);this.X=p[ac](this.type)?-E:by;
this.Y=p[ac](this.type)?-bw:bx;this.W=bz;this.H=bu;if(p[ac](this.type)){br.left!=(bA=-E*s+"px")&&(br.left=bA);
br.top!=(bA=-bw*s+"px")&&(br.top=bA)}else{if(this.type=="text"){br.left!=(bA=-E+"px")&&(br.left=bA);
br.top!=(bA=-bw+"px")&&(br.top=bA)}else{e.width!=(bA=this.paper.width+"px")&&(e.width=bA);
e.height!=(bA=this.paper.height+"px")&&(e.height=bA);br.left!=(bA=by-E+"px")&&(br.left=bA);
br.top!=(bA=bx-bw+"px")&&(br.top=bA);br.width!=(bA=bz+"px")&&(br.width=bA);br.height!=(bA=bu+"px")&&(br.height=bA)
}}};aM[bn].hide=function(){!this.removed&&(this.Group.style.display="none");return this
};aM[bn].show=function(){!this.removed&&(this.Group.style.display="block");return this
};aM[bn].getBBox=function(){if(this.removed){return this}if(p[ac](this.type)){return ae(this.attrs.path)
}return{x:this.X+(this.bbx||0),y:this.Y,width:this.W,height:this.H}};aM[bn].remove=function(){if(this.removed){return
}ax(this,this.paper);this.node.parentNode.removeChild(this.node);this.Group.parentNode.removeChild(this.Group);
this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this){delete this[e]
}this.removed=true};aM[bn].attr=function(E,br){if(this.removed){return this}if(E==null){var S={};
for(var R in this.attrs){if(this.attrs[ac](R)){S[R]=this.attrs[R]}}this._.rt.deg&&(S.rotation=this.rotate());
(this._.sx!=1||this._.sy!=1)&&(S.scale=this.scale());S.gradient&&S.fill=="none"&&(S.fill=S.gradient)&&delete S.gradient;
return S}if(br==null&&aB.is(E,ab)){if(E=="translation"){return y.call(this)}if(E=="rotation"){return this.rotate()
}if(E=="scale"){return this.scale()}if(E==aT&&this.attrs.fill=="none"&&this.attrs.gradient){return this.attrs.gradient
}return this.attrs[E]}if(this.attrs&&br==null&&aB.is(E,aW)){var bq,e={};for(R=0,bq=E[o];
R<bq;R++){e[E[R]]=this.attr(E[R])}return e}var bs;if(br!=null){bs={};bs[E]=br}br==null&&aB.is(E,"object")&&(bs=E);
if(bs){if(bs.text&&this.type=="text"){this.node.string=bs.text}aj(this,bs);if(bs.gradient&&(({circle:1,ellipse:1})[ac](this.type)||(bs.gradient+aH).charAt()!="r")){b(this,bs.gradient)
}(!p[ac](this.type)||this._.rt.deg)&&this.setBox(this.attrs)}return this};aM[bn].toFront=function(){!this.removed&&this.Group.parentNode[a6](this.Group);
this.paper.top!=this&&ah(this,this.paper);return this};aM[bn].toBack=function(){if(this.removed){return this
}if(this.Group.parentNode.firstChild!=this.Group){this.Group.parentNode.insertBefore(this.Group,this.Group.parentNode.firstChild);
m(this,this.paper)}return this};aM[bn].insertAfter=function(e){if(this.removed){return this
}if(e.Group.nextSibling){e.Group.parentNode.insertBefore(this.Group,e.Group.nextSibling)
}else{e.Group.parentNode[a6](this.Group)}H(this,e,this.paper);return this};aM[bn].insertBefore=function(e){if(this.removed){return this
}e.Group.parentNode.insertBefore(this.Group,e.Group);aE(this,e,this.paper);return this
};var bh=/ progid:\S+Blur\([^\)]+\)/g;aM[bn].blur=function(e){var i=this.node.style,E=i.filter;
E=E.replace(bh,"");if(+e!==0){this.attrs.blur=e;i.filter=E+aU+".Blur(pixelradius="+(+e||1.5)+")";
i.margin=Raphael.format("-{0}px 0 0 -{0}px",Math.round(+e||1.5))}else{i.filter=E;
i.margin=0;delete this.attrs.blur}};aa=function(i,e,bs,bq){var S=ar("group"),br=ar("oval"),E=br.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aP;S.coordorigin=i.coordorigin;S[a6](br);var R=new aM(br,S,i);R.type="circle";
aj(R,{stroke:"#000",fill:"none"});R.attrs.cx=e;R.attrs.cy=bs;R.attrs.r=bq;R.setBox({x:e-bq,y:bs-bq,width:bq*2,height:bq*2});
i.canvas[a6](S);return R};function am(e,S,i,E,R){if(R){return aB.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z",e+R,S,i-R*2,R,-R,E-R*2,R*2-i,R*2-E)
}else{return aB.format("M{0},{1}l{2},0,0,{3},{4},0z",e,S,i,E,-i)}}aZ=function(i,br,S,bs,E,e){var bt=am(br,S,bs,E,e),R=i.path(bt),bq=R.attrs;
R.X=bq.x=br;R.Y=bq.y=S;R.W=bq.width=bs;R.H=bq.height=E;bq.r=e;bq.path=bt;R.type="rect";
return R};at=function(e,bt,bs,E,i){var S=ar("group"),R=ar("oval"),br=R.style;S.style.cssText="position:absolute;left:0;top:0;width:"+e.width+"px;height:"+e.height+"px";
S.coordsize=aP;S.coordorigin=e.coordorigin;S[a6](R);var bq=new aM(R,S,e);bq.type="ellipse";
aj(bq,{stroke:"#000"});bq.attrs.cx=bt;bq.attrs.cy=bs;bq.attrs.rx=E;bq.attrs.ry=i;
bq.setBox({x:bt-E,y:bs-i,width:E*2,height:i*2});e.canvas[a6](S);return bq};t=function(i,e,bt,bs,bu,R){var S=ar("group"),E=ar("image"),br=E.style;
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aP;S.coordorigin=i.coordorigin;E.src=e;S[a6](E);var bq=new aM(E,S,i);
bq.type="image";bq.attrs.src=e;bq.attrs.x=bt;bq.attrs.y=bs;bq.attrs.w=bu;bq.attrs.h=R;
bq.setBox({x:bt,y:bs,width:bu,height:R});i.canvas[a6](S);return bq};ag=function(i,bt,bs,bu){var S=ar("group"),R=ar("shape"),br=R.style,bv=ar("path"),e=bv.style,E=ar("textpath");
S.style.cssText="position:absolute;left:0;top:0;width:"+i.width+"px;height:"+i.height+"px";
S.coordsize=aP;S.coordorigin=i.coordorigin;bv.v=aB.format("m{0},{1}l{2},{1}",Z(bt*10),Z(bs*10),Z(bt*10)+1);
bv.textpathok=true;br.width=i.width;br.height=i.height;E.string=bu+aH;E.on=true;R[a6](E);
R[a6](bv);S[a6](R);var bq=new aM(E,S,i);bq.shape=R;bq.textpath=bv;bq.type="text";
bq.attrs.text=bu;bq.attrs.x=bt;bq.attrs.y=bs;bq.attrs.w=1;bq.attrs.h=1;aj(bq,{font:l.font,stroke:"none",fill:"#000"});
bq.setBox();i.canvas[a6](S);return bq};bk=function(E,e){var i=this.canvas.style;E==+E&&(E+="px");
e==+e&&(e+="px");i.width=E;i.height=e;i.clip="rect(0 "+E+" "+e+" 0)";return this};
var ar;W.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!W.namespaces.rvml&&W.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
ar=function(e){return W.createElement("<rvml:"+e+' class="rvml">')}}catch(ap){ar=function(e){return W.createElement("<"+e+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
}}C=function(){var E=aC[bl](0,arguments),e=E.container,bt=E.height,bu,i=E.width,bs=E.x,br=E.y;
if(!e){throw new Error("VML container not found.")}var S=new bi,bq=S.canvas=W.createElement("div"),R=bq.style;
bs=bs||0;br=br||0;i=i||512;bt=bt||342;i==+i&&(i+="px");bt==+bt&&(bt+="px");S.width=1000;
S.height=1000;S.coordsize=s*1000+aA+s*1000;S.coordorigin="0 0";S.span=W.createElement("span");
S.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
bq[a6](S.span);R.cssText=aB.format("width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",i,bt);
if(e==1){W.body[a6](bq);R.left=bs+"px";R.top=br+"px";R.position="absolute"}else{if(e.firstChild){e.insertBefore(bq,e.firstChild)
}else{e[a6](bq)}}a1.call(S,S,aB.fn);return S};bi[bn].clear=function(){this.canvas.innerHTML=aH;
this.span=W.createElement("span");this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
this.canvas[a6](this.span);this.bottom=this.top=null};bi[bn].remove=function(){this.canvas.parentNode.removeChild(this.canvas);
for(var e in this){this[e]=x(e)}return true}}if((/^Apple|^Google/).test(aI.navigator.vendor)&&(!(aI.navigator.userAgent.indexOf("Version/4.0")+1)||aI.navigator.platform.slice(0,2)=="iP")){bi[bn].safari=function(){var e=this.rect(-99,-99,this.width+99,this.height+99);
aI.setTimeout(function(){e.remove()})}}else{bi[bn].safari=function(){}}var L=function(){this.returnValue=false
},bf=function(){return this.originalEvent.preventDefault()},aS=function(){this.cancelBubble=true
},aw=function(){return this.originalEvent.stopPropagation()},ao=(function(){if(W.addEventListener){return function(bq,R,E,i){var e=Q&&bb[R]?bb[R]:R;
var S=function(bu){if(Q&&bb[ac](R)){for(var bs=0,bt=bu.targetTouches&&bu.targetTouches.length;
bs<bt;bs++){if(bu.targetTouches[bs].target==bq){var br=bu;bu=bu.targetTouches[bs];
bu.originalEvent=br;bu.preventDefault=bf;bu.stopPropagation=aw;break}}}return E.call(i,bu)
};bq.addEventListener(e,S,false);return function(){bq.removeEventListener(e,S,false);
return true}}}else{if(W.attachEvent){return function(bq,R,E,i){var S=function(br){br=br||aI.event;
br.preventDefault=br.preventDefault||L;br.stopPropagation=br.stopPropagation||aS;
return E.call(i,br)};bq.attachEvent("on"+R,S);var e=function(){bq.detachEvent("on"+R,S);
return true};return e}}}})();for(var al=N[o];al--;){(function(e){aB[e]=aM[bn][e]=function(i){if(aB.is(i,"function")){this.events=this.events||[];
this.events.push({name:e,f:i,unbind:ao(this.shape||this.node||W,e,i,this)})}return this
};aB["un"+e]=aM[bn]["un"+e]=function(R){var E=this.events,i=E[o];while(i--){if(E[i].name==e&&E[i].f==R){E[i].unbind();
E.splice(i,1);!E.length&&delete this.events;return this}}return this}})(N[al])}aM[bn].hover=function(i,e){return this.mouseover(i).mouseout(e)
};aM[bn].unhover=function(i,e){return this.unmouseover(i).unmouseout(e)};aM[bn].drag=function(E,bq,S){this._drag={};
var R=this.mousedown(function(br){(br.originalEvent?br.originalEvent:br).preventDefault();
this._drag.x=br.clientX;this._drag.y=br.clientY;this._drag.id=br.identifier;bq&&bq.call(this,br.clientX,br.clientY);
Raphael.mousemove(i).mouseup(e)}),i=function(bt){var br=bt.clientX,bv=bt.clientY;
if(Q){var bs=bt.touches.length,bu;while(bs--){bu=bt.touches[bs];if(bu.identifier==R._drag.id){br=bu.clientX;
bv=bu.clientY;(bt.originalEvent?bt.originalEvent:bt).preventDefault();break}}}else{bt.preventDefault()
}E&&E.call(R,br-R._drag.x,bv-R._drag.y,br,bv)},e=function(){R._drag={};Raphael.unmousemove(i).unmouseup(e);
S&&S.call(R)};return this};bi[bn].circle=function(e,E,i){return aa(this,e||0,E||0,i||0)
};bi[bn].rect=function(e,S,i,E,R){return aZ(this,e||0,S||0,i||0,E||0,R||0)};bi[bn].ellipse=function(e,R,E,i){return at(this,e||0,R||0,E||0,i||0)
};bi[bn].path=function(e){e&&!aB.is(e,ab)&&!aB.is(e[0],aW)&&(e+=aH);return v(aB.format[bl](aB,arguments),this)
};bi[bn].image=function(R,e,S,i,E){return t(this,R||"about:blank",e||0,S||0,i||0,E||0)
};bi[bn].text=function(e,E,i){return ag(this,e||0,E||0,i||aH)};bi[bn].set=function(e){arguments[o]>1&&(e=Array[bn].splice.call(arguments,0,arguments[o]));
return new ad(e)};bi[bn].setSize=bk;bi[bn].top=bi[bn].bottom=null;bi[bn].raphael=aB;
function A(){return this.x+aA+this.y}aM[bn].resetScale=function(){if(this.removed){return this
}this._.sx=1;this._.sy=1;this.attrs.scale="1 1"};aM[bn].scale=function(bx,bw,R,E){if(this.removed){return this
}if(bx==null&&bw==null){return{x:this._.sx,y:this._.sy,toString:A}}bw=bw||bx;!+bw&&(bw=bx);
var bB,bz,bA,by,bN=this.attrs;if(bx!=0){var bv=this.getBBox(),bs=bv.x+bv.width/2,S=bv.y+bv.height/2,bM=bx/this._.sx,bL=bw/this._.sy;
R=(+R||R==0)?R:bs;E=(+E||E==0)?E:S;var bu=~~(bx/ak.abs(bx)),br=~~(bw/ak.abs(bw)),bE=this.node.style,bP=R+(bs-R)*bM,bO=E+(S-E)*bL;
switch(this.type){case"rect":case"image":var bt=bN.width*bu*bM,bD=bN.height*br*bL;
this.attr({height:bD,r:bN.r*a4(bu*bM,br*bL),width:bt,x:bP-bt/2,y:bO-bD/2});break;
case"circle":case"ellipse":this.attr({rx:bN.rx*bu*bM,ry:bN.ry*br*bL,r:bN.r*a4(bu*bM,br*bL),cx:bP,cy:bO});
break;case"text":this.attr({x:bP,y:bO});break;case"path":var bG=an(bN.path),bH=true;
for(var bJ=0,bC=bG[o];bJ<bC;bJ++){var bF=bG[bJ],bq=a9.call(bF[0]);if(bq=="M"&&bH){continue
}else{bH=false}if(bq=="A"){bF[bG[bJ][o]-2]*=bM;bF[bG[bJ][o]-1]*=bL;bF[1]*=bu*bM;bF[2]*=br*bL;
bF[5]=+!(bu+br?!+bF[5]:+bF[5])}else{if(bq=="H"){for(var bI=1,bK=bF[o];bI<bK;bI++){bF[bI]*=bM
}}else{if(bq=="V"){for(bI=1,bK=bF[o];bI<bK;bI++){bF[bI]*=bL}}else{for(bI=1,bK=bF[o];
bI<bK;bI++){bF[bI]*=(bI%2)?bM:bL}}}}}var e=ae(bG);bB=bP-e.x-e.width/2;bz=bO-e.y-e.height/2;
bG[0][1]+=bB;bG[0][2]+=bz;this.attr({path:bG});break}if(this.type in {text:1,image:1}&&(bu!=1||br!=1)){if(this.transformations){this.transformations[2]="scale("[bg](bu,",",br,")");
this.node[B]("transform",this.transformations[aO](aA));bB=(bu==-1)?-bN.x-(bt||0):bN.x;
bz=(br==-1)?-bN.y-(bD||0):bN.y;this.attr({x:bB,y:bz});bN.fx=bu-1;bN.fy=br-1}else{this.node.filterMatrix=aU+".Matrix(M11="[bg](bu,", M12=0, M21=0, M22=",br,", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')");
bE.filter=(this.node.filterMatrix||aH)+(this.node.filterOpacity||aH)}}else{if(this.transformations){this.transformations[2]=aH;
this.node[B]("transform",this.transformations[aO](aA));bN.fx=0;bN.fy=0}else{this.node.filterMatrix=aH;
bE.filter=(this.node.filterMatrix||aH)+(this.node.filterOpacity||aH)}}bN.scale=[bx,bw,R,E][aO](aA);
this._.sx=bx;this._.sy=bw}return this};aM[bn].clone=function(){if(this.removed){return null
}var e=this.attr();delete e.scale;delete e.translation;return this.paper[this.type]().attr(e)
};var g=au(function(R,e,bs,br,by,bx,bw,bv,S){var bu=0,bq;for(var bt=0;bt<1.001;bt+=0.001){var E=aB.findDotsAtSegment(R,e,bs,br,by,bx,bw,bv,bt);
bt&&(bu+=a7(a7(bq.x-E.x,2)+a7(bq.y-E.y,2),0.5));if(bu>=S){return E}bq=E}}),aR=function(e,i){return function(bz,S,bq){bz=P(bz);
var bv,bu,E,br,R="",by={},bw,bt=0;for(var bs=0,bx=bz.length;bs<bx;bs++){E=bz[bs];
if(E[0]=="M"){bv=+E[1];bu=+E[2]}else{br=q(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6]);if(bt+br>S){if(i&&!by.start){bw=g(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6],S-bt);
R+=["C",bw.start.x,bw.start.y,bw.m.x,bw.m.y,bw.x,bw.y];if(bq){return R}by.start=R;
R=["M",bw.x,bw.y+"C",bw.n.x,bw.n.y,bw.end.x,bw.end.y,E[5],E[6]][aO]();bt+=br;bv=+E[5];
bu=+E[6];continue}if(!e&&!i){bw=g(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6],S-bt);return{x:bw.x,y:bw.y,alpha:bw.alpha}
}}bt+=br;bv=+E[5];bu=+E[6]}R+=E}by.end=R;bw=e?bt:i?by:aB.findDotsAtSegment(bv,bu,E[1],E[2],E[3],E[4],E[5],E[6],1);
bw.alpha&&(bw={x:bw.x,y:bw.y,alpha:bw.alpha});return bw}},q=au(function(R,e,br,bq,bx,bw,bv,bu){var S={x:0,y:0},bt=0;
for(var bs=0;bs<1.01;bs+=0.01){var E=Y(R,e,br,bq,bx,bw,bv,bu,bs);bs&&(bt+=a7(a7(S.x-E.x,2)+a7(S.y-E.y,2),0.5));
S=E}return bt});var aD=aR(1),J=aR(),U=aR(0,1);aM[bn].getTotalLength=function(){if(this.type!="path"){return
}if(this.node.getTotalLength){return this.node.getTotalLength()}return aD(this.attrs.path)
};aM[bn].getPointAtLength=function(e){if(this.type!="path"){return}return J(this.attrs.path,e)
};aM[bn].getSubpath=function(E,i){if(this.type!="path"){return}if(ak.abs(this.getTotalLength()-i)<0.000001){return U(this.attrs.path,E).end
}var e=U(this.attrs.path,i,1);return E?U(e,E).end:e};aB.easing_formulas={linear:function(e){return e
},"<":function(e){return a7(e,3)},">":function(e){return a7(e-1,3)+1},"<>":function(e){e=e*2;
if(e<1){return a7(e,3)/2}e-=2;return(a7(e,3)+2)/2},backIn:function(i){var e=1.70158;
return i*i*((e+1)*i-e)},backOut:function(i){i=i-1;var e=1.70158;return i*i*((e+1)*i+e)+1
},elastic:function(E){if(E==0||E==1){return E}var i=0.3,e=i/4;return a7(2,-10*E)*ak.sin((E-e)*(2*ak.PI)/i)+1
},bounce:function(R){var i=7.5625,E=2.75,e;if(R<(1/E)){e=i*R*R}else{if(R<(2/E)){R-=(1.5/E);
e=i*R*R+0.75}else{if(R<(2.5/E)){R-=(2.25/E);e=i*R*R+0.9375}else{R-=(2.625/E);e=i*R*R+0.984375
}}}return e}};var T={length:0},be=function(){var bt=+new Date;for(var bF in T){if(bF!="length"&&T[ac](bF)){var bK=T[bF];
if(bK.stop||bK.el.removed){delete T[bF];T[o]--;continue}var br=bt-bK.start,bC=bK.ms,bB=bK.easing,bG=bK.from,by=bK.diff,R=bK.to,bx=bK.t,bA=bK.prev||0,bs=bK.el,S=bK.callback,bz={},E;
if(br<bC){var bq=aB.easing_formulas[bB]?aB.easing_formulas[bB](br/bC):br/bC;for(var bD in bG){if(bG[ac](bD)){switch(ai[bD]){case"along":E=bq*bC*by[bD];
R.back&&(E=R.len-E);var bE=J(R[bD],E);bs.translate(by.sx-by.x||0,by.sy-by.y||0);by.x=bE.x;
by.y=bE.y;bs.translate(bE.x-by.sx,bE.y-by.sy);R.rot&&bs.rotate(by.r+bE.alpha,bE.x,bE.y);
break;case ay:E=+bG[bD]+bq*bC*by[bD];break;case"colour":E="rgb("+[I(Z(bG[bD].r+bq*bC*by[bD].r)),I(Z(bG[bD].g+bq*bC*by[bD].g)),I(Z(bG[bD].b+bq*bC*by[bD].b))][aO](",")+")";
break;case"path":E=[];for(var bI=0,bw=bG[bD][o];bI<bw;bI++){E[bI]=[bG[bD][bI][0]];
for(var bH=1,bJ=bG[bD][bI][o];bH<bJ;bH++){E[bI][bH]=+bG[bD][bI][bH]+bq*bC*by[bD][bI][bH]
}E[bI]=E[bI][aO](aA)}E=E[aO](aA);break;case"csv":switch(bD){case"translation":var bv=by[bD][0]*(br-bA),bu=by[bD][1]*(br-bA);
bx.x+=bv;bx.y+=bu;E=bv+aA+bu;break;case"rotation":E=+bG[bD][0]+bq*bC*by[bD][0];bG[bD][1]&&(E+=","+bG[bD][1]+","+bG[bD][2]);
break;case"scale":E=[+bG[bD][0]+bq*bC*by[bD][0],+bG[bD][1]+bq*bC*by[bD][1],(2 in R[bD]?R[bD][2]:aH),(3 in R[bD]?R[bD][3]:aH)][aO](aA);
break;case"clip-rect":E=[];bI=4;while(bI--){E[bI]=+bG[bD][bI]+bq*bC*by[bD][bI]}break
}break}bz[bD]=E}}bs.attr(bz);bs._run&&bs._run.call(bs)}else{if(R.along){bE=J(R.along,R.len*!R.back);
bs.translate(by.sx-(by.x||0)+bE.x-by.sx,by.sy-(by.y||0)+bE.y-by.sy);R.rot&&bs.rotate(by.r+bE.alpha,bE.x,bE.y)
}(bx.x||bx.y)&&bs.translate(-bx.x,-bx.y);R.scale&&(R.scale+=aH);bs.attr(R);delete T[bF];
T[o]--;bs.in_animation=null;aB.is(S,"function")&&S.call(bs)}bK.prev=br}}aB.svg&&bs&&bs.paper&&bs.paper.safari();
T[o]&&aI.setTimeout(be)},I=function(e){return h(a4(e,255),0)},y=function(e,E){if(e==null){return{x:this._.tx,y:this._.ty,toString:A}
}this._.tx+=+e;this._.ty+=+E;switch(this.type){case"circle":case"ellipse":this.attr({cx:+e+this.attrs.cx,cy:+E+this.attrs.cy});
break;case"rect":case"image":case"text":this.attr({x:+e+this.attrs.x,y:+E+this.attrs.y});
break;case"path":var i=an(this.attrs.path);i[0][1]+=+e;i[0][2]+=+E;this.attr({path:i});
break}return this};aM[bn].animateWith=function(i,E,e,S,R){T[i.id]&&(E.start=T[i.id].start);
return this.animate(E,e,S,R)};aM[bn].animateAlong=aN();aM[bn].animateAlongBack=aN(1);
function aN(e){return function(R,E,i,bq){var S={back:e};aB.is(i,"function")?(bq=i):(S.rot=i);
R&&R.constructor==aM&&(R=R.attrs.path);R&&(S.along=R);return this.animate(S,E,bq)
}}aM[bn].onAnimation=function(e){this._run=e||0;return this};aM[bn].animate=function(bF,bw,bv,R){if(aB.is(bv,"function")||!bv){R=bv||null
}var bA={},E={},bt={};for(var bx in bF){if(bF[ac](bx)){if(ai[ac](bx)){bA[bx]=this.attr(bx);
(bA[bx]==null)&&(bA[bx]=l[bx]);E[bx]=bF[bx];switch(ai[bx]){case"along":var bD=aD(bF[bx]),by=J(bF[bx],bD*!!bF.back),S=this.getBBox();
bt[bx]=bD/bw;bt.tx=S.x;bt.ty=S.y;bt.sx=by.x;bt.sy=by.y;E.rot=bF.rot;E.back=bF.back;
E.len=bD;bF.rot&&(bt.r=af(this.rotate())||0);break;case ay:bt[bx]=(E[bx]-bA[bx])/bw;
break;case"colour":bA[bx]=aB.getRGB(bA[bx]);var bz=aB.getRGB(E[bx]);bt[bx]={r:(bz.r-bA[bx].r)/bw,g:(bz.g-bA[bx].g)/bw,b:(bz.b-bA[bx].b)/bw};
break;case"path":var bq=P(bA[bx],E[bx]);bA[bx]=bq[0];var bu=bq[1];bt[bx]=[];for(var bC=0,bs=bA[bx][o];
bC<bs;bC++){bt[bx][bC]=[0];for(var bB=1,bE=bA[bx][bC][o];bB<bE;bB++){bt[bx][bC][bB]=(bu[bC][bB]-bA[bx][bC][bB])/bw
}}break;case"csv":var e=(bF[bx]+aH)[G](a),br=(bA[bx]+aH)[G](a);switch(bx){case"translation":bA[bx]=[0,0];
bt[bx]=[e[0]/bw,e[1]/bw];break;case"rotation":bA[bx]=(br[1]==e[1]&&br[2]==e[2])?br:[0,e[1],e[2]];
bt[bx]=[(e[0]-bA[bx][0])/bw,0,0];break;case"scale":bF[bx]=e;bA[bx]=(bA[bx]+aH)[G](a);
bt[bx]=[(e[0]-bA[bx][0])/bw,(e[1]-bA[bx][1])/bw,0,0];break;case"clip-rect":bA[bx]=(bA[bx]+aH)[G](a);
bt[bx]=[];bC=4;while(bC--){bt[bx][bC]=(e[bC]-bA[bx][bC])/bw}break}E[bx]=e}}}}this.stop();
this.in_animation=1;T[this.id]={start:bF.start||+new Date,ms:bw,easing:bv,from:bA,diff:bt,to:E,el:this,callback:R,t:{x:0,y:0}};
++T[o]==1&&be();return this};aM[bn].stop=function(){T[this.id]&&T[o]--;delete T[this.id];
return this};aM[bn].translate=function(e,i){return this.attr({translation:e+" "+i})
};aM[bn][aQ]=function(){return"Rapha\xebl\u2019s object"};aB.ae=T;var ad=function(e){this.items=[];
this[o]=0;this.type="set";if(e){for(var E=0,R=e[o];E<R;E++){if(e[E]&&(e[E].constructor==aM||e[E].constructor==ad)){this[this.items[o]]=this.items[this.items[o]]=e[E];
this[o]++}}}};ad[bn][f]=function(){var S,e;for(var E=0,R=arguments[o];E<R;E++){S=arguments[E];
if(S&&(S.constructor==aM||S.constructor==ad)){e=this.items[o];this[e]=this.items[e]=S;
this[o]++}}return this};ad[bn].pop=function(){delete this[this[o]--];return this.items.pop()
};for(var F in aM[bn]){if(aM[bn][ac](F)){ad[bn][F]=(function(e){return function(){for(var E=0,R=this.items[o];
E<R;E++){this.items[E][e][bl](this.items[E],arguments)}return this}})(F)}}ad[bn].attr=function(E,br){if(E&&aB.is(E,aW)&&aB.is(E[0],"object")){for(var e=0,bq=E[o];
e<bq;e++){this.items[e].attr(E[e])}}else{for(var R=0,S=this.items[o];R<S;R++){this.items[R].attr(E,br)
}}return this};ad[bn].animate=function(E,e,br,bt){(aB.is(br,"function")||!br)&&(bt=br||null);
var bq=this.items[o],R=bq,bu,bs=this,S;bt&&(S=function(){!--bq&&bt.call(bs)});br=aB.is(br,ab)?br:S;
bu=this.items[--R].animate(E,e,br,S);while(R--){this.items[R].animateWith(bu,E,e,br,S)
}return this};ad[bn].insertAfter=function(E){var e=this.items[o];while(e--){this.items[e].insertAfter(E)
}return this};ad[bn].getBBox=function(){var e=[],br=[],E=[],S=[];for(var R=this.items[o];
R--;){var bq=this.items[R].getBBox();e[f](bq.x);br[f](bq.y);E[f](bq.x+bq.width);S[f](bq.y+bq.height)
}e=a4[bl](0,e);br=a4[bl](0,br);return{x:e,y:br,width:h[bl](0,E)-e,height:h[bl](0,S)-br}
};ad[bn].clone=function(R){R=new ad;for(var e=0,E=this.items[o];e<E;e++){R[f](this.items[e].clone())
}return R};aB.registerFont=function(i){if(!i.face){return i}this.fonts=this.fonts||{};
var R={w:i.w,face:{},glyphs:{}},E=i.face["font-family"];for(var br in i.face){if(i.face[ac](br)){R.face[br]=i.face[br]
}}if(this.fonts[E]){this.fonts[E][f](R)}else{this.fonts[E]=[R]}if(!i.svg){R.face["units-per-em"]=O(i.face["units-per-em"],10);
for(var S in i.glyphs){if(i.glyphs[ac](S)){var bq=i.glyphs[S];R.glyphs[S]={w:bq.w,k:{},d:bq.d&&"M"+bq.d[bc](/[mlcxtrv]/g,function(bs){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[bs]||"M"
})+"z"};if(bq.k){for(var e in bq.k){if(bq[ac](e)){R.glyphs[S].k[e]=bq.k[e]}}}}}}return i
};bi[bn].getFont=function(bt,bu,E,S){S=S||"normal";E=E||"normal";bu=+bu||{normal:400,bold:700,lighter:300,bolder:800}[bu]||400;
if(!aB.fonts){return}var bq=aB.fonts[bt];if(!bq){var R=new RegExp("(^|\\s)"+bt[bc](/[^\w\d\s+!~.:_-]/g,aH)+"(\\s|$)","i");
for(var e in aB.fonts){if(aB.fonts[ac](e)){if(R.test(e)){bq=aB.fonts[e];break}}}}var br;
if(bq){for(var bs=0,bv=bq[o];bs<bv;bs++){br=bq[bs];if(br.face["font-weight"]==bu&&(br.face["font-style"]==E||!br.face["font-style"])&&br.face["font-stretch"]==S){break
}}}return br};bi[bn].print=function(S,R,e,bs,bt,bC){bC=bC||"middle";var by=this.set(),bB=(e+aH)[G](aH),bz=0,bv=aH,bD;
aB.is(bs,e)&&(bs=this.getFont(bs));if(bs){bD=(bt||16)/bs.face["units-per-em"];var E=bs.face.bbox.split(a),br=+E[0],bu=+E[1]+(bC=="baseline"?E[3]-E[1]+(+bs.face.descent):(E[3]-E[1])/2);
for(var bx=0,bq=bB[o];bx<bq;bx++){var bw=bx&&bs.glyphs[bB[bx-1]]||{},bA=bs.glyphs[bB[bx]];
bz+=bx?(bw.w||bs.w)+(bw.k&&bw.k[bB[bx]]||0):0;bA&&bA.d&&by[f](this.path(bA.d).attr({fill:"#000",stroke:"none",translation:[bz,0]}))
}by.scale(bD,bD,br,bu).translate(S-br,R-bu)}return by};var a8=/\{(\d+)\}/g;aB.format=function(i,E){var e=aB.is(E,aW)?[0][bg](E):arguments;
i&&aB.is(i,ab)&&e[o]-1&&(i=i[bc](a8,function(S,R){return e[++R]==null?aH:e[R]}));
return i||aH};aB.ninja=function(){n.was?(Raphael=n.is):delete Raphael;return aB};
aB.el=aM[bn];return aB})();(function(){var _jQuery=window.jQuery,_$=window.$;var jQuery=window.jQuery=window.$=function(selector,context){return new jQuery.fn.init(selector,context)
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