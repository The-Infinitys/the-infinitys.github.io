"use strict";
const layout_main: Function = () => {
  const rendering: Function = (): void => {
    type HTMLAttribute = {
      name: string;
      value: string;
    };
    const htmlAttributes: Function = (
      elem: HTMLElement,
      attributes: HTMLAttribute[]
    ): void => {
      attributes.forEach((attribute: HTMLAttribute) => {
        elem.setAttribute(attribute.name, attribute.value);
      });
    };
    const InfinityHeader: Function = () => {
      const hm: { open: string; close: string } = {
        open: "/layout/image/hamburger/open.svg",
        close: "/layout/image/hamburger/close.svg",
      };
      const result: HTMLElement = document.createElement("header");
      result.className = "The-Infinitys-Header";
      {
        // set Home button
        const home_label: HTMLElement = document.createElement("a");
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
        const infinity_logo: HTMLElement = document.createElement("img");
        infinity_logo.className = "logo the-inf-icon";
        const The_Infinitys_logo_src: string = "/image/The-Infinite.svg";
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
        const The_Infinitys_txt: Function = (): HTMLElement => {
          const inf_txt: HTMLElement = document.createElement("div");
          const inf_spirit: string = `
          <svg viewBox="0 -10 810 110" class="The-Infinitys-txt" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <path d="
            M 0,0
            m30,0h50l-2,10h-20l-18,90h-10l18,-90h-20z
            M 55,0
            m30,0l-20,100h10l9,-45h30l-9,45h10l20,-100h-10l-9,45h-30l9,-45z
            M 115,0
            m 30,0   l -20,100   h 50   l 2,-10   h -40   l 7,-35   h 35   l 2,-10   h -35   l 7,-35   h 35   l 2,-10   z
            M 205,0
            m 30,0   m 10,0   h 30   l -2,10   h -10   l -16,80   h 10   l -2,10   h -30   l 2,-10   h 10   l 16,-80   h -10   z
            M 260,0
            m 30,0   l -20,100   h 10   l 16,-80   l 14,80   h 10   l 20,-100   h -10   l -16,80   l -14,-80   z
            M 320,0
            m 30,0   l -20,100   h 10   l 10,-50   h 35   l 2,-10   h -35   l 6,-30   h 35   l 2,-10   h -45   z
            M 370,0
            m 30,0   m 10,0   h 30   l -2,10   h -10   l -16,80   h 10   l -2,10   h -30   l 2,-10   h 10   l 16,-80   h -10   z
            M 425,0
            m 30,0   l -20,100   h 10   l 16,-80   l 14,80   h 10   l 20,-100   h -10   l -16,80   l -14,-80   z
            M 480,0
            m 30,0   m 10,0   h 30   l -2,10   h -10   l -16,80   h 10   l -2,10   h -30   l 2,-10   h 10   l 16,-80   h -10   z
            M 535,0
            m 30,0   h 50   l -2,10   h -20   l -18,90   h -10   l 18,-90   h -20   z
            M 595,0
            m 30,0   l 10,50   l -10,50   h 10   l 10,-50   l 30,-50   h -10   l -22.5,37.5   l -7.5,-37.5   z
            M 635,0
            m30,0m20,0h10l-4,20h-10z
            M 680,0
            m 30,0   m 10,0   h 30   l 8,10   l -5,25   h-10   l 4,-20   l -4,-5   h -20   l -6,5   l -5,25   l 4,5   h 25   l 8,10   l -7,35   l -12,10   h -30   l -8,-10   l 5,-25   h 10   l -4,20   l 4,5   h 20   l 6,-5   l 5,-25   l -4,-5   h -25   l -8,-10   l 7,-35   z
            " fill-rule="evenodd" fill="var(--text-color)" stroke="none" />
          </svg>
          `;
          inf_txt.innerHTML = inf_spirit;
          return inf_txt;
        };
        result.append(The_Infinitys_txt());
      }
      {
        {
          // add hamburger menu button
          const hamburger_input = document.createElement("input");
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
          const hm_label = document.createElement("label");
          // set attributes
          hm_label.id = "hamburger-label";
          htmlAttributes(hm_label, [
            {
              name: "for",
              value: "hamburger-button",
            },
          ]);
          {
            const img: { open: HTMLImageElement; close: HTMLImageElement } = {
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
          const HamburgerMenu: Function = () => {
            const hm_menu: HTMLElement = document.createElement("div");
            const color_theme_div: HTMLDivElement =
              document.createElement("div");
            color_theme_div.id = "change-color-theme";
            color_theme_div.innerHTML = `
            <svg
                viewBox="0 0 300 100"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
              <circle id="color-theme-change-selected" data-inertia="0" cx="250" cy="50" r="45" />
              <g name="light">
                <circle style="fill:color-mix(in srgb, transparent 99%, var(--back-color));stroke:none;" cx="50" cy="50" r="45" />
                <circle cx="50" cy="50" r="20" style="fill: var(--text-color); stroke: none" />
                  <path
                    d="
                    M50,25v-20
                    M50,75v20
                    M25,50h-20
                    M75,50h20
                    M67,67l14,14
                    M33,67l-14,14
                    M67,33l14,-14
                    M33,33l-14,-14
                    "
                    style="stroke: var(--text-color); stroke-width: 4; fill: none;stroke-linecap:round;"
                    />
              </g>
              <g name="dark">
                <circle style="fill:color-mix(in srgb, transparent 99%, var(--back-color));stroke:none;" cx="150" cy="50" r="45" />
                <path
                  d="
                  M160,10
                  A40,40,0,1,0,190,65
                  A35,35,0,1,1,160,10
                  z
                  "
                  style="stroke: none; fill: var(--text-color)"
                  />
              </g>
              <g name="auto">
                <circle style="fill:color-mix(in srgb, transparent 99%, var(--back-color));stroke:none;" cx="250" cy="50" r="45" />
                <path
                  d="
                  M250,30
                  A20,20,0,1,0,267,57
                  A15,15,0,1,1,250,30
                  z
                  "
                  style="stroke: none; fill: var(--text-color)"
                  />
                <path
                  d="
                  M250,25v-20
                  M250,75v20
                  M225,50h-20
                  M275,50h20
                  M267,67l14,14
                  M233,67l-14,14
                  M267,33l14,-14
                  M233,33l-14,-14
                  "
                  style="stroke: var(--text-color); stroke-width: 4; fill: none;stroke-linecap:round;"
                  />
              </g>
            </svg>
            `;
            hm_menu.append(color_theme_div);
            const hamburger_icons: {
              X: string;
              article: string;
              // scratch: string;
              github: string;
              pixiv: string;
            } = {
              X: "/layout/image/hamburger/menu/x.svg",
              article: "/layout/image/hamburger/menu/article.svg",
              // scratch: "/layout/image/hamburger/menu/scratch.svg",
              github: "/layout/image/hamburger/menu/github.svg",
              pixiv: "/layout/image/hamburger/menu/pixiv.svg",
            };
            hm_menu.className = "Hamburger-Menu";
            type LinkMenu = {
              name: string;
              href: string;
              target: string;
              src: string;
            };
            const menus: LinkMenu[] = [
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
            menus.forEach((menu: LinkMenu) => {
              const link_menu: HTMLElement = document.createElement("div");
              {
                const link_menu_a: HTMLElement = document.createElement("a");
                htmlAttributes(link_menu_a, [
                  { name: "href", value: menu.href },
                  { name: "target", value: "_" + menu.target },
                ]);
                const link_menu_img: HTMLImageElement =
                  document.createElement("img");
                htmlAttributes(link_menu_img, [
                  { name: "alt", value: "" },
                  { name: "class", value: "icon" },
                  { name: "src", value: menu.src },
                ]);
                const link_menu_txt: HTMLElement = document.createElement("p");
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
    const InfinityFooter: Function = () => {
      const result: HTMLElement = document.createElement("footer");
      result.className = "The-Infinitys-Footer";
      const content: string = `
      <div>
      <div>
        <p><a href="/contact/">Contact to The Infinity's</a></p>
        <p><a href="/article/">Watch The Infinity's Articles</a></p>
        <p><a href="https://x.com/The_Infinity_s/">X(Twitter)</a></p>
        <p><a href="https://github.com/The_Infinitys/">GitHub profile</a></p>
      </div>
      </div>
      <h1>&copy; 2024 The Infinity's</h1>`;
      result.innerHTML = content;
      return result;
    };
    document.body.prepend(InfinityHeader());
    document.body.append(InfinityFooter());
    const generate_background: Function = (): HTMLDivElement => {
      const monochrome_dark: string =
        "/layout/image/background/monochrome/dark.svg";
      const monochrome_light: string =
        "/layout/image/background/monochrome/light.svg";
      const monochrome_center: string =
        "/layout/image/background/monochrome/center.svg";
      const gradient_bg: string = "/layout/image/background/gradient/bg.jpeg";
      const result: HTMLDivElement = document.createElement("div");
      result.id = "BackGround";
      result.className = "background";
      result.innerHTML = `
      <div data-background-name="monochrome">
        <img
          alt=""
          class="background fill dark translucent"
          src="${monochrome_dark}"
        />
        <img
          alt=""
          class="background fill light translucent"
          src="${monochrome_light}"
        />
        <img
          alt=""
          class="background center translucent"
          src="${monochrome_center}"
        />
      </div>
      <div data-background-name="gradient">
        <img
          alt=""
          class="background over translucent"
          src="${gradient_bg}"
        />
      </div>
      <div data-background-name="fluffycat">
        <img
          alt=""
          class="background over translucent"
          src="${gradient_bg}"
        />
      </div>
      <div data-background-name="rainbow">
        <canvas class="background fill rainbow"></canvas>
      </div>
      <div data-background-name="raindrop"></div>`;
      return result;
    };
    document.body.append(generate_background());
  };
  rendering();
  const client: Function = (): void => {
    const select_bg: Function = () => {
      const bg_parent: HTMLElement | null =
        document.querySelector("#BackGround");
      if (bg_parent == null) {
        return 1;
      }
      type bg_pattern = {
        width: number;
        height: number;
        shift: number[];
        func: Function;
      };
      const bg_func: {
        monochrome: Function;
        gradient: Function;
        raindrop: Function;
        fluffycat: Function;
        rainbow: {
          run: Function;
          rectangle: Function;
          ichimatsu: Function;
          gingham_check: Function;
          triangle: Function;
          honeycomb: Function;
          halloween: Function;
          wave: Function;
        };
      } = {
        monochrome: (): number => {
          const monochrome: HTMLElement | null = document.querySelector(
            '#BackGround>div[data-background-name="monochrome"]'
          );
          if (monochrome == null) {
            return 1;
          } else {
            monochrome.style.display = "contents";
            return 0;
          }
        },
        gradient: (): number => {
          const gradient: HTMLElement | null = document.querySelector(
            '#BackGround>div[data-background-name="gradient"]'
          );
          if (gradient == null) {
            return 1;
          } else {
            gradient.style.display = "contents";
            return 0;
          }
        },
        raindrop: (): number => {
          const raindrop: HTMLElement | null = document.querySelector(
            '#BackGround>div[data-background-name="raindrop"]'
          );
          if (raindrop == null) {
            return 1;
          }
          raindrop.style.display = "contents";
          const drop: Function = (): void => {
            const wave: HTMLElement = document.createElement("div");
            wave.innerHTML = `
              <svg
                viewBox="0 0 100 100"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <style>
                    .drop{
                      fill:var(--color);
                      stroke:none;
                      fill-opacity: 0;
                    }
                    .wave{
                      fill:none;
                      stroke:var(--color);
                      stroke-width: 0;
                    }
                  </style>
                </defs>
                <g>
                  <circle cx="50" cy="50" r="40" class="drop">
                    <animate
                      attributeType="XML"
                      attributeName="r"
                      calcMode="spline"
                      values="40; 0; 0"
                      keyTimes="0.0; 0.5; 1.0"
                      keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
                      dur="2s"
                      repeatCount="1"
                    />
                    <animate
                      attributeType="XML"
                      attributeName="fill-opacity"
                      calcMode="spline"
                      values="0; 1; 0"
                      keyTimes="0.0; 0.5; 1.0"
                      keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
                      dur="2s"
                      repeatCount="1"
                    />
                  </circle>
                  <circle cx="50" cy="50" r="40" class="wave">
                    <animate
                      attributeType="XML"
                      attributeName="r"
                      calcMode="spline"
                      values="0; 0; 40"
                      keyTimes="0.0; 0.5; 1.0"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                      dur="2s"
                      repeatCount="1"
                    />
                    <animate
                      attributeType="XML"
                      attributeName="stroke-width"
                      calcMode="spline"
                      values="0; 5; 0"
                      keyTimes="0.0; 0.5; 1.0"
                      keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
                      dur="2s"
                      repeatCount="1"
                    />
                  </circle>
                </g>
              </svg>
            `;
            wave.children[0].setAttribute(
              "style",
              `
              position:fixed;
              top:${(100 * Math.random()).toString()}vh;
              left:${(100 * Math.random()).toString()}vw;
              --size:
                ${(20 * (1 - 0.9 * Math.random())).toString()}
                vmin;
              width:var(--size);
              height:var(--size);
              z-index:-1000;
              transform:translate(-50%,-50%);
              --color:
                ${"hsl(" + Math.random().toString()}turn 100% 50%);
              `
            );
            raindrop.append(wave);
            setTimeout(() => {
              wave.remove();
              drop();
            }, 1950);
          };
          for (let i = 0; i < 5; ++i) {
            drop();
          }
          return 0;
        },
        fluffycat: (): number => {
          const fluffycat: HTMLElement | null = document.querySelector(
            '#BackGround>div[data-background-name="fluffycat"]'
          );
          if (fluffycat == null) {
            return 1;
          } else {
            fluffycat.style.display = "contents";
            return 0;
          }
        },
        rainbow: {
          run: (pattern: bg_pattern, fill: boolean = true): number => {
            const rainbow: HTMLElement | null = document.querySelector(
              '#BackGround>div[data-background-name="rainbow"]'
            );
            if (rainbow == null) {
              return 1;
            }
            rainbow.style.display = "contents";
            const canvas: HTMLCanvasElement | null = document.querySelector(
              '#BackGround>div[data-background-name="rainbow"]>canvas'
            );
            if (canvas == null) {
              return 2;
            }
            canvas.width = window.devicePixelRatio * window.innerWidth;
            canvas.height = window.devicePixelRatio * window.innerHeight;
            const ctx: CanvasRenderingContext2D | null =
              canvas.getContext("2d");
            if (ctx == null) {
              return 3;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const theme_color: Function = () => {
              const rootElem: Element | null = document.querySelector(":root");
              if (rootElem == null) {
                return "";
              }
              const SelectStyle = getComputedStyle(rootElem);
              return String(
                SelectStyle.getPropertyValue("--back-color")
              ).trim();
            };
            ctx.fillStyle = theme_color();
            if (fill) {
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            const draw: Function = (): void => {
              for (
                let canvas_y = 0;
                (canvas_y - 1) * pattern.height < canvas.height;
                canvas_y++
              ) {
                for (
                  let canvas_x = 0;
                  (canvas_x - 1) * pattern.width +
                    pattern.shift[canvas_y % pattern.shift.length] <
                  canvas.width;
                  canvas_x++
                ) {
                  pattern.func(
                    ctx,
                    canvas_x * pattern.width +
                      pattern.shift[canvas_y % pattern.shift.length],
                    canvas_y * pattern.height
                  );
                }
              }
            };
            draw();
            return 0;
          },
          rectangle: (): void => {
            const size = 50;
            const pattern: bg_pattern = {
              width: size,
              height: size,
              shift: [0],
              func: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
                ctx.globalCompositeOperation = "destination-out";
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, size, size);
                ctx.globalCompositeOperation = "source-over";
              },
            };
            bg_func.rainbow.run(pattern);
            setTimeout(bg_func.rainbow.rectangle, 100);
          },
          ichimatsu: (): void => {
            const size = 50;
            const pattern: bg_pattern = {
              width: size * 2,
              height: size,
              shift: [0, -size],
              func: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
                ctx.globalAlpha = 0.8;
                ctx.fillRect(x, y, size, size);
                ctx.globalAlpha = 1;
                ctx.fillRect(x + size, y, size, size);
              },
            };
            bg_func.rainbow.run(pattern, false);
            setTimeout(bg_func.rainbow.ichimatsu, 100);
          },
          gingham_check: (): void => {
            const size = 30;
            const pattern: bg_pattern = {
              width: size * 2,
              height: size * 2,
              shift: [0],
              func: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
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
          triangle: (): void => {
            const size = 25;
            const pattern: bg_pattern = {
              width: size * 2,
              height: Math.sqrt(3) * size,
              shift: [0, -size],
              func: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
                const root3: number = Math.sqrt(3); //複数回使うので先に確保
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
          honeycomb: (): void => {
            const r: number = 25;
            const root3: number = Math.sqrt(3); //複数回使うので先に確保
            const honeycomb_width: number = r * root3;
            const honeycomb_height: number = (r * 3) / 2;
            const pattern: bg_pattern = {
              width: honeycomb_width,
              height: honeycomb_height,
              shift: [0, honeycomb_width / -2],
              func: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
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
          wave: () => {
            const wave_width = 250;
            const wave_r = 25;
            const pattern: bg_pattern = {
              width: wave_width,
              height: wave_r * 2,
              shift: [0],
              func: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
                ctx.globalCompositeOperation = "destination-out";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x, y);
                for (let i = 0; i < wave_width; i++) {
                  ctx.lineTo(
                    x + i,
                    y + wave_r * Math.sin((2 * Math.PI * i) / wave_width)
                  );
                }
                ctx.lineTo(x + wave_width, y);
                ctx.stroke();
                ctx.globalCompositeOperation = "source-over";
              },
            };
            bg_func.rainbow.run(pattern);
            setTimeout(bg_func.rainbow.wave, 100);
          },
          halloween: () => {
            const width = 150;
            const height = width;
            const pattern: bg_pattern = {
              width: width,
              height: height,
              shift: [0, -width / 2],
              func: (ctx: CanvasRenderingContext2D, x: number, y: number) => {
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
      const randInt: Function = (min: number, max: number): number =>
        Math.floor(Math.random() * (max + 1 - min)) + min;
      const bg_num: number = randInt(1, 6);
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
    let color_theme: string = "auto";
    const color_theme_detector: Function = (): void => {
      const init_color_theme: Function = (): void => {
        const ls_color_theme: string | null =
          localStorage.getItem("color-theme");
        if (ls_color_theme == null) {
          color_theme = "auto";
          localStorage.setItem("color-theme", color_theme);
        } else {
          color_theme = ls_color_theme;
        }
        auto_color_theme();
        renew_color_theme();
      };
      const renew_color_theme = () => {
        localStorage.setItem("color-theme", color_theme);
        const change_button: HTMLElement | null = document.querySelector(
          "#change-color-theme"
        );
        if (change_button == null) {
          return;
        }
        const animate_selected: Function = () => {
          const speed = 2;
          const selected: HTMLElement | null = document.querySelector(
            "#color-theme-change-selected"
          );
          if (selected == null) {
            return;
          }
          let target_x: number = 250;
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
          const selected_cx: string = selected!.getAttribute("cx")!;
          const selected_inertia: string =
            selected!.getAttribute("data-inertia")!;
          const now_x: number = parseFloat(selected_cx);
          let next_x: number = now_x;
          if (
            Math.abs((target_x - now_x) / speed) <
            Math.abs(parseFloat(selected_inertia))
          ) {
            selected?.setAttribute(
              "data-inertia",
              ((target_x - now_x) / speed).toString()
            );
          } else {
            if (target_x > now_x) {
              selected?.setAttribute(
                "data-inertia",
                (parseFloat(selected_inertia) + 2).toString()
              );
            } else {
              selected?.setAttribute(
                "data-inertia",
                (parseFloat(selected_inertia) - 2).toString()
              );
            }
          }
          next_x += parseFloat(selected!.getAttribute("data-inertia")!);
          if (Math.abs(next_x - target_x) > 1) {
            selected?.setAttribute("cx", next_x.toString());
            requestAnimationFrame(() => {
              animate_selected();
            });
          } else {
            selected?.setAttribute("cx", target_x.toString());
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
            if (
              window.matchMedia("(prefers-color-scheme: dark)").matches == true
            ) {
              document.documentElement.setAttribute("theme", "dark");
            } else {
              document.documentElement.setAttribute("theme", "light");
            }
            break;
          default:
            alert("error happend on change color theme");
            break;
        }
      };
      const change_color_theme = (mode: string) => {
        color_theme = mode;
        renew_color_theme();
      };
      const auto_color_theme = () => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", renew_color_theme);
      };
      init_color_theme();
      document
        .querySelector('#change-color-theme > svg > g[name="auto"]')
        ?.addEventListener("click", () => {
          change_color_theme("auto");
        });
      document
        .querySelector('#change-color-theme > svg > g[name="light"]')
        ?.addEventListener("click", () => {
          change_color_theme("light");
        });
      document
        .querySelector('#change-color-theme > svg > g[name="dark"]')
        ?.addEventListener("click", () => {
          change_color_theme("dark");
        });
    };
    select_bg();
    color_theme_detector();
  };
  client();
};
layout_main();
