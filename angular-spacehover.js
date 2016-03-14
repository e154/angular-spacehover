/**
 * Created by delta54 on 11.12.14.
 */


(function(){
    'use strict';

    angular
        .module('ui.spaceHover', [])
        .directive('spaceHover', function() {

            return {
                restrict: 'C',
                link: function ($scope, $element, $attrs) {

                    var e = $element;

                    e.find("img").css({
                        display: 'inline-block',
                        'max-width': '100%'
                    });

                    TweenLite.set(e.parent(),{backfaceVisibility:"hidden",force3D:"true"});
                    e.mouseenter(function(event) {
                        var e = jQuery(this),
                            t = e.parent().offset().top,
                            l = e.parent().offset().left,
                            ex = (event.pageX-l),
                            ey =  (event.pageY-t);
                        e.data("enterx",ex);
                        e.data("entery",ey);

                    });

                    e.find('a').append('<div style="position:absolute;top:0;left:0;width:100%;height:100%;background:transparent;z-index:10"></div>');
                    TweenLite.set(e.find("img"),{scale:0.98,rotationX:0,rotationY:0,x:0,y:0,transformPerspective:1200,ease:Power3.easeOut,overwrite:"all"});

                    e.on('mousemove.hoverdir, mouseleave.hoverdir',function(event) {

                        switch (event.type) {

                            case "mousemove":
                                var t = e.offset().top,
                                    l = e.offset().left,
                                    mh = e.width() / 2,
                                    mv = e.height() / 2,
                                    diffh = (event.pageX - l) - mh,
                                    diffv = (event.pageY - t) - mh;


                                e.find("img").each(function () {
                                    var pc = jQuery(this),
                                        pl = 0.05,
                                        offsh = diffh * pl,
                                        offsv = diffv * pl;


                                    TweenLite.to(pc, 0.4, {
                                        scale: 0.98,
                                        rotationX: (0 - offsv * 2),
                                        rotationY: (offsh * 2),
                                        x: offsh,
                                        y: offsv,
                                        transformPerspective: 1200,
                                        ease: Power3.easeOut,
                                        overwrite: "all"
                                    });
                                });

                                break;

                            case "mouseleave":
                                e.find("img").each(function () {
                                    var pc = jQuery(this);
                                    TweenLite.to(pc, 0.7, {
                                        scale: 1,
                                        rotationX: 0,
                                        rotationY: 0,
                                        x: 0,
                                        y: 0,
                                        ease: Bounce.easeOut
                                    });
                                });

                                break;
                        }

                    });
                }
            };
        });
}());