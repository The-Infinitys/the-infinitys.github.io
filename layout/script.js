"use strict";
var main = function () {
    var rendering = function () {
        var htmlAttributes = function (elem, attributes) {
            attributes.forEach(function (attribute) {
                elem.setAttribute(attribute.name, attribute.value);
            });
        };
        var InfinityHeader = function () {
            var The_Infinitys_logo_src = "/image/The-Infinitys.webp";
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
                // set image
                var infinity_logo = document.createElement("img");
                infinity_logo.className = "logo";
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
                    var inf_txt = document.createElement("svg");
                    htmlAttributes(inf_txt, [
                        {
                            name: "viewBox",
                            value: "0 0 623.301 101.001",
                        },
                        {
                            name: "xmlns",
                            value: "http://www.w3.org/2000/svg",
                        },
                        {
                            name: "class",
                            value: "The-Infinitys-txt",
                        },
                    ]);
                    var innerElem = "\n          <g strokeLinecap=\"round\" fillRule=\"evenodd\" strokeWidth=\"0.25mm\">\n            <path\n              d=\"M 88 77.001 L 61.1 77.001 L 61.1 72.801 L 61.9 72.801 Q 64.2 72.801 66.05 72.301 Q 67.9 71.801 69 70.251 A 5.045 5.045 0 0 0 69.67 68.87 Q 70.087 67.58 70.1 65.721 A 17.219 17.219 0 0 0 70.1 65.601 L 70.1 12.001 A 12.54 12.54 0 0 0 70.009 10.436 Q 69.785 8.66 69.009 7.627 A 3.715 3.715 0 0 0 68.95 7.551 Q 67.8 6.101 65.95 5.651 A 15.785 15.785 0 0 0 63.501 5.264 A 19.693 19.693 0 0 0 61.9 5.201 L 61.1 5.201 L 61.1 1.001 L 79.5 1.001 L 79.5 23.001 A 71.1 71.1 0 0 1 79.444 25.785 A 80.282 80.282 0 0 1 79.4 26.751 Q 79.3 28.701 79.2 30.101 L 79.1 31.501 L 79.6 31.501 Q 81.1 28.501 83.25 26.451 Q 85.4 24.401 88.15 23.401 Q 90.9 22.401 94.3 22.401 Q 100.795 22.401 104.98 25.053 A 13.714 13.714 0 0 1 107.45 27.051 A 13.861 13.861 0 0 1 110.459 31.925 Q 111.277 34.093 111.661 36.801 A 37.155 37.155 0 0 1 112 42.001 L 112 65.601 Q 112 68.479 112.862 70.021 A 4.238 4.238 0 0 0 113 70.251 Q 114 71.801 115.75 72.301 A 12.642 12.642 0 0 0 117.799 72.698 A 16.869 16.869 0 0 0 119.7 72.801 L 120 72.801 L 120 77.001 L 102.6 77.001 L 102.6 42.501 Q 102.6 38.235 101.545 35.218 A 12.053 12.053 0 0 0 100.15 32.401 A 7.609 7.609 0 0 0 96.239 29.49 Q 94.885 29.016 93.202 28.868 A 18.284 18.284 0 0 0 91.6 28.801 A 13.835 13.835 0 0 0 88.527 29.124 A 9.853 9.853 0 0 0 84.8 30.801 A 10.955 10.955 0 0 0 81.642 34.528 A 14.336 14.336 0 0 0 80.8 36.451 Q 79.581 39.872 79.505 44.393 A 36.067 36.067 0 0 0 79.5 45.001 L 79.5 66.101 A 11.673 11.673 0 0 0 79.601 67.695 Q 79.712 68.495 79.943 69.143 A 4.544 4.544 0 0 0 80.65 70.451 Q 81.8 71.901 83.65 72.351 A 15.785 15.785 0 0 0 86.099 72.737 A 19.693 19.693 0 0 0 87.7 72.801 L 88 72.801 L 88 77.001 Z M 507.9 101.001 L 507.9 96.301 Q 513 96.301 516.7 94.801 A 18.914 18.914 0 0 0 521.541 91.977 A 17.334 17.334 0 0 0 523 90.651 A 23.977 23.977 0 0 0 526.818 85.502 A 27.629 27.629 0 0 0 527.4 84.401 A 44.072 44.072 0 0 0 529.929 78.154 A 50.114 50.114 0 0 0 530.4 76.601 L 511.9 32.901 A 23.2 23.2 0 0 0 511.338 31.681 Q 511.028 31.061 510.719 30.553 A 9.431 9.431 0 0 0 510.1 29.651 Q 509.2 28.501 508 28.051 Q 507.16 27.736 505.929 27.641 A 14.783 14.783 0 0 0 504.8 27.601 L 504.5 27.601 L 504.5 23.401 L 528.5 23.401 L 528.5 27.601 L 528.2 27.601 Q 526.354 27.601 525.075 28.036 A 4.769 4.769 0 0 0 523.7 28.751 A 3.621 3.621 0 0 0 522.429 30.653 Q 522.245 31.273 522.209 32.027 A 7.836 7.836 0 0 0 522.2 32.401 Q 522.2 33.201 522.4 34.101 A 13.378 13.378 0 0 0 522.631 34.988 Q 522.787 35.516 523 36.101 L 530.3 53.901 A 64.037 64.037 0 0 1 531.47 56.79 A 79.934 79.934 0 0 1 532.25 58.951 Q 533.2 61.701 534 64.201 A 49.245 49.245 0 0 1 534.491 65.825 Q 534.697 66.555 534.849 67.199 A 21.435 21.435 0 0 1 535.1 68.401 A 50.868 50.868 0 0 1 536.339 64.128 A 59.393 59.393 0 0 1 536.95 62.401 Q 538.1 59.301 539.1 56.301 L 545.8 36.801 A 11.636 11.636 0 0 0 546.336 35.211 A 9.93 9.93 0 0 0 546.5 34.451 Q 546.7 33.301 546.7 32.501 A 6.433 6.433 0 0 0 546.555 31.085 Q 546.21 29.559 545.05 28.751 Q 543.4 27.601 540.1 27.601 L 539.8 27.601 L 539.8 23.401 L 560.6 23.401 L 560.6 27.601 L 560.3 27.601 Q 558.726 27.601 557.563 28.012 A 5.446 5.446 0 0 0 557.1 28.201 A 4.095 4.095 0 0 0 555.905 29.058 Q 555.493 29.474 555.129 30.037 A 8.26 8.26 0 0 0 554.85 30.501 A 20.459 20.459 0 0 0 554.232 31.71 Q 553.624 32.991 552.93 34.796 A 74.881 74.881 0 0 0 552.7 35.401 L 537.5 77.401 A 138.728 138.728 0 0 1 535.657 82.299 Q 534.746 84.58 533.861 86.51 A 61.074 61.074 0 0 1 532.5 89.301 A 31.249 31.249 0 0 1 530.48 92.67 Q 528.913 94.927 527.15 96.451 A 15.525 15.525 0 0 1 522.439 99.213 A 19.959 19.959 0 0 1 519.8 100.001 Q 516.517 100.747 512.01 100.936 A 76.539 76.539 0 0 1 508.8 101.001 L 507.9 101.001 Z M 268.7 77.001 L 241.8 77.001 L 241.8 72.801 L 242.6 72.801 Q 244.9 72.801 246.75 72.301 Q 248.6 71.801 249.7 70.251 A 5.045 5.045 0 0 0 250.37 68.87 Q 250.787 67.58 250.8 65.721 A 17.219 17.219 0 0 0 250.8 65.601 L 250.8 34.401 A 13.104 13.104 0 0 0 250.713 32.836 Q 250.506 31.124 249.81 30.103 A 3.747 3.747 0 0 0 249.7 29.951 Q 248.6 28.501 246.8 28.051 A 14.755 14.755 0 0 0 244.648 27.687 A 19.111 19.111 0 0 0 242.8 27.601 L 242.3 27.601 L 242.3 23.401 L 258.5 23.401 L 259.8 31.501 L 260.3 31.501 Q 261.881 28.64 263.603 26.828 A 13.332 13.332 0 0 1 264.75 25.751 A 13.047 13.047 0 0 1 269.036 23.35 A 12.496 12.496 0 0 1 269.9 23.101 A 23.699 23.699 0 0 1 274.277 22.447 A 27.904 27.904 0 0 1 275.9 22.401 A 21.574 21.574 0 0 1 281.028 22.975 A 14.53 14.53 0 0 1 288.25 27.051 Q 292.7 31.701 292.7 42.001 L 292.7 65.601 Q 292.7 68.701 293.65 70.251 Q 294.6 71.801 296.3 72.301 A 11.828 11.828 0 0 0 298.186 72.683 Q 299.105 72.797 300.134 72.8 A 19.22 19.22 0 0 0 300.2 72.801 L 300.7 72.801 L 300.7 77.001 L 283.3 77.001 L 283.3 42.501 Q 283.3 38.235 282.245 35.218 A 12.053 12.053 0 0 0 280.85 32.401 A 7.609 7.609 0 0 0 276.939 29.49 Q 275.585 29.016 273.902 28.868 A 18.284 18.284 0 0 0 272.3 28.801 A 14.587 14.587 0 0 0 269.365 29.079 Q 267.57 29.447 266.178 30.305 A 8.353 8.353 0 0 0 265.15 31.051 Q 262.5 33.301 261.35 37.001 Q 260.2 40.701 260.2 45.001 L 260.2 66.101 Q 260.2 69.001 261.3 70.451 Q 262.4 71.901 264.2 72.351 A 14.755 14.755 0 0 0 266.352 72.714 A 19.111 19.111 0 0 0 268.2 72.801 L 268.7 72.801 L 268.7 77.001 Z M 402.1 77.001 L 375.2 77.001 L 375.2 72.801 L 376 72.801 Q 378.3 72.801 380.15 72.301 Q 382 71.801 383.1 70.251 A 5.045 5.045 0 0 0 383.77 68.87 Q 384.187 67.58 384.2 65.721 A 17.219 17.219 0 0 0 384.2 65.601 L 384.2 34.401 A 13.104 13.104 0 0 0 384.113 32.836 Q 383.906 31.124 383.21 30.103 A 3.747 3.747 0 0 0 383.1 29.951 Q 382 28.501 380.2 28.051 A 14.755 14.755 0 0 0 378.048 27.687 A 19.111 19.111 0 0 0 376.2 27.601 L 375.7 27.601 L 375.7 23.401 L 391.9 23.401 L 393.2 31.501 L 393.7 31.501 Q 395.281 28.64 397.003 26.828 A 13.332 13.332 0 0 1 398.15 25.751 A 13.047 13.047 0 0 1 402.436 23.35 A 12.496 12.496 0 0 1 403.3 23.101 A 23.699 23.699 0 0 1 407.677 22.447 A 27.904 27.904 0 0 1 409.3 22.401 A 21.574 21.574 0 0 1 414.428 22.975 A 14.53 14.53 0 0 1 421.65 27.051 Q 426.1 31.701 426.1 42.001 L 426.1 65.601 Q 426.1 68.701 427.05 70.251 Q 428 71.801 429.7 72.301 A 11.828 11.828 0 0 0 431.586 72.683 Q 432.505 72.797 433.534 72.8 A 19.22 19.22 0 0 0 433.6 72.801 L 434.1 72.801 L 434.1 77.001 L 416.7 77.001 L 416.7 42.501 Q 416.7 38.235 415.645 35.218 A 12.053 12.053 0 0 0 414.25 32.401 A 7.609 7.609 0 0 0 410.339 29.49 Q 408.985 29.016 407.302 28.868 A 18.284 18.284 0 0 0 405.7 28.801 A 14.587 14.587 0 0 0 402.765 29.079 Q 400.97 29.447 399.578 30.305 A 8.353 8.353 0 0 0 398.55 31.051 Q 395.9 33.301 394.75 37.001 Q 393.6 40.701 393.6 45.001 L 393.6 66.101 Q 393.6 69.001 394.7 70.451 Q 395.8 71.901 397.6 72.351 A 14.755 14.755 0 0 0 399.752 72.714 A 19.111 19.111 0 0 0 401.6 72.801 L 402.1 72.801 L 402.1 77.001 Z M 44.1 77.001 L 13 77.001 L 13 72.801 L 15.3 72.801 A 18.863 18.863 0 0 0 17.664 72.658 A 15.182 15.182 0 0 0 19.35 72.351 Q 21.2 71.901 22.35 70.451 Q 23.179 69.405 23.41 67.607 A 11.832 11.832 0 0 0 23.5 66.101 L 23.5 10.601 L 13.9 10.601 Q 11.343 10.601 9.698 11.428 A 4.991 4.991 0 0 0 7.8 13.051 Q 6.1 15.501 5.7 18.801 L 5.2 23.101 L 0 23.101 L 0.5 5.601 L 56.8 5.601 L 57.3 23.101 L 52.1 23.101 L 51.6 18.801 A 13.62 13.62 0 0 0 50.739 15.357 A 11.607 11.607 0 0 0 49.5 13.051 Q 48.152 11.108 45.043 10.706 A 13.611 13.611 0 0 0 43.3 10.601 L 33.6 10.601 L 33.6 65.601 A 14.094 14.094 0 0 0 33.687 67.222 Q 33.898 69.035 34.618 70.131 A 4.105 4.105 0 0 0 34.7 70.251 Q 35.8 71.801 37.7 72.301 A 15.233 15.233 0 0 0 40.454 72.752 A 18.189 18.189 0 0 0 41.8 72.801 L 44.1 72.801 L 44.1 77.001 Z M 337.1 77.001 L 306.2 77.001 L 306.2 72.801 L 307.5 72.801 Q 309.8 72.801 311.65 72.301 Q 313.5 71.801 314.6 70.251 A 5.045 5.045 0 0 0 315.27 68.87 Q 315.687 67.58 315.7 65.721 A 17.219 17.219 0 0 0 315.7 65.601 L 315.7 28.101 L 306.6 28.101 L 306.6 23.401 L 315.7 23.401 L 315.7 18.401 Q 315.7 9.501 320.45 4.751 A 15.753 15.753 0 0 1 328.39 0.512 A 23.248 23.248 0 0 1 333.4 0.001 Q 338.466 0.001 341.492 0.855 A 14.047 14.047 0 0 1 341.65 0.901 A 14.747 14.747 0 0 1 343.39 1.527 Q 344.243 1.9 344.9 2.347 A 5.96 5.96 0 0 1 346.05 3.351 Q 347.4 4.901 347.4 7.001 A 5.127 5.127 0 0 1 347.169 8.567 A 4.335 4.335 0 0 1 346.35 10.051 A 5.851 5.851 0 0 1 344.726 11.378 A 7.946 7.946 0 0 1 343.45 11.951 A 11.103 11.103 0 0 1 341.329 12.458 A 15.128 15.128 0 0 1 339.2 12.601 Q 339.2 10.601 338.6 8.751 A 6.603 6.603 0 0 0 337.546 6.723 A 6.055 6.055 0 0 0 336.6 5.751 Q 335.2 4.601 332.6 4.601 A 8.635 8.635 0 0 0 330.34 4.876 A 5.465 5.465 0 0 0 326.7 7.901 Q 325.1 11.201 325.1 17.501 L 325.1 23.401 L 339.2 23.401 L 339.2 28.101 L 325.1 28.101 L 325.1 65.601 A 14.094 14.094 0 0 0 325.187 67.222 Q 325.398 69.035 326.118 70.131 A 4.105 4.105 0 0 0 326.2 70.251 Q 327.3 71.801 329.2 72.301 A 15.233 15.233 0 0 0 331.954 72.752 A 18.189 18.189 0 0 0 333.3 72.801 L 337.1 72.801 L 337.1 77.001 Z M 599.482 77.772 A 35.132 35.132 0 0 0 603.6 78.001 Q 607.911 78.001 611.401 77.074 A 19.259 19.259 0 0 0 617.9 74.051 A 12.534 12.534 0 0 0 622.691 67.107 A 17.86 17.86 0 0 0 623.3 62.301 A 22.14 22.14 0 0 0 623.294 61.804 Q 623.256 60.085 622.948 58.593 A 12.522 12.522 0 0 0 621.75 55.201 Q 620.2 52.301 616.9 50.101 A 32.982 32.982 0 0 0 615.169 49.026 Q 612.306 47.363 608.3 45.701 A 125.807 125.807 0 0 1 605.59 44.557 Q 604.324 44.004 603.236 43.489 A 54.337 54.337 0 0 1 601.15 42.451 A 18.191 18.191 0 0 1 599.903 41.732 Q 598.097 40.588 597.15 39.301 A 6.209 6.209 0 0 1 596.122 37.068 A 8.287 8.287 0 0 1 595.9 35.101 A 10.314 10.314 0 0 1 595.948 34.089 A 7.637 7.637 0 0 1 598.1 29.351 A 5.462 5.462 0 0 1 598.219 29.232 Q 599.813 27.699 602.828 27.269 A 18.246 18.246 0 0 1 605.4 27.101 Q 606.809 27.101 607.983 27.388 A 6.719 6.719 0 0 1 611.9 29.901 Q 613.344 31.826 613.795 34.79 A 19.377 19.377 0 0 1 614 37.701 A 13.102 13.102 0 0 0 615.189 37.649 Q 617.828 37.408 619.35 36.051 A 5.316 5.316 0 0 0 620.883 33.756 A 6.383 6.383 0 0 0 621.2 31.701 A 7.074 7.074 0 0 0 620.873 29.553 A 7.744 7.744 0 0 0 619.55 27.101 A 8.274 8.274 0 0 0 618.977 26.446 Q 618.092 25.535 616.863 24.808 A 14.687 14.687 0 0 0 614.65 23.751 A 15.481 15.481 0 0 0 613.182 23.271 Q 611.712 22.869 609.982 22.676 A 30.683 30.683 0 0 0 606.6 22.501 Q 598.1 22.501 592.95 26.151 A 11.618 11.618 0 0 0 588.517 31.965 A 14.267 14.267 0 0 0 587.8 36.601 A 21.294 21.294 0 0 0 587.817 37.459 Q 587.968 41.19 589.45 43.751 A 13.129 13.129 0 0 0 591.763 46.658 A 17.714 17.714 0 0 0 594.45 48.751 Q 597.8 50.901 602.9 53.201 A 140.167 140.167 0 0 1 603.826 53.601 Q 608.056 55.45 610.45 56.851 Q 612.148 57.844 613.189 58.857 A 6.882 6.882 0 0 1 614.15 60.001 A 5.491 5.491 0 0 1 614.461 60.54 Q 615.2 62.003 615.2 64.101 A 10.86 10.86 0 0 1 615.189 64.595 A 8.313 8.313 0 0 1 612.35 70.651 Q 610.413 72.384 607.344 72.939 A 17.686 17.686 0 0 1 604.2 73.201 A 17.863 17.863 0 0 1 602.855 73.152 Q 601.199 73.026 599.863 72.582 A 7.438 7.438 0 0 1 595.75 69.451 A 14.857 14.857 0 0 1 593.883 64.915 A 19.311 19.311 0 0 1 593.4 60.501 Q 592.2 60.501 590.75 61.101 Q 589.3 61.701 588.2 63.201 A 4.85 4.85 0 0 0 587.603 64.297 Q 587.333 64.984 587.207 65.83 A 10.757 10.757 0 0 0 587.1 67.401 A 10.978 10.978 0 0 0 587.166 68.621 A 8.259 8.259 0 0 0 589.15 73.251 Q 591.2 75.601 594.9 76.801 A 20.332 20.332 0 0 0 595.696 77.041 Q 597.453 77.532 599.482 77.772 Z M 235.2 77.001 L 206.1 77.001 L 206.1 72.801 L 207.4 72.801 Q 209.7 72.801 211.55 72.301 Q 213.4 71.801 214.5 70.251 A 5.045 5.045 0 0 0 215.17 68.87 Q 215.587 67.58 215.6 65.721 A 17.219 17.219 0 0 0 215.6 65.601 L 215.6 17.001 A 14.799 14.799 0 0 0 215.513 15.335 Q 215.32 13.633 214.696 12.595 A 3.873 3.873 0 0 0 214.5 12.301 Q 213.4 10.801 211.55 10.301 A 14.115 14.115 0 0 0 209.326 9.896 A 18.631 18.631 0 0 0 207.4 9.801 L 206.1 9.801 L 206.1 5.601 L 235.2 5.601 L 235.2 9.801 L 233.9 9.801 A 17.148 17.148 0 0 0 231.267 9.996 A 14.51 14.51 0 0 0 229.8 10.301 A 5.523 5.523 0 0 0 227.882 11.204 A 5.171 5.171 0 0 0 226.8 12.301 Q 225.771 13.704 225.705 16.597 A 17.684 17.684 0 0 0 225.7 17.001 L 225.7 65.601 A 14.094 14.094 0 0 0 225.787 67.222 Q 225.998 69.035 226.718 70.131 A 4.105 4.105 0 0 0 226.8 70.251 Q 227.9 71.801 229.8 72.301 A 15.233 15.233 0 0 0 232.554 72.752 A 18.189 18.189 0 0 0 233.9 72.801 L 235.2 72.801 L 235.2 77.001 Z M 171.3 46.301 L 171.3 50.901 L 138 50.901 A 51.602 51.602 0 0 0 138.384 56.489 Q 139.24 63.173 141.95 66.751 A 12.158 12.158 0 0 0 150.117 71.496 A 18.197 18.197 0 0 0 152.9 71.701 A 21.004 21.004 0 0 0 157.012 71.318 A 15.067 15.067 0 0 0 161.75 69.551 A 21.107 21.107 0 0 0 164.388 67.731 Q 165.731 66.635 166.679 65.422 A 11.859 11.859 0 0 0 167.2 64.701 Q 167.9 65.001 168.5 65.901 A 3.504 3.504 0 0 1 169.022 67.217 A 4.811 4.811 0 0 1 169.1 68.101 A 4.96 4.96 0 0 1 168.737 69.907 Q 168.46 70.617 167.973 71.36 A 11.822 11.822 0 0 1 167.2 72.401 Q 165.712 74.202 162.997 75.605 A 23.026 23.026 0 0 1 161.4 76.351 A 18.703 18.703 0 0 1 157.885 77.419 Q 156.121 77.782 154.068 77.919 A 38.786 38.786 0 0 1 151.5 78.001 A 26.471 26.471 0 0 1 144.136 77.03 A 19.63 19.63 0 0 1 134.45 70.801 Q 129.261 64.726 128.45 54.521 A 49.524 49.524 0 0 1 128.3 50.601 A 54.162 54.162 0 0 1 128.811 42.896 Q 129.379 38.957 130.576 35.767 A 22.081 22.081 0 0 1 134.1 29.501 A 18.882 18.882 0 0 1 146.392 22.693 A 27.717 27.717 0 0 1 150.5 22.401 A 25.286 25.286 0 0 1 156.936 23.175 A 17.948 17.948 0 0 1 165.75 28.401 Q 171.3 34.401 171.3 46.301 Z M 478.4 62.501 L 478.4 29.101 L 470.8 29.101 L 470.8 25.101 A 10.203 10.203 0 0 0 472.575 24.936 Q 473.433 24.784 474.366 24.493 A 17.875 17.875 0 0 0 474.8 24.351 Q 477 23.601 478.6 21.901 A 13.74 13.74 0 0 0 480.644 19.066 A 16.998 16.998 0 0 0 481.4 17.501 Q 482.5 14.901 483.2 11.101 L 487.8 11.101 L 487.8 23.401 L 500.9 23.401 L 500.9 29.101 L 487.8 29.101 L 487.8 62.801 A 19.75 19.75 0 0 0 487.966 65.456 Q 488.389 68.562 489.887 70.285 A 6.008 6.008 0 0 0 489.9 70.301 A 6.87 6.87 0 0 0 494.928 72.689 A 9.26 9.26 0 0 0 495.4 72.701 Q 497.2 72.701 498.7 72.501 A 57.924 57.924 0 0 0 501.006 72.144 A 64.602 64.602 0 0 0 501.8 72.001 L 501.8 76.401 Q 500.5 77.001 497.9 77.501 A 27.734 27.734 0 0 1 494.42 77.952 A 23.994 23.994 0 0 1 492.9 78.001 A 26.533 26.533 0 0 1 488.953 77.728 Q 484.33 77.03 481.85 74.551 A 9.697 9.697 0 0 1 479.765 71.281 Q 478.561 68.307 478.419 63.748 A 40.093 40.093 0 0 1 478.4 62.501 Z M 371.1 77.001 L 342.7 77.001 L 342.7 72.801 L 344 72.801 A 18.863 18.863 0 0 0 346.364 72.658 A 15.182 15.182 0 0 0 348.05 72.351 Q 349.9 71.901 351.05 70.451 Q 351.879 69.405 352.11 67.607 A 11.832 11.832 0 0 0 352.2 66.101 L 352.2 34.401 A 12.54 12.54 0 0 0 352.109 32.836 Q 351.885 31.06 351.109 30.027 A 3.715 3.715 0 0 0 351.05 29.951 Q 349.9 28.501 348.05 28.051 A 15.785 15.785 0 0 0 345.601 27.664 A 19.693 19.693 0 0 0 344 27.601 L 343.7 27.601 L 343.7 23.401 L 361.6 23.401 L 361.6 65.601 A 14.094 14.094 0 0 0 361.687 67.222 Q 361.898 69.035 362.618 70.131 A 4.105 4.105 0 0 0 362.7 70.251 Q 363.8 71.801 365.7 72.301 A 15.233 15.233 0 0 0 368.454 72.752 A 18.189 18.189 0 0 0 369.8 72.801 L 371.1 72.801 L 371.1 77.001 Z M 467.6 77.001 L 439.2 77.001 L 439.2 72.801 L 440.5 72.801 A 18.863 18.863 0 0 0 442.864 72.658 A 15.182 15.182 0 0 0 444.55 72.351 Q 446.4 71.901 447.55 70.451 Q 448.379 69.405 448.61 67.607 A 11.832 11.832 0 0 0 448.7 66.101 L 448.7 34.401 A 12.54 12.54 0 0 0 448.609 32.836 Q 448.385 31.06 447.609 30.027 A 3.715 3.715 0 0 0 447.55 29.951 Q 446.4 28.501 444.55 28.051 A 15.785 15.785 0 0 0 442.101 27.664 A 19.693 19.693 0 0 0 440.5 27.601 L 440.2 27.601 L 440.2 23.401 L 458.1 23.401 L 458.1 65.601 A 14.094 14.094 0 0 0 458.187 67.222 Q 458.398 69.035 459.118 70.131 A 4.105 4.105 0 0 0 459.2 70.251 Q 460.3 71.801 462.2 72.301 A 15.233 15.233 0 0 0 464.954 72.752 A 18.189 18.189 0 0 0 466.3 72.801 L 467.6 72.801 L 467.6 77.001 Z M 138.2 45.501 L 161.2 45.501 A 42.58 42.58 0 0 0 160.914 40.4 Q 160.606 37.854 159.967 35.735 A 18.978 18.978 0 0 0 158.75 32.651 Q 156.3 27.801 150.3 27.801 A 10.578 10.578 0 0 0 146.165 28.581 Q 143.784 29.581 142.092 31.864 A 12.676 12.676 0 0 0 141.75 32.351 Q 138.7 36.901 138.2 45.501 Z M 573.9 29.101 L 569.3 29.101 L 566.3 5.601 L 576.9 5.601 L 573.9 29.101 Z M 354.431 13.098 A 6.809 6.809 0 0 0 356.5 13.401 Q 358.8 13.401 360.5 12.001 Q 361.735 10.983 362.073 8.91 A 10.663 10.663 0 0 0 362.2 7.201 A 14.272 14.272 0 0 0 362.2 7.171 Q 362.196 5.222 361.662 3.943 A 3.904 3.904 0 0 0 360.5 2.351 A 6.118 6.118 0 0 0 358.928 1.44 A 6.577 6.577 0 0 0 356.5 1.001 A 7.818 7.818 0 0 0 355.591 1.052 A 5.937 5.937 0 0 0 352.45 2.351 Q 351.232 3.347 350.913 5.516 A 11.621 11.621 0 0 0 350.8 7.201 A 11.113 11.113 0 0 0 350.912 8.833 Q 351.038 9.682 351.308 10.357 A 4.103 4.103 0 0 0 352.45 12.001 A 5.694 5.694 0 0 0 354.431 13.098 Z M 450.931 13.098 A 6.809 6.809 0 0 0 453 13.401 Q 455.3 13.401 457 12.001 Q 458.235 10.983 458.573 8.91 A 10.663 10.663 0 0 0 458.7 7.201 A 14.272 14.272 0 0 0 458.7 7.171 Q 458.696 5.222 458.162 3.943 A 3.904 3.904 0 0 0 457 2.351 A 6.118 6.118 0 0 0 455.428 1.44 A 6.577 6.577 0 0 0 453 1.001 A 7.818 7.818 0 0 0 452.091 1.052 A 5.937 5.937 0 0 0 448.95 2.351 Q 447.732 3.347 447.413 5.516 A 11.621 11.621 0 0 0 447.3 7.201 A 11.113 11.113 0 0 0 447.412 8.833 Q 447.538 9.682 447.808 10.357 A 4.103 4.103 0 0 0 448.95 12.001 A 5.694 5.694 0 0 0 450.931 13.098 Z\"\n              vectorEffect=\"non-scaling-stroke\"\n            />\n          </g>";
                    inf_txt.innerHTML = innerElem;
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
                result.append(HamburgerMenu());
            }
            return result;
        };
        var HamburgerMenu = function () {
            var hamburger_icons = {
                X: "/layout/image/hamburger/menu/x.svg",
                article: "/layout/image/hamburger/menu/article.svg",
                scratch: "/layout/image/hamburger/menu/scratch.svg",
                github: "/layout/image/hamburger/menu/github.svg",
            };
            var result = document.createElement("div");
            result.className = "Hamburger-Menu";
            var menus = [
                {
                    name: "Article",
                    href: "/article/",
                    target: "_self",
                    src: hamburger_icons.article,
                },
                {
                    name: "Scratch",
                    href: "https://scratch.mit.edu/users/The_Infinitys",
                    target: "blank",
                    src: hamburger_icons.scratch,
                },
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
            ];
            menus.forEach(function (menu) {
                var link_menu = document.createElement("div");
                {
                    var link_menu_a = document.createElement("a");
                    htmlAttributes(link_menu_a, [
                        { name: "href", value: menu.href },
                        { name: "target", value: menu.target },
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
                result.append(link_menu);
            });
            return result;
        };
        var InfinityFooter = function () {
            var result = document.createElement("footer");
            result.className = "The-Infinitys-Footer";
            var content = "<h1>&copy; 2024 The Infinity&apos;s</h1>";
            result.innerHTML = content;
            return result;
        };
        document.body.prepend(InfinityHeader());
        document.body.append(InfinityFooter());
        var generate_background = function () {
            var monochrome_dark = "/layout/image/background/monochrome/dark.svg";
            var monochrome_light = "/layout/image/background/monochrome/light.svg";
            var monochrome_center = "/layout/image/background/monochrome/center.svg";
            var result = document.createElement("div");
            result.id = "BackGround";
            result.innerHTML = "\n      <div data-background-name=\"monochrome\">\n        <img\n          alt=\"\"\n          className=\"background fill dark translucent\"\n          src=".concat(monochrome_dark, "\n        />\n        <img\n          alt=\"\"\n          className=\"background fill light translucent\"\n          src=").concat(monochrome_light, "\n        />\n        <img\n          alt=\"\"\n          className=\"background center translucent\"\n          src=").concat(monochrome_center, "\n        />\n      </div>\n      <div data-background-name=\"rainbow\">\n        <canvas className=\"background fill rainbow\"></canvas>\n      </div>");
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
                raindrop: function () {
                    var raindrop = document.querySelector('#BackGround>div[data-background-name="raindrop"]');
                    if (raindrop == null) {
                        return 1;
                    }
                    else {
                        raindrop.style.display = "contents";
                        return 0;
                    }
                },
                rainbow: {
                    run: function (pattern) {
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
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
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
                        var pattern = {
                            width: 100,
                            height: 100,
                            shift: [0],
                            func: function (ctx, x, y) {
                                ctx.globalCompositeOperation = "destination-out";
                                ctx.lineWidth = 2;
                                ctx.strokeRect(x, y, 100, 100);
                                ctx.globalCompositeOperation = "source-over";
                            },
                        };
                        bg_func.rainbow.run(pattern);
                        setTimeout(bg_func.rainbow.rectangle, 100);
                    },
                    triangle: function () {
                        var pattern = {
                            width: 100,
                            height: Math.sqrt(3) * 50,
                            shift: [0, -50],
                            func: function (ctx, x, y) {
                                var root3 = Math.sqrt(3); //複数回使うので先に確保
                                ctx.globalCompositeOperation = "destination-out";
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x + 100, y);
                                ctx.lineTo(x + 50, y + 50 * root3);
                                ctx.closePath();
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(x + 100, y);
                                ctx.lineTo(x + 150, y + 50 * root3);
                                ctx.lineTo(x + 50, y + 50 * root3);
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
                },
            };
            var randInt = function (min, max) {
                return Math.floor(Math.random() * (max + 1 - min)) + min;
            };
            var bg_num = randInt(1, 5);
            switch (bg_num) {
                // monochrome
                case 1:
                    bg_func.monochrome();
                    break;
                // rainbow rectangle
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
                    bg_func.raindrop();
                    break;
                // error
                default:
                    break;
            }
            return 0;
        };
        select_bg();
    };
    client();
};
main();