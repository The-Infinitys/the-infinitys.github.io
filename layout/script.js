"use strict";
var layout_main = function () {
    var rendering = function () {
        var htmlAttributes = function (elem, attributes) {
            attributes.forEach(function (attribute) {
                elem.setAttribute(attribute.name, attribute.value);
            });
        };
        var InfinityHeader = function () {
            var hm = {
                open: "/layout/image/hamburger/open.svg",
                close: "/layout/image/hamburger/close.svg",
            };
            var result = document.createElement("header");
            result.className = "The-Infinitys-Header";
            {
                // set Home button
                var home_label = document.createElement("a");
                htmlAttributes(home_label, [
                    {
                        name: "href",
                        value: "/",
                    },
                    {
                        name: "aria-label",
                        value: "Home",
                    },
                ]);
                var infinity_logo = document.createElement("img");
                infinity_logo.className = "logo the-inf-icon";
                var The_Infinitys_logo_src = "/image/The-Infinite.svg";
                htmlAttributes(infinity_logo, [
                    {
                        name: "src",
                        value: The_Infinitys_logo_src,
                    },
                    {
                        name: "alt",
                        value: "",
                    },
                ]);
                home_label.append(infinity_logo);
                result.append(home_label);
            }
            // add txt
            {
                var The_Infinitys_txt = function () {
                    var inf_txt = document.createElement("div");
                    var inf_spirit = "\n          <svg viewBox=\"0 -10 810 110\" class=\"The-Infinitys-txt\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n            <path d=\"\n            M 0,0\n            m30,0h50l-2,10h-20l-18,90h-10l18,-90h-20z\n            M 55,0\n            m30,0l-20,100h10l9,-45h30l-9,45h10l20,-100h-10l-9,45h-30l9,-45z\n            M 115,0\n            m 30,0   l -20,100   h 50   l 2,-10   h -40   l 7,-35   h 35   l 2,-10   h -35   l 7,-35   h 35   l 2,-10   z\n            M 205,0\n            m 30,0   m 10,0   h 30   l -2,10   h -10   l -16,80   h 10   l -2,10   h -30   l 2,-10   h 10   l 16,-80   h -10   z\n            M 260,0\n            m 30,0   l -20,100   h 10   l 16,-80   l 14,80   h 10   l 20,-100   h -10   l -16,80   l -14,-80   z\n            M 320,0\n            m 30,0   l -20,100   h 10   l 10,-50   h 35   l 2,-10   h -35   l 6,-30   h 35   l 2,-10   h -45   z\n            M 370,0\n            m 30,0   m 10,0   h 30   l -2,10   h -10   l -16,80   h 10   l -2,10   h -30   l 2,-10   h 10   l 16,-80   h -10   z\n            M 425,0\n            m 30,0   l -20,100   h 10   l 16,-80   l 14,80   h 10   l 20,-100   h -10   l -16,80   l -14,-80   z\n            M 480,0\n            m 30,0   m 10,0   h 30   l -2,10   h -10   l -16,80   h 10   l -2,10   h -30   l 2,-10   h 10   l 16,-80   h -10   z\n            M 535,0\n            m 30,0   h 50   l -2,10   h -20   l -18,90   h -10   l 18,-90   h -20   z\n            M 595,0\n            m 30,0   l 10,50   l -10,50   h 10   l 10,-50   l 30,-50   h -10   l -22.5,37.5   l -7.5,-37.5   z\n            M 635,0\n            m30,0m20,0h10l-4,20h-10z\n            M 680,0\n            m 30,0   m 10,0   h 30   l 8,10   l -5,25   h-10   l 4,-20   l -4,-5   h -20   l -6,5   l -5,25   l 4,5   h 25   l 8,10   l -7,35   l -12,10   h -30   l -8,-10   l 5,-25   h 10   l -4,20   l 4,5   h 20   l 6,-5   l 5,-25   l -4,-5   h -25   l -8,-10   l 7,-35   z\n            \" fill-rule=\"evenodd\" fill=\"var(--text-color)\" stroke=\"none\" />\n          </svg>\n          ";
                    inf_txt.innerHTML = inf_spirit;
                    return inf_txt;
                };
                result.append(The_Infinitys_txt());
            }
            {
                {
                    // add hamburger menu button
                    var hamburger_input = document.createElement("input");
                    // set attributes
                    hamburger_input.id = "hamburger-button";
                    htmlAttributes(hamburger_input, [
                        {
                            name: "type",
                            value: "checkbox",
                        },
                        {
                            name: "aria-label",
                            value: "hamburger menu button",
                        },
                    ]);
                    result.append(hamburger_input);
                }
                {
                    // add hamburgermenu button img
                    var hm_label = document.createElement("label");
                    // set attributes
                    hm_label.id = "hamburger-label";
                    htmlAttributes(hm_label, [
                        {
                            name: "for",
                            value: "hamburger-button",
                        },
                    ]);
                    {
                        var img = {
                            open: document.createElement("img"),
                            close: document.createElement("img"),
                        };
                        img.open.className = "logo open";
                        img.open.src = hm.open;
                        img.open.alt = "";
                        img.close.className = "logo close";
                        img.close.src = hm.close;
                        img.close.alt = "";
                        hm_label.append(img.open);
                        hm_label.append(img.close);
                    }
                    result.append(hm_label);
                }
                {
                    var HamburgerMenu = function () {
                        var hm_menu = document.createElement("div");
                        var color_theme_div = document.createElement("div");
                        color_theme_div.id = "change-color-theme";
                        color_theme_div.innerHTML = "\n            <svg\n                viewBox=\"0 0 300 100\"\n                version=\"1.1\"\n                xmlns=\"http://www.w3.org/2000/svg\"\n                xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n              >\n              <circle id=\"color-theme-change-selected\" data-inertia=\"0\" cx=\"250\" cy=\"50\" r=\"45\" />\n              <g name=\"light\">\n                <circle style=\"fill:color-mix(in srgb, transparent 99%, var(--back-color));stroke:none;\" cx=\"50\" cy=\"50\" r=\"45\" />\n                <circle cx=\"50\" cy=\"50\" r=\"20\" style=\"fill: var(--text-color); stroke: none\" />\n                  <path\n                    d=\"\n                    M50,25v-20\n                    M50,75v20\n                    M25,50h-20\n                    M75,50h20\n                    M67,67l14,14\n                    M33,67l-14,14\n                    M67,33l14,-14\n                    M33,33l-14,-14\n                    \"\n                    style=\"stroke: var(--text-color); stroke-width: 4; fill: none;stroke-linecap:round;\"\n                    />\n              </g>\n              <g name=\"dark\">\n                <circle style=\"fill:color-mix(in srgb, transparent 99%, var(--back-color));stroke:none;\" cx=\"150\" cy=\"50\" r=\"45\" />\n                <path\n                  d=\"\n                  M160,10\n                  A40,40,0,1,0,190,65\n                  A35,35,0,1,1,160,10\n                  z\n                  \"\n                  style=\"stroke: none; fill: var(--text-color)\"\n                  />\n              </g>\n              <g name=\"auto\">\n                <circle style=\"fill:color-mix(in srgb, transparent 99%, var(--back-color));stroke:none;\" cx=\"250\" cy=\"50\" r=\"45\" />\n                <path\n                  d=\"\n                  M250,30\n                  A20,20,0,1,0,267,57\n                  A15,15,0,1,1,250,30\n                  z\n                  \"\n                  style=\"stroke: none; fill: var(--text-color)\"\n                  />\n                <path\n                  d=\"\n                  M250,25v-20\n                  M250,75v20\n                  M225,50h-20\n                  M275,50h20\n                  M267,67l14,14\n                  M233,67l-14,14\n                  M267,33l14,-14\n                  M233,33l-14,-14\n                  \"\n                  style=\"stroke: var(--text-color); stroke-width: 4; fill: none;stroke-linecap:round;\"\n                  />\n              </g>\n            </svg>\n            ";
                        hm_menu.append(color_theme_div);
                        var hamburger_icons = {
                            X: "/layout/image/hamburger/menu/x.svg",
                            article: "/layout/image/hamburger/menu/article.svg",
                            // scratch: "/layout/image/hamburger/menu/scratch.svg",
                            github: "/layout/image/hamburger/menu/github.svg",
                            pixiv: "/layout/image/hamburger/menu/pixiv.svg",
                        };
                        hm_menu.className = "Hamburger-Menu";
                        var menus = [
                            {
                                name: "Article",
                                href: "/article/",
                                target: "self",
                                src: hamburger_icons.article,
                            },
                            // {
                            //   name: "Scratch",
                            //   href: "/Scratch/",
                            //   target: "self",
                            //   src: hamburger_icons.scratch,
                            // },
                            // [Removed By ST]
                            {
                                name: "GitHub",
                                href: "https://github.com/The-Infinitys/",
                                target: "blank",
                                src: hamburger_icons.github,
                            },
                            {
                                name: "X",
                                href: "https://x.com/The_Infinity_s/",
                                target: "blank",
                                src: hamburger_icons.X,
                            },
                            {
                                name: "Pixiv",
                                href: "https://www.pixiv.net/users/109461187",
                                target: "blank",
                                src: hamburger_icons.pixiv,
                            },
                        ];
                        menus.forEach(function (menu) {
                            var link_menu = document.createElement("div");
                            {
                                var link_menu_a = document.createElement("a");
                                htmlAttributes(link_menu_a, [
                                    { name: "href", value: menu.href },
                                    { name: "target", value: "_" + menu.target },
                                ]);
                                var link_menu_img = document.createElement("img");
                                htmlAttributes(link_menu_img, [
                                    { name: "alt", value: "" },
                                    { name: "class", value: "icon" },
                                    { name: "src", value: menu.src },
                                ]);
                                var link_menu_txt = document.createElement("p");
                                link_menu_txt.innerHTML = menu.name;
                                link_menu_a.append(link_menu_img, link_menu_txt);
                                link_menu.append(link_menu_a);
                            }
                            hm_menu.append(link_menu);
                        });
                        return hm_menu;
                    };
                    result.append(HamburgerMenu());
                }
            }
            return result;
        };
        var InfinityFooter = function () {
            var result = document.createElement("footer");
            result.className = "The-Infinitys-Footer";
            var content = "\n      <div>\n      <div>\n        <p><a href=\"/contact/\">Contact to The Infinity's</a></p>\n        <p><a href=\"/article/\">Watch The Infinity's Articles</a></p>\n        <p><a href=\"https://x.com/The_Infinity_s/\">X(Twitter)</a></p>\n        <p><a href=\"https://github.com/The_Infinitys/\">GitHub profile</a></p>\n      </div>\n      </div>\n      <h1>&copy; 2024 The Infinity's</h1>";
            result.innerHTML = content;
            return result;
        };
        document.body.prepend(InfinityHeader());
        document.body.append(InfinityFooter());
        var generate_background = function () {
            var monochrome_dark = "/layout/image/background/monochrome/dark.svg";
            var monochrome_light = "/layout/image/background/monochrome/light.svg";
            var monochrome_center = "/layout/image/background/monochrome/center.svg";
            var gradient_bg = "/layout/image/background/gradient/bg.jpeg";
            var result = document.createElement("div");
            result.id = "BackGround";
            result.className = "background";
            result.innerHTML = "\n      <div data-background-name=\"monochrome\">\n        <img\n          alt=\"\"\n          class=\"background fill dark translucent\"\n          src=\"".concat(monochrome_dark, "\"\n        />\n        <img\n          alt=\"\"\n          class=\"background fill light translucent\"\n          src=\"").concat(monochrome_light, "\"\n        />\n        <img\n          alt=\"\"\n          class=\"background center translucent\"\n          src=\"").concat(monochrome_center, "\"\n        />\n      </div>\n      <div data-background-name=\"gradient\">\n        <img\n          alt=\"\"\n          class=\"background over translucent\"\n          src=\"").concat(gradient_bg, "\"\n        />\n      </div>\n      <div data-background-name=\"fluffycat\">\n        <img\n          alt=\"\"\n          class=\"background over translucent\"\n          src=\"").concat(gradient_bg, "\"\n        />\n      </div>\n      <div data-background-name=\"rainbow\">\n        <canvas class=\"background fill rainbow\"></canvas>\n      </div>\n      <div data-background-name=\"raindrop\"></div>");
            return result;
        };
        document.body.append(generate_background());
    };
    rendering();
    var client = function () {
        var select_bg = function () {
            var bg_parent = document.querySelector("#BackGround");
            if (bg_parent == null) {
                return 1;
            }
            var bg_func = {
                monochrome: function () {
                    var monochrome = document.querySelector('#BackGround>div[data-background-name="monochrome"]');
                    if (monochrome == null) {
                        return 1;
                    }
                    else {
                        monochrome.style.display = "contents";
                        return 0;
                    }
                },
                gradient: function () {
                    var gradient = document.querySelector('#BackGround>div[data-background-name="gradient"]');
                    if (gradient == null) {
                        return 1;
                    }
                    else {
                        gradient.style.display = "contents";
                        return 0;
                    }
                },
                raindrop: function () {
                    var raindrop = document.querySelector('#BackGround>div[data-background-name="raindrop"]');
                    if (raindrop == null) {
                        return 1;
                    }
                    raindrop.style.display = "contents";
                    var drop = function () {
                        var wave = document.createElement("div");
                        wave.innerHTML = "\n              <svg\n                viewBox=\"0 0 100 100\"\n                version=\"1.1\"\n                xmlns=\"http://www.w3.org/2000/svg\"\n                xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n              >\n                <defs>\n                  <style>\n                    .drop{\n                      fill:var(--color);\n                      stroke:none;\n                      fill-opacity: 0;\n                    }\n                    .wave{\n                      fill:none;\n                      stroke:var(--color);\n                      stroke-width: 0;\n                    }\n                  </style>\n                </defs>\n                <g>\n                  <circle cx=\"50\" cy=\"50\" r=\"40\" class=\"drop\">\n                    <animate\n                      attributeType=\"XML\"\n                      attributeName=\"r\"\n                      calcMode=\"spline\"\n                      values=\"40; 0; 0\"\n                      keyTimes=\"0.0; 0.5; 1.0\"\n                      keySplines=\"0.5 0 0.5 1; 0.5 0 0.5 1\"\n                      dur=\"2s\"\n                      repeatCount=\"1\"\n                    />\n                    <animate\n                      attributeType=\"XML\"\n                      attributeName=\"fill-opacity\"\n                      calcMode=\"spline\"\n                      values=\"0; 1; 0\"\n                      keyTimes=\"0.0; 0.5; 1.0\"\n                      keySplines=\"0.5 0 0.5 1; 0.5 0 0.5 1\"\n                      dur=\"2s\"\n                      repeatCount=\"1\"\n                    />\n                  </circle>\n                  <circle cx=\"50\" cy=\"50\" r=\"40\" class=\"wave\">\n                    <animate\n                      attributeType=\"XML\"\n                      attributeName=\"r\"\n                      calcMode=\"spline\"\n                      values=\"0; 0; 40\"\n                      keyTimes=\"0.0; 0.5; 1.0\"\n                      keySplines=\"0 0.5 0.5 1;0 0.5 0.5 1\"\n                      dur=\"2s\"\n                      repeatCount=\"1\"\n                    />\n                    <animate\n                      attributeType=\"XML\"\n                      attributeName=\"stroke-width\"\n                      calcMode=\"spline\"\n                      values=\"0; 5; 0\"\n                      keyTimes=\"0.0; 0.5; 1.0\"\n                      keySplines=\"0 0.5 0.5 1;0 0.5 0.5 1\"\n                      dur=\"2s\"\n                      repeatCount=\"1\"\n                    />\n                  </circle>\n                </g>\n              </svg>\n            ";
                        wave.children[0].setAttribute("style", "\n              position:fixed;\n              top:".concat((100 * Math.random()).toString(), "vh;\n              left:").concat((100 * Math.random()).toString(), "vw;\n              --size:\n                ").concat((20 * (1 - 0.9 * Math.random())).toString(), "\n                vmin;\n              width:var(--size);\n              height:var(--size);\n              z-index:-1000;\n              transform:translate(-50%,-50%);\n              --color:\n                ").concat("hsl(" + Math.random().toString(), "turn 100% 50%);\n              "));
                        raindrop.append(wave);
                        setTimeout(function () {
                            wave.remove();
                            drop();
                        }, 1950);
                    };
                    for (var i = 0; i < 5; ++i) {
                        drop();
                    }
                    return 0;
                },
                fluffycat: function () {
                    var fluffycat = document.querySelector('#BackGround>div[data-background-name="fluffycat"]');
                    if (fluffycat == null) {
                        return 1;
                    }
                    else {
                        fluffycat.style.display = "contents";
                        return 0;
                    }
                },
                rainbow: {
                    run: function (pattern, fill) {
                        if (fill === void 0) { fill = true; }
                        var rainbow = document.querySelector('#BackGround>div[data-background-name="rainbow"]');
                        if (rainbow == null) {
                            return 1;
                        }
                        rainbow.style.display = "contents";
                        var canvas = document.querySelector('#BackGround>div[data-background-name="rainbow"]>canvas');
                        if (canvas == null) {
                            return 2;
                        }
                        canvas.width = window.devicePixelRatio * window.innerWidth;
                        canvas.height = window.devicePixelRatio * window.innerHeight;
                        var ctx = canvas.getContext("2d");
                        if (ctx == null) {
                            return 3;
                        }
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        var theme_color = function () {
                            var rootElem = document.querySelector(":root");
                            if (rootElem == null) {
                                return "";
                            }
                            var SelectStyle = getComputedStyle(rootElem);
                            return String(SelectStyle.getPropertyValue("--back-color")).trim();
                        };
                        ctx.fillStyle = theme_color();
                        if (fill) {
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                        }
                        var draw = function () {
                            for (var canvas_y = 0; (canvas_y - 1) * pattern.height < canvas.height; canvas_y++) {
                                for (var canvas_x = 0; (canvas_x - 1) * pattern.width +
                                    pattern.shift[canvas_y % pattern.shift.length] <
                                    canvas.width; canvas_x++) {
                                    pattern.func(ctx, canvas_x * pattern.width +
                                        pattern.shift[canvas_y % pattern.shift.length], canvas_y * pattern.height);
                                }
                            }
                        };
                        draw();
                        return 0;
                    },
                    rectangle: function () {
                        var size = 50;
                        var pattern = {
                            width: size,
                            height: size,
                            shift: [0],
                            func: function (ctx, x, y) {
                                ctx.globalCompositeOperation = "destination-out";
                                ctx.lineWidth = 1;
                                ctx.strokeRect(x, y, size, size);
                                ctx.globalCompositeOperation = "source-over";
                            },
                        };
                        bg_func.rainbow.run(pattern);
                        setTimeout(bg_func.rainbow.rectangle, 100);
                    },
                    ichimatsu: function () {
                        var size = 50;
                        var pattern = {
                            width: size * 2,
                            height: size,
                            shift: [0, -size],
                            func: function (ctx, x, y) {
                                ctx.globalAlpha = 0.8;
                                ctx.fillRect(x, y, size, size);
                                ctx.globalAlpha = 1;
                                ctx.fillRect(x + size, y, size, size);
                            },
                        };
                        bg_func.rainbow.run(pattern, false);
                        setTimeout(bg_func.rainbow.ichimatsu, 100);
                    },
                    gingham_check: function () {
                        var size = 30;
                        var pattern = {
                            width: size * 2,
                            height: size * 2,
                            shift: [0],
                            func: function (ctx, x, y) {
                                ctx.globalAlpha = 1;
                                ctx.fillRect(x, y, size, size);
                                ctx.globalAlpha = 0.9;
                                ctx.fillRect(x + size, y, size, size);
                                ctx.globalAlpha = 0.9;
                                ctx.fillRect(x, y + size, size, size);
                                ctx.globalAlpha = 0.8;
                                ctx.fillRect(x + size, y + size, size, size);
                            },
                        };
                        bg_func.rainbow.run(pattern, false);
                        setTimeout(bg_func.rainbow.gingham_check, 100);
                    },
                    triangle: function () {
                        var size = 25;
                        var pattern = {
                            width: size * 2,
                            height: Math.sqrt(3) * size,
                            shift: [0, -size],
                            func: function (ctx, x, y) {
                                var root3 = Math.sqrt(3); //複数回使うので先に確保
                                ctx.globalCompositeOperation = "destination-out";
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x + size * 2, y);
                                ctx.lineTo(x + size, y + size * root3);
                                ctx.closePath();
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(x + size * 2, y);
                                ctx.lineTo(x + size * 3, y + size * root3);
                                ctx.lineTo(x + size, y + size * root3);
                                ctx.closePath();
                                ctx.stroke();
                                ctx.globalCompositeOperation = "source-over";
                            },
                        };
                        bg_func.rainbow.run(pattern);
                        setTimeout(bg_func.rainbow.triangle, 100);
                    },
                    honeycomb: function () {
                        var r = 25;
                        var root3 = Math.sqrt(3); //複数回使うので先に確保
                        var honeycomb_width = r * root3;
                        var honeycomb_height = (r * 3) / 2;
                        var pattern = {
                            width: honeycomb_width,
                            height: honeycomb_height,
                            shift: [0, honeycomb_width / -2],
                            func: function (ctx, x, y) {
                                ctx.globalCompositeOperation = "destination-out";
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(x, y - r);
                                ctx.lineTo(x + (root3 / 2) * r, y - r / 2);
                                ctx.lineTo(x + (root3 / 2) * r, y + r / 2);
                                ctx.lineTo(x, y + r);
                                ctx.lineTo(x - (root3 / 2) * r, y + r / 2);
                                ctx.lineTo(x - (root3 / 2) * r, y - r / 2);
                                ctx.closePath();
                                ctx.stroke();
                                ctx.globalCompositeOperation = "source-over";
                            },
                        };
                        bg_func.rainbow.run(pattern);
                        setTimeout(bg_func.rainbow.honeycomb, 100);
                    },
                    wave: function () {
                        var wave_width = 250;
                        var wave_r = 25;
                        var pattern = {
                            width: wave_width,
                            height: wave_r * 2,
                            shift: [0],
                            func: function (ctx, x, y) {
                                ctx.globalCompositeOperation = "destination-out";
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                for (var i = 0; i < wave_width; i++) {
                                    ctx.lineTo(x + i, y + wave_r * Math.sin((2 * Math.PI * i) / wave_width));
                                }
                                ctx.lineTo(x + wave_width, y);
                                ctx.stroke();
                                ctx.globalCompositeOperation = "source-over";
                            },
                        };
                        bg_func.rainbow.run(pattern);
                        setTimeout(bg_func.rainbow.wave, 100);
                    },
                    halloween: function () {
                        var width = 150;
                        var height = width;
                        var pattern = {
                            width: width,
                            height: height,
                            shift: [0, -width / 2],
                            func: function (ctx, x, y) {
                                ctx.globalCompositeOperation = "destination-out";
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(x + width / 5, y + width / 5);
                                ctx.lineTo(x + width / 10, y + (width / 5) * 2);
                                ctx.lineTo(x + (width / 10) * 3, y + (width / 5) * 2);
                                ctx.closePath();
                                ctx.fill();
                                ctx.beginPath();
                                ctx.moveTo(x + (width / 5) * 4, y + width / 5);
                                ctx.lineTo(x + (width / 10) * 9, y + (width / 5) * 2);
                                ctx.lineTo(x + (width / 10) * 7, y + (width / 5) * 2);
                                ctx.closePath();
                                ctx.fill();
                                ctx.beginPath();
                                ctx.moveTo(x + width / 10, y + height / 2);
                                ctx.lineTo(x + width / 5, y + (height / 10) * 7);
                                ctx.lineTo(x + width / 3, y + (height / 3) * 2);
                                ctx.lineTo(x + width / 2, y + (height / 10) * 8);
                                ctx.lineTo(x + (width / 3) * 2, y + (height / 3) * 2);
                                ctx.lineTo(x + (width / 5) * 4, y + (height / 10) * 7);
                                ctx.lineTo(x + (width / 10) * 9, y + height / 2);
                                ctx.lineTo(x + width / 2, y + (height / 5) * 3);
                                ctx.closePath();
                                ctx.fill();
                                ctx.globalCompositeOperation = "source-over";
                            },
                        };
                        bg_func.rainbow.run(pattern);
                        setTimeout(bg_func.rainbow.halloween, 100);
                    },
                },
            };
            var randInt = function (min, max) {
                return Math.floor(Math.random() * (max + 1 - min)) + min;
            };
            var bg_num = randInt(1, 6);
            switch (bg_num) {
                case 0:
                    console.log("Empty...");
                    break;
                case 1:
                    bg_func.monochrome();
                    break;
                case 2:
                    bg_func.rainbow.rectangle();
                    break;
                case 3:
                    bg_func.rainbow.triangle();
                    break;
                case 4:
                    bg_func.rainbow.honeycomb();
                    break;
                case 5:
                    bg_func.rainbow.ichimatsu();
                    break;
                case 6:
                    bg_func.gradient();
                    break;
                case 7:
                    bg_func.fluffycat();
                    break;
                case 8:
                    bg_func.rainbow.wave();
                    break;
                case 9:
                    bg_func.raindrop();
                    break;
                case 10:
                    bg_func.rainbow.gingham_check();
                    break;
                case 11:
                    bg_func.rainbow.halloween();
                    break;
                default:
                    console.error("Error bg_func out of Index");
                    break;
            }
            return 0;
        };
        var color_theme = "auto";
        var color_theme_detector = function () {
            var _a, _b, _c;
            var init_color_theme = function () {
                var ls_color_theme = localStorage.getItem("color-theme");
                if (ls_color_theme == null) {
                    color_theme = "auto";
                    localStorage.setItem("color-theme", color_theme);
                }
                else {
                    color_theme = ls_color_theme;
                }
                auto_color_theme();
                renew_color_theme();
            };
            var renew_color_theme = function () {
                localStorage.setItem("color-theme", color_theme);
                var change_button = document.querySelector("#change-color-theme");
                if (change_button == null) {
                    return;
                }
                var animate_selected = function () {
                    var speed = 2;
                    var selected = document.querySelector("#color-theme-change-selected");
                    if (selected == null) {
                        return;
                    }
                    var target_x = 250;
                    switch (color_theme) {
                        case "light":
                            target_x = 50;
                            selected.style.fill = "#eee";
                            break;
                        case "dark":
                            target_x = 150;
                            selected.style.fill = "#333";
                            break;
                        case "auto":
                            target_x = 250;
                            selected.style.fill = "#888";
                            break;
                        default:
                            alert("error happend on change color theme");
                            break;
                    }
                    var selected_cx = selected.getAttribute("cx");
                    var selected_inertia = selected.getAttribute("data-inertia");
                    var now_x = parseFloat(selected_cx);
                    var next_x = now_x;
                    if (Math.abs((target_x - now_x) / speed) <
                        Math.abs(parseFloat(selected_inertia))) {
                        selected === null || selected === void 0 ? void 0 : selected.setAttribute("data-inertia", ((target_x - now_x) / speed).toString());
                    }
                    else {
                        if (target_x > now_x) {
                            selected === null || selected === void 0 ? void 0 : selected.setAttribute("data-inertia", (parseFloat(selected_inertia) + 2).toString());
                        }
                        else {
                            selected === null || selected === void 0 ? void 0 : selected.setAttribute("data-inertia", (parseFloat(selected_inertia) - 2).toString());
                        }
                    }
                    next_x += parseFloat(selected.getAttribute("data-inertia"));
                    if (Math.abs(next_x - target_x) > 1) {
                        selected === null || selected === void 0 ? void 0 : selected.setAttribute("cx", next_x.toString());
                        requestAnimationFrame(function () {
                            animate_selected();
                        });
                    }
                    else {
                        selected === null || selected === void 0 ? void 0 : selected.setAttribute("cx", target_x.toString());
                    }
                };
                animate_selected();
                switch (color_theme) {
                    case "light":
                        document.documentElement.setAttribute("theme", "light");
                        change_button.style.borderColor = "#000";
                        break;
                    case "dark":
                        document.documentElement.setAttribute("theme", "dark");
                        change_button.style.borderColor = "#fff";
                        break;
                    case "auto":
                        change_button.style.borderColor = "#888";
                        if (window.matchMedia("(prefers-color-scheme: dark)").matches == true) {
                            document.documentElement.setAttribute("theme", "dark");
                        }
                        else {
                            document.documentElement.setAttribute("theme", "light");
                        }
                        break;
                    default:
                        alert("error happend on change color theme");
                        break;
                }
            };
            var change_color_theme = function (mode) {
                color_theme = mode;
                renew_color_theme();
            };
            var auto_color_theme = function () {
                var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
                mediaQuery.addEventListener("change", renew_color_theme);
            };
            init_color_theme();
            (_a = document
                .querySelector('#change-color-theme > svg > g[name="auto"]')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                change_color_theme("auto");
            });
            (_b = document
                .querySelector('#change-color-theme > svg > g[name="light"]')) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
                change_color_theme("light");
            });
            (_c = document
                .querySelector('#change-color-theme > svg > g[name="dark"]')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
                change_color_theme("dark");
            });
        };
        select_bg();
        color_theme_detector();
    };
    client();
};
layout_main();
