(function (z) {
    var K = function (h, b, f, n) {
            var c = J(f, b);
            c.addData(h);
            c.make();
            n = n || 0;
            var p = c.getModuleCount(),
                v = c.getModuleCount() + 2 * n;
            this.text = h;
            this.level = b;
            this.version = f;
            this.moduleCount = v;
            this.isDark = function (b, f) {
                b -= n;
                f -= n;
                return 0 > b || b >= p || 0 > f || f >= p ? !1 : c.isDark(b, f)
            };
            this.addBlank = function (b, f, c, h) {
                var n = this.isDark,
                    p = 1 / v;
                this.isDark = function (C, m) {
                    var a = m * p,
                        d = C * p,
                        y = a + p,
                        g = d + p;
                    return n(C, m) && (b > y || a > c || f > g || d > h)
                }
            }
        },
        F = function () {
            var h = document.createElement("canvas");
            return !(!h.getContext || !h.getContext("2d"))
        }(),
        L = "[object Opera]" !== Object.prototype.toString.call(window.opera),
        G = function (h, b, f, n, c) {
            f = Math.max(1, f || 1);
            for (n = Math.min(40, n || 40); f <= n; f += 1) try {
                return new K(h, b, f, c)
            } catch (p) {}
        },
        M = function (h, b, f, n, c, p, v, k) {
            h.isDark(v, k) && b.rect(n, c, p, p)
        },
        N = function (h, b, f, n, c, p, v, k) {
            var x = h.isDark;
            h = n + p;
            var w = c + p;
            f = f.radius * p;
            var q = v - 1,
                z = v + 1,
                D = k - 1,
                C = k + 1,
                m = x(v, k),
                a = x(q, D);
            p = x(q, k);
            var d = x(q, C),
                q = x(v, C),
                C = x(z, C);
            k = x(z, k);
            z = x(z, D);
            v = x(v, D);
            m ? (a = !p && !v, p = !p && !q, q = !k && !q, v = !k && !v, a ? b.moveTo(n + f, c) : b.moveTo(n, c), p ? (b.lineTo(h -
                f, c), b.arcTo(h, c, h, w, f)) : b.lineTo(h, c), q ? (b.lineTo(h, w - f), b.arcTo(h, w, n, w, f)) : b.lineTo(h, w), v ? (b.lineTo(n + f, w), b.arcTo(n, w, n, c, f)) : b.lineTo(n, w), a ? (b.lineTo(n, c + f), b.arcTo(n, c, h, c, f)) : b.lineTo(n, c)) : (x = p && q && d, q = k && q && C, k = k && v && z, p && v && a && (b.moveTo(n + f, c), b.lineTo(n, c), b.lineTo(n, c + f), b.arcTo(n, c, n + f, c, f)), x && (b.moveTo(h - f, c), b.lineTo(h, c), b.lineTo(h, c + f), b.arcTo(h, c, h - f, c, f)), q && (b.moveTo(h - f, w), b.lineTo(h, w), b.lineTo(h, w - f), b.arcTo(h, w, h - f, w, f)), k && (b.moveTo(n + f, w), b.lineTo(n, w), b.lineTo(n, w - f), b.arcTo(n, w, n + f, w, f)))
        },
        H = function (h, b) {
            var f = G(b.text, b.ecLevel, b.minVersion, b.maxVersion, b.quiet);
            if (!f) return null;
            var n = z(h).data("qrcode", f),
                c = n[0].getContext("2d");
            z(b.background).is("img") ? c.drawImage(b.background, 0, 0, b.size, b.size) : b.background && (c.fillStyle = b.background, c.fillRect(b.left, b.top, b.size, b.size));
            var p = b.mode;
            if (1 === p || 2 === p) {
                var p = b.size,
                    v = "bold " + b.mSize * p + "px " + b.fontname,
                    k = z("<canvas/>")[0].getContext("2d");
                k.font = v;
                var x = k.measureText(b.label).width,
                    k = b.mSize,
                    w = x / p,
                    x = (1 -
                        w) * b.mPosX,
                    q = (1 - k) * b.mPosY,
                    w = x + w,
                    k = q + k;
                1 === b.mode ? f.addBlank(0, q - .01, p, k + .01) : f.addBlank(x - .01, q - .01, w + .01, k + .01);
                c.fillStyle = b.fontcolor;
                c.font = v;
                c.fillText(b.label, x * p, q * p + .75 * b.mSize * p)
            } else if (3 === p || 4 === p) {
                var p = b.size,
                    v = b.mSize,
                    k = v * (b.image.naturalWidth || 1) / (b.image.naturalHeight || 1),
                    x = (1 - k) * b.mPosX,
                    q = (1 - v) * b.mPosY,
                    w = x + k,
                    E = q + v;
                3 === b.mode ? f.addBlank(0, q - .01, p, E + .01) : f.addBlank(x - .01, q - .01, w + .01, E + .01);
                c.drawImage(b.image, x * p, q * p, k * p, v * p)
            }
            p = f.moduleCount;
            v = b.size / p;
            k = M;
            L && 0 < b.radius && .5 >= b.radius && (k = N);
            c.beginPath();
            for (x = 0; x < p; x += 1)
                for (q = 0; q < p; q += 1) k(f, c, b, b.left + q * v, b.top + x * v, v, x, q);
            z(b.fill).is("img") ? (c.strokeStyle = "rgba(0,0,0,0.5)", c.lineWidth = 2, c.stroke(), f = c.globalCompositeOperation, c.globalCompositeOperation = "destination-out", c.fill(), c.globalCompositeOperation = f, c.clip(), c.drawImage(b.fill, 0, 0, b.size, b.size), c.restore()) : (c.fillStyle = b.fill, c.fill());
            return n
        },
        I = function (h) {
            var b = z("<canvas/>").attr("width", h.size).attr("height", h.size);
            return H(b, h)
        },
        O = function (h) {
            if (F && "canvas" === h.render) return I(h);
            if (F && "image" === h.render) return z("<img/>").attr("src", I(h)[0].toDataURL("image/png"));
            var b;
            if (b = G(h.text, h.ecLevel, h.minVersion, h.maxVersion, h.quiet)) {
                var f = h.size,
                    n = h.background,
                    c = Math.floor,
                    p = b.moduleCount,
                    v = c(f / p),
                    c = c(.5 * (f - v * p)),
                    k, f = {
                        position: "relative",
                        left: 0,
                        top: 0,
                        padding: 0,
                        margin: 0,
                        width: f,
                        height: f
                    };
                h = {
                    position: "absolute",
                    padding: 0,
                    margin: 0,
                    width: v,
                    height: v,
                    "background-color": h.fill
                };
                f = z("<div/>").data("qrcode", b).css(f);
                n && f.css("background-color", n);
                for (n = 0; n < p; n += 1)
                    for (k = 0; k < p; k += 1) b.isDark(n, k) && z("<div/>").css(h).css({
                        left: c + k * v,
                        top: c + n * v
                    }).appendTo(f);
                b = f
            } else b = null;
            return b
        },
        P = {
            render: "canvas",
            minVersion: 1,
            maxVersion: 40,
            ecLevel: "L",
            left: 0,
            top: 0,
            size: 200,
            fill: "#000",
            background: null,
            text: "no text",
            radius: 0,
            quiet: 0,
            mode: 0,
            mSize: .1,
            mPosX: .5,
            mPosY: .5,
            label: "no label",
            fontname: "sans",
            fontcolor: "#000",
            image: null
        };
    z.fn.qrcode = function (h) {
        var b = z.extend({}, P, h);
        return this.each(function () {
            "canvas" === this.nodeName.toLowerCase() ? H(this, b) : z(this).append(O(b))
        })
    };
    var J = function () {
        function h(b, f) {
            if ("undefined" == typeof b.length) throw Error(b.length + "/" + f);
            var a = function () {
                    for (var d = 0; d < b.length && 0 == b[d];) d += 1;
                    for (var g = Array(b.length - d + f), e = 0; e < b.length - d; e += 1) g[e] = b[e + d];
                    return g
                }(),
                d = {
                    get: function (d) {
                        return a[d]
                    },
                    getLength: function () {
                        return a.length
                    },
                    multiply: function (y) {
                        for (var g = Array(d.getLength() + y.getLength() - 1), e = 0; e < d.getLength(); e += 1)
                            for (var a = 0; a < y.getLength(); a += 1) g[e + a] ^= c.gexp(c.glog(d.get(e)) + c.glog(y.get(a)));
                        return h(g, 0)
                    },
                    mod: function (y) {
                        if (0 > d.getLength() - y.getLength()) return d;
                        for (var g = c.glog(d.get(0)) - c.glog(y.get(0)), e = Array(d.getLength()), a = 0; a < d.getLength(); a += 1) e[a] = d.get(a);
                        for (a = 0; a < y.getLength(); a += 1) e[a] ^= c.gexp(c.glog(y.get(a)) + g);
                        return h(e, 0).mod(y)
                    }
                };
            return d
        }
        var b = function (b, c) {
            var a = f[c],
                d = null,
                y = 0,
                g = null,
                e = [],
                A = {},
                B = function (A, f) {
                    for (var r = y = 4 * b + 17, l = Array(r), c = 0; c < r; c += 1) {
                        l[c] = Array(r);
                        for (var m = 0; m < r; m += 1) l[c][m] = null
                    }
                    d = l;
                    x(0, 0);
                    x(y - 7, 0);
                    x(0, y - 7);
                    r = n.getPatternPosition(b);
                    for (l = 0; l < r.length; l += 1)
                        for (c = 0; c < r.length; c += 1) {
                            var m = r[l],
                                B = r[c];
                            if (null == d[m][B])
                                for (var k = -2; 2 >= k; k += 1)
                                    for (var t = -2; 2 >= t; t += 1) d[m + k][B + t] = -2 == k || 2 == k || -2 == t || 2 == t || 0 == k && 0 == t ? !0 : !1
                        }
                    for (r = 8; r < y - 8; r += 1) null == d[r][6] && (d[r][6] = 0 == r % 2);
                    for (r = 8; r < y - 8; r += 1) null == d[6][r] && (d[6][r] = 0 == r % 2);
                    r = n.getBCHTypeInfo(a << 3 | f);
                    for (l = 0; 15 > l; l += 1) c = !A && 1 == (r >> l & 1), 6 > l ? d[l][8] = c : 8 > l ? d[l + 1][8] = c : d[y - 15 + l][8] = c;
                    for (l = 0; 15 > l; l += 1) c = !A && 1 == (r >> l & 1), 8 > l ? d[8][y - l - 1] = c : 9 > l ? d[8][15 - l - 1 + 1] = c : d[8][15 - l - 1] = c;
                    d[y - 8][8] = !A;
                    if (7 <= b) {
                        r = n.getBCHTypeNumber(b);
                        for (l = 0; 18 > l; l += 1) c = !A && 1 == (r >> l & 1), d[Math.floor(l / 3)][l % 3 + y - 8 - 3] = c;
                        for (l = 0; 18 > l; l += 1) c = !A && 1 == (r >> l & 1), d[l % 3 + y - 8 - 3][Math.floor(l / 3)] = c
                    }
                    if (null == g) {
                        r = p.getRSBlocks(b, a);
                        l = v();
                        for (c = 0; c < e.length; c += 1) m = e[c], l.put(m.getMode(), 4), l.put(m.getLength(), n.getLengthInBits(m.getMode(), b)), m.write(l);
                        for (c = m = 0; c < r.length; c += 1) m += r[c].dataCount;
                        if (l.getLengthInBits() > 8 * m) throw Error("code length overflow. (" + l.getLengthInBits() + ">" + 8 * m + ")");
                        for (l.getLengthInBits() + 4 <= 8 * m && l.put(0, 4); 0 != l.getLengthInBits() % 8;) l.putBit(!1);
                        for (; !(l.getLengthInBits() >= 8 * m);) {
                            l.put(236, 8);
                            if (l.getLengthInBits() >= 8 * m) break;
                            l.put(17, 8)
                        }
                        for (var q = 0, m = c = 0, B = Array(r.length), k = Array(r.length), t = 0; t < r.length; t += 1) {
                            var w = r[t].dataCount,
                                z = r[t].totalCount - w,
                                c = Math.max(c, w),
                                m = Math.max(m, z);
                            B[t] = Array(w);
                            for (var u = 0; u < B[t].length; u += 1) B[t][u] = 255 & l.getBuffer()[u + q];
                            q += w;
                            u = n.getErrorCorrectPolynomial(z);
                            w = h(B[t], u.getLength() - 1).mod(u);
                            k[t] = Array(u.getLength() - 1);
                            for (u = 0; u < k[t].length; u += 1) z = u + w.getLength() - k[t].length, k[t][u] = 0 <= z ? w.get(z) : 0
                        }
                        for (u = l = 0; u < r.length; u += 1) l += r[u].totalCount;
                        l = Array(l);
                        for (u = q = 0; u < c; u += 1)
                            for (t = 0; t < r.length; t += 1) u < B[t].length && (l[q] = B[t][u], q += 1);
                        for (u = 0; u < m; u += 1)
                            for (t = 0; t < r.length; t += 1) u < k[t].length && (l[q] = k[t][u], q += 1);
                        g = l
                    }
                    r = g;
                    l = -1;
                    c = y - 1;
                    m = 7;
                    B = 0;
                    k = n.getMaskFunction(f);
                    for (t = y - 1; 0 < t; t -= 2)
                        for (6 == t && --t;;) {
                            for (u = 0; 2 > u; u += 1) null == d[c][t - u] && (q = !1, B < r.length && (q = 1 == (r[B] >>> m & 1)), k(c, t - u) && (q = !q), d[c][t - u] = q, --m, -1 == m && (B += 1, m = 7));
                            c += l;
                            if (0 > c || y <= c) {
                                c -= l;
                                l = -l;
                                break
                            }
                        }
                },
                x = function (a, g) {
                    for (var e = -1; 7 >= e; e += 1)
                        if (!(-1 >= a + e || y <= a + e))
                            for (var b = -1; 7 >= b; b += 1) - 1 >= g + b || y <= g + b || (d[a + e][g + b] = 0 <= e && 6 >= e && (0 == b || 6 == b) || 0 <= b && 6 >= b && (0 == e || 6 == e) || 2 <= e && 4 >= e && 2 <= b && 4 >= b ? !0 : !1)
                };
            A.addData = function (d) {
                d = k(d);
                e.push(d);
                g = null
            };
            A.isDark = function (e, a) {
                if (0 > e || y <= e || 0 > a || y <= a) throw Error(e + "," + a);
                return d[e][a]
            };
            A.getModuleCount = function () {
                return y
            };
            A.make = function () {
                for (var d = 0, e = 0, a = 0; 8 > a; a += 1) {
                    B(!0, a);
                    var g = n.getLostPoint(A);
                    if (0 == a || d > g) d = g, e = a
                }
                B(!1, e)
            };
            A.createTableTag = function (d, a) {
                d = d || 2;
                var e;
                e = '<table style=" border-width: 0px; border-style: none;';
                e += " border-collapse: collapse;";
                e += " padding: 0px; margin: " + ("undefined" == typeof a ? 4 * d : a) + "px;";
                e += '">';
                e += "<tbody>";
                for (var g = 0; g < A.getModuleCount(); g += 1) {
                    e += "<tr>";
                    for (var b = 0; b < A.getModuleCount(); b += 1) e += '<td style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", e += " padding: 0px; margin: 0px;", e += " width: " + d + "px;", e += " height: " + d + "px;", e += " background-color: ", e += A.isDark(g, b) ? "#000000" : "#ffffff", e += ";", e += '"/>';
                    e += "</tr>"
                }
                e += "</tbody>";
                return e += "</table>"
            };
            A.createImgTag = function (e, d) {
                e = e || 2;
                d = "undefined" == typeof d ? 4 * e : d;
                var a = A.getModuleCount() * e + 2 * d,
                    g = d,
                    b = a - d;
                return D(a, a, function (d, a) {
                    return g <= d && d < b && g <= a && a < b ? A.isDark(Math.floor((a - g) / e), Math.floor((d - g) / e)) ? 0 : 1 : 1
                })
            };
            return A
        };
        b.stringToBytes = function (b) {
            for (var c = [], a = 0; a < b.length; a += 1) {
                var d = b.charCodeAt(a);
                c.push(d & 255)
            }
            return c
        };
        b.createStringToBytes = function (b, c) {
            var a = function () {
                for (var d = q(b), a = function () {
                        var e = d.read();
                        if (-1 == e) throw Error();
                        return e
                    }, g = 0, e = {};;) {
                    var A = d.read();
                    if (-1 == A) break;
                    var f = a(),
                        h = a(),
                        k = a(),
                        A = String.fromCharCode(A << 8 | f);
                    e[A] = h << 8 | k;
                    g += 1
                }
                if (g != c) throw Error(g + " != " + c);
                return e
            }();
            return function (d) {
                for (var b = [], g = 0; g < d.length; g += 1) {
                    var e = d.charCodeAt(g);
                    128 > e ? b.push(e) : (e = a[d.charAt(g)], "number" == typeof e ? (e & 255) == e ? b.push(e) : (b.push(e >>> 8), b.push(e & 255)) : b.push(63))
                }
                return b
            }
        };
        var f = {
                L: 1,
                M: 0,
                Q: 3,
                H: 2
            },
            n = function () {
                var b = [
                        [],
                        [6, 18],
                        [6, 22],
                        [6, 26],
                        [6, 30],
                        [6, 34],
                        [6, 22, 38],
                        [6, 24, 42],
                        [6, 26, 46],
                        [6, 28, 50],
                        [6, 30, 54],
                        [6, 32, 58],
                        [6, 34, 62],
                        [6, 26, 46, 66],
                        [6, 26, 48, 70],
                        [6, 26, 50, 74],
                        [6, 30, 54, 78],
                        [6, 30, 56, 82],
                        [6, 30, 58, 86],
                        [6, 34, 62, 90],
                        [6, 28, 50, 72, 94],
                        [6, 26, 50, 74, 98],
                        [6, 30, 54, 78, 102],
                        [6, 28, 54, 80, 106],
                        [6, 32, 58, 84, 110],
                        [6, 30, 58, 86, 114],
                        [6, 34, 62, 90, 118],
                        [6, 26, 50, 74, 98, 122],
                        [6, 30, 54, 78, 102, 126],
                        [6, 26, 52, 78, 104, 130],
                        [6, 30, 56, 82, 108, 134],
                        [6, 34, 60, 86, 112, 138],
                        [6, 30, 58, 86, 114, 142],
                        [6, 34, 62, 90, 118, 146],
                        [6, 30, 54, 78, 102, 126, 150],
                        [6, 24, 50, 76, 102, 128, 154],
                        [6, 28, 54, 80, 106, 132, 158],
                        [6, 32, 58, 84, 110, 136, 162],
                        [6, 26, 54, 82, 110, 138, 166],
                        [6, 30, 58, 86, 114, 142, 170]
                    ],
                    m = {},
                    a = function (d) {
                        for (var a = 0; 0 != d;) a += 1, d >>>= 1;
                        return a
                    };
                m.getBCHTypeInfo = function (d) {
                    for (var b = d << 10; 0 <= a(b) - a(1335);) b ^= 1335 << a(b) - a(1335);
                    return (d << 10 | b) ^ 21522
                };
                m.getBCHTypeNumber = function (d) {
                    for (var b = d << 12; 0 <= a(b) - a(7973);) b ^= 7973 << a(b) - a(7973);
                    return d << 12 | b
                };
                m.getPatternPosition = function (d) {
                    return b[d - 1]
                };
                m.getMaskFunction = function (d) {
                    switch (d) {
                        case 0:
                            return function (d, a) {
                                return 0 == (d + a) % 2
                            };
                        case 1:
                            return function (d, a) {
                                return 0 == d % 2
                            };
                        case 2:
                            return function (d, a) {
                                return 0 == a % 3
                            };
                        case 3:
                            return function (d, a) {
                                return 0 == (d + a) % 3
                            };
                        case 4:
                            return function (d, a) {
                                return 0 == (Math.floor(d / 2) + Math.floor(a / 3)) % 2
                            };
                        case 5:
                            return function (d, a) {
                                return 0 == d * a % 2 + d * a % 3
                            };
                        case 6:
                            return function (d, a) {
                                return 0 == (d * a % 2 + d * a % 3) % 2
                            };
                        case 7:
                            return function (d, a) {
                                return 0 == (d * a % 3 + (d + a) % 2) % 2
                            };
                        default:
                            throw Error("bad maskPattern:" + d);
                    }
                };
                m.getErrorCorrectPolynomial = function (d) {
                    for (var a = h([1], 0), b = 0; b < d; b += 1) a = a.multiply(h([1, c.gexp(b)], 0));
                    return a
                };
                m.getLengthInBits = function (d, a) {
                    if (1 <= a && 10 > a) switch (d) {
                        case 1:
                            return 10;
                        case 2:
                            return 9;
                        case 4:
                            return 8;
                        case 8:
                            return 8;
                        default:
                            throw Error("mode:" +
                                d);
                    } else if (27 > a) switch (d) {
                        case 1:
                            return 12;
                        case 2:
                            return 11;
                        case 4:
                            return 16;
                        case 8:
                            return 10;
                        default:
                            throw Error("mode:" + d);
                    } else if (41 > a) switch (d) {
                        case 1:
                            return 14;
                        case 2:
                            return 13;
                        case 4:
                            return 16;
                        case 8:
                            return 12;
                        default:
                            throw Error("mode:" + d);
                    } else throw Error("type:" + a);
                };
                m.getLostPoint = function (d) {
                    for (var a = d.getModuleCount(), b = 0, e = 0; e < a; e += 1)
                        for (var c = 0; c < a; c += 1) {
                            for (var m = 0, f = d.isDark(e, c), h = -1; 1 >= h; h += 1)
                                if (!(0 > e + h || a <= e + h))
                                    for (var k = -1; 1 >= k; k += 1) 0 > c + k || a <= c + k || 0 == h && 0 == k || f != d.isDark(e +
                                        h, c + k) || (m += 1);
                            5 < m && (b += 3 + m - 5)
                        }
                    for (e = 0; e < a - 1; e += 1)
                        for (c = 0; c < a - 1; c += 1)
                            if (m = 0, d.isDark(e, c) && (m += 1), d.isDark(e + 1, c) && (m += 1), d.isDark(e, c + 1) && (m += 1), d.isDark(e + 1, c + 1) && (m += 1), 0 == m || 4 == m) b += 3;
                    for (e = 0; e < a; e += 1)
                        for (c = 0; c < a - 6; c += 1) d.isDark(e, c) && !d.isDark(e, c + 1) && d.isDark(e, c + 2) && d.isDark(e, c + 3) && d.isDark(e, c + 4) && !d.isDark(e, c + 5) && d.isDark(e, c + 6) && (b += 40);
                    for (c = 0; c < a; c += 1)
                        for (e = 0; e < a - 6; e += 1) d.isDark(e, c) && !d.isDark(e + 1, c) && d.isDark(e + 2, c) && d.isDark(e + 3, c) && d.isDark(e + 4, c) && !d.isDark(e + 5, c) && d.isDark(e + 6, c) && (b += 40);
                    for (c = m = 0; c < a; c += 1)
                        for (e = 0; e < a; e += 1) d.isDark(e, c) && (m += 1);
                    d = Math.abs(100 * m / a / a - 50) / 5;
                    return b + 10 * d
                };
                return m
            }(),
            c = function () {
                for (var b = Array(256), c = Array(256), a = 0; 8 > a; a += 1) b[a] = 1 << a;
                for (a = 8; 256 > a; a += 1) b[a] = b[a - 4] ^ b[a - 5] ^ b[a - 6] ^ b[a - 8];
                for (a = 0; 255 > a; a += 1) c[b[a]] = a;
                return {
                    glog: function (a) {
                        if (1 > a) throw Error("glog(" + a + ")");
                        return c[a]
                    },
                    gexp: function (a) {
                        for (; 0 > a;) a += 255;
                        for (; 256 <= a;) a -= 255;
                        return b[a]
                    }
                }
            }(),
            p = function () {
                var b = [
                        [1, 26, 19],
                        [1, 26, 16],
                        [1, 26, 13],
                        [1, 26, 9],
                        [1, 44, 34],
                        [1, 44, 28],
                        [1, 44, 22],
                        [1, 44, 16],
                        [1, 70, 55],
                        [1, 70, 44],
                        [2, 35, 17],
                        [2, 35, 13],
                        [1, 100, 80],
                        [2, 50, 32],
                        [2, 50, 24],
                        [4, 25, 9],
                        [1, 134, 108],
                        [2, 67, 43],
                        [2, 33, 15, 2, 34, 16],
                        [2, 33, 11, 2, 34, 12],
                        [2, 86, 68],
                        [4, 43, 27],
                        [4, 43, 19],
                        [4, 43, 15],
                        [2, 98, 78],
                        [4, 49, 31],
                        [2, 32, 14, 4, 33, 15],
                        [4, 39, 13, 1, 40, 14],
                        [2, 121, 97],
                        [2, 60, 38, 2, 61, 39],
                        [4, 40, 18, 2, 41, 19],
                        [4, 40, 14, 2, 41, 15],
                        [2, 146, 116],
                        [3, 58, 36, 2, 59, 37],
                        [4, 36, 16, 4, 37, 17],
                        [4, 36, 12, 4, 37, 13],
                        [2, 86, 68, 2, 87, 69],
                        [4, 69, 43, 1, 70, 44],
                        [6, 43, 19, 2, 44, 20],
                        [6, 43, 15, 2, 44, 16],
                        [4, 101, 81],
                        [1, 80, 50, 4, 81, 51],
                        [4, 50, 22, 4, 51, 23],
                        [3, 36, 12, 8, 37, 13],
                        [2, 116, 92, 2, 117, 93],
                        [6, 58, 36, 2, 59, 37],
                        [4, 46, 20, 6, 47, 21],
                        [7, 42, 14, 4, 43, 15],
                        [4, 133, 107],
                        [8, 59, 37, 1, 60, 38],
                        [8, 44, 20, 4, 45, 21],
                        [12, 33, 11, 4, 34, 12],
                        [3, 145, 115, 1, 146, 116],
                        [4, 64, 40, 5, 65, 41],
                        [11, 36, 16, 5, 37, 17],
                        [11, 36, 12, 5, 37, 13],
                        [5, 109, 87, 1, 110, 88],
                        [5, 65, 41, 5, 66, 42],
                        [5, 54, 24, 7, 55, 25],
                        [11, 36, 12],
                        [5, 122, 98, 1, 123, 99],
                        [7, 73, 45, 3, 74, 46],
                        [15, 43, 19, 2, 44, 20],
                        [3, 45, 15, 13, 46, 16],
                        [1, 135, 107, 5, 136, 108],
                        [10, 74, 46, 1, 75, 47],
                        [1, 50, 22, 15, 51, 23],
                        [2, 42, 14, 17, 43, 15],
                        [5, 150, 120, 1, 151, 121],
                        [9, 69, 43, 4, 70, 44],
                        [17, 50, 22, 1, 51, 23],
                        [2, 42, 14, 19, 43, 15],
                        [3, 141, 113, 4, 142, 114],
                        [3, 70, 44, 11, 71, 45],
                        [17, 47, 21, 4, 48, 22],
                        [9, 39, 13, 16, 40, 14],
                        [3, 135, 107, 5, 136, 108],
                        [3, 67, 41, 13, 68, 42],
                        [15, 54, 24, 5, 55, 25],
                        [15, 43, 15, 10, 44, 16],
                        [4, 144, 116, 4, 145, 117],
                        [17, 68, 42],
                        [17, 50, 22, 6, 51, 23],
                        [19, 46, 16, 6, 47, 17],
                        [2, 139, 111, 7, 140, 112],
                        [17, 74, 46],
                        [7, 54, 24, 16, 55, 25],
                        [34, 37, 13],
                        [4, 151, 121, 5, 152, 122],
                        [4, 75, 47, 14, 76, 48],
                        [11, 54, 24, 14, 55, 25],
                        [16, 45, 15, 14, 46, 16],
                        [6, 147, 117, 4, 148, 118],
                        [6, 73, 45, 14, 74, 46],
                        [11, 54, 24, 16, 55, 25],
                        [30, 46, 16, 2, 47, 17],
                        [8, 132, 106, 4, 133, 107],
                        [8, 75, 47, 13, 76, 48],
                        [7, 54, 24, 22, 55, 25],
                        [22, 45, 15, 13, 46, 16],
                        [10, 142, 114, 2, 143, 115],
                        [19, 74, 46, 4, 75, 47],
                        [28, 50, 22, 6, 51, 23],
                        [33, 46, 16, 4, 47, 17],
                        [8, 152, 122, 4, 153, 123],
                        [22, 73, 45, 3, 74, 46],
                        [8, 53, 23, 26, 54, 24],
                        [12, 45, 15, 28, 46, 16],
                        [3, 147, 117, 10, 148, 118],
                        [3, 73, 45, 23, 74, 46],
                        [4, 54, 24, 31, 55, 25],
                        [11, 45, 15, 31, 46, 16],
                        [7, 146, 116, 7, 147, 117],
                        [21, 73, 45, 7, 74, 46],
                        [1, 53, 23, 37, 54, 24],
                        [19, 45, 15, 26, 46, 16],
                        [5, 145, 115, 10, 146, 116],
                        [19, 75, 47, 10, 76, 48],
                        [15, 54, 24, 25, 55, 25],
                        [23, 45, 15, 25, 46, 16],
                        [13, 145, 115, 3, 146, 116],
                        [2, 74, 46, 29, 75, 47],
                        [42, 54, 24, 1, 55, 25],
                        [23, 45, 15, 28, 46, 16],
                        [17, 145, 115],
                        [10, 74, 46, 23, 75, 47],
                        [10, 54, 24, 35, 55, 25],
                        [19, 45, 15, 35, 46, 16],
                        [17, 145, 115, 1, 146, 116],
                        [14, 74, 46, 21, 75, 47],
                        [29, 54, 24, 19, 55, 25],
                        [11, 45, 15, 46, 46, 16],
                        [13, 145, 115, 6, 146, 116],
                        [14, 74, 46, 23, 75, 47],
                        [44, 54, 24, 7, 55, 25],
                        [59, 46, 16, 1, 47, 17],
                        [12, 151, 121, 7, 152, 122],
                        [12, 75, 47, 26, 76, 48],
                        [39, 54, 24, 14, 55, 25],
                        [22, 45, 15, 41, 46, 16],
                        [6, 151, 121, 14, 152, 122],
                        [6, 75, 47, 34, 76, 48],
                        [46, 54, 24, 10, 55, 25],
                        [2, 45, 15, 64, 46, 16],
                        [17, 152, 122, 4, 153, 123],
                        [29, 74, 46, 14, 75, 47],
                        [49, 54, 24, 10, 55, 25],
                        [24, 45, 15, 46, 46, 16],
                        [4, 152, 122, 18, 153, 123],
                        [13, 74, 46, 32, 75, 47],
                        [48, 54, 24, 14, 55, 25],
                        [42, 45, 15, 32, 46, 16],
                        [20, 147, 117, 4, 148, 118],
                        [40, 75, 47, 7, 76, 48],
                        [43, 54, 24, 22, 55, 25],
                        [10, 45, 15, 67, 46, 16],
                        [19, 148, 118, 6, 149, 119],
                        [18, 75, 47, 31, 76, 48],
                        [34, 54, 24, 34, 55, 25],
                        [20, 45, 15, 61, 46, 16]
                    ],
                    c = function (a, b) {
                        var e = {};
                        e.totalCount = a;
                        e.dataCount = b;
                        return e
                    },
                    a = {},
                    d = function (a, d) {
                        switch (d) {
                            case f.L:
                                return b[4 * (a - 1) + 0];
                            case f.M:
                                return b[4 * (a - 1) + 1];
                            case f.Q:
                                return b[4 * (a - 1) + 2];
                            case f.H:
                                return b[4 * (a - 1) + 3]
                        }
                    };
                a.getRSBlocks = function (a, b) {
                    var e = d(a, b);
                    if ("undefined" == typeof e) throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + b);
                    for (var f = e.length / 3, h = [], k = 0; k < f; k += 1)
                        for (var n = e[3 * k + 0], p = e[3 * k + 1], r = e[3 * k + 2], l = 0; l < n; l += 1) h.push(c(p, r));
                    return h
                };
                return a
            }(),
            v = function () {
                var b = [],
                    c = 0,
                    a = {
                        getBuffer: function () {
                            return b
                        },
                        get: function (a) {
                            return 1 == (b[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
                        },
                        put: function (b, c) {
                            for (var g = 0; g < c; g += 1) a.putBit(1 == (b >>> c - g - 1 & 1))
                        },
                        getLengthInBits: function () {
                            return c
                        },
                        putBit: function (a) {
                            var f = Math.floor(c / 8);
                            b.length <= f && b.push(0);
                            a && (b[f] |= 128 >>> c % 8);
                            c += 1
                        }
                    };
                return a
            },
            k = function (c) {
                var m = b.stringToBytes(c);
                return {
                    getMode: function () {
                        return 4
                    },
                    getLength: function (a) {
                        return m.length
                    },
                    write: function (a) {
                        for (var b = 0; b < m.length; b += 1) a.put(m[b], 8)
                    }
                }
            },
            x = function () {
                var b = [],
                    c = {
                        writeByte: function (a) {
                            b.push(a & 255)
                        },
                        writeShort: function (a) {
                            c.writeByte(a);
                            c.writeByte(a >>> 8)
                        },
                        writeBytes: function (a, b, f) {
                            b = b || 0;
                            f = f || a.length;
                            for (var g = 0; g < f; g += 1) c.writeByte(a[g + b])
                        },
                        writeString: function (a) {
                            for (var b = 0; b < a.length; b += 1) c.writeByte(a.charCodeAt(b))
                        },
                        toByteArray: function () {
                            return b
                        },
                        toString: function () {
                            var a;
                            a = "[";
                            for (var c = 0; c < b.length; c += 1) 0 < c && (a += ","), a += b[c];
                            return a + "]"
                        }
                    };
                return c
            },
            w = function () {
                var b = 0,
                    c = 0,
                    a = 0,
                    d = "",
                    f = {},
                    g = function (a) {
                        if (!(0 > a)) {
                            if (26 > a) return 65 + a;
                            if (52 > a) return 97 + (a - 26);
                            if (62 > a) return 48 + (a - 52);
                            if (62 == a) return 43;
                            if (63 == a) return 47
                        }
                        throw Error("n:" + a);
                    };
                f.writeByte = function (e) {
                    b = b << 8 | e & 255;
                    c += 8;
                    for (a += 1; 6 <= c;) d += String.fromCharCode(g(b >>> c - 6 & 63)), c -= 6
                };
                f.flush = function () {
                    0 < c && (d += String.fromCharCode(g(b << 6 - c & 63)), c = b = 0);
                    if (0 != a % 3)
                        for (var e = 3 - a % 3, f = 0; f < e; f += 1) d += "="
                };
                f.toString = function () {
                    return d
                };
                return f
            },
            q = function (b) {
                var c = 0,
                    a = 0,
                    d = 0,
                    f = function (a) {
                        if (65 <= a && 90 >= a) return a - 65;
                        if (97 <= a && 122 >= a) return a - 97 + 26;
                        if (48 <= a && 57 >= a) return a - 48 + 52;
                        if (43 == a) return 62;
                        if (47 == a) return 63;
                        throw Error("c:" + a);
                    };
                return {
                    read: function () {
                        for (; 8 > d;) {
                            if (c >= b.length) {
                                if (0 == d) return -1;
                                throw Error("unexpected end of file./" + d);
                            }
                            var g = b.charAt(c);
                            c += 1;
                            if ("=" == g) return d = 0, -1;
                            g.match(/^\s$/) || (a = a << 6 | f(g.charCodeAt(0)), d += 6)
                        }
                        g = a >>> d - 8 & 255;
                        d -= 8;
                        return g
                    }
                }
            },
            z = function (b, c) {
                var a = Array(b * c),
                    d = function (a) {
                        var b = 0,
                            c = 0;
                        return {
                            write: function (d, f) {
                                if (0 != d >>> f) throw Error("length over");
                                for (; 8 <= b + f;) a.writeByte(255 & (d << b | c)), f -= 8 - b, d >>>= 8 - b, b = c = 0;
                                c |= d << b;
                                b += f
                            },
                            flush: function () {
                                0 < b && a.writeByte(c)
                            }
                        }
                    },
                    f = function () {
                        var a = {},
                            b = 0,
                            c = {
                                add: function (d) {
                                    if (c.contains(d)) throw Error("dup key:" + d);
                                    a[d] = b;
                                    b += 1
                                },
                                size: function () {
                                    return b
                                },
                                indexOf: function (b) {
                                    return a[b]
                                },
                                contains: function (b) {
                                    return "undefined" != typeof a[b]
                                }
                            };
                        return c
                    };
                return {
                    setPixel: function (c, d, f) {
                        a[d * b + c] = f
                    },
                    write: function (g) {
                        g.writeString("GIF87a");
                        g.writeShort(b);
                        g.writeShort(c);
                        g.writeByte(128);
                        g.writeByte(0);
                        g.writeByte(0);
                        g.writeByte(0);
                        g.writeByte(0);
                        g.writeByte(0);
                        g.writeByte(255);
                        g.writeByte(255);
                        g.writeByte(255);
                        g.writeString(",");
                        g.writeShort(0);
                        g.writeShort(0);
                        g.writeShort(b);
                        g.writeShort(c);
                        g.writeByte(0);
                        var e;
                        e = 3;
                        for (var h = f(), k = 0; 4 > k; k += 1) h.add(String.fromCharCode(k));
                        h.add(String.fromCharCode(4));
                        h.add(String.fromCharCode(5));
                        var k = x(),
                            n = d(k);
                        n.write(4, e);
                        for (var p = 0, q = String.fromCharCode(a[p]), p = p + 1; p < a.length;) {
                            var r = String.fromCharCode(a[p]),
                                p = p + 1;
                            h.contains(q + r) ? q += r : (n.write(h.indexOf(q), e), 4095 > h.size() && (h.size() == 1 << e && (e += 1), h.add(q + r)), q = r)
                        }
                        n.write(h.indexOf(q), e);
                        n.write(5, e);
                        n.flush();
                        e = k.toByteArray();
                        g.writeByte(2);
                        for (h = 0; 255 < e.length - h;) g.writeByte(255), g.writeBytes(e, h, 255), h += 255;
                        g.writeByte(e.length - h);
                        g.writeBytes(e, h, e.length - h);
                        g.writeByte(0);
                        g.writeString(";")
                    }
                }
            },
            D = function (b, c, a, d) {
                for (var f = z(b, c), g = 0; g < c; g += 1)
                    for (var e = 0; e < b; e += 1) f.setPixel(e, g, a(e, g));
                a = x();
                f.write(a);
                f = w();
                a = a.toByteArray();
                for (g = 0; g < a.length; g += 1) f.writeByte(a[g]);
                f.flush();
                a = '<img src="';
                a += "data:image/gif;base64,";
                a += f;
                a += '"';
                a += ' width="';
                a += b;
                a += '"';
                a += ' height="';
                a += c;
                a += '"';
                d && (a += ' alt="', a += d, a += '"');
                return a += "/>"
            };
        return b
    }()
})(jQuery);

(function (f) {
    f.fn.erweima = function (a) {
        if (null != a) {
            if (null != a.text) {
                var c = a.text,
                    b, e, g, d;
                b = "";
                g = c.length;
                for (e = 0; e < g; e++) d = c.charCodeAt(e), 1 <= d && 127 >= d ? b += c.charAt(e) : (2047 < d ? (b += String.fromCharCode(224 | d >> 12 & 15), b += String.fromCharCode(128 | d >> 6 & 63)) : b += String.fromCharCode(192 | d >> 6 & 31), b += String.fromCharCode(128 | d >> 0 & 63));
                a.text = b
            }
            null != a.radius && (c = .01 * parseInt(a.radius), a.radius = c);
            null != a.mSize && (c = .01 * parseInt(a.mSize), a.mSize = c);
            null != a.mPosX && (c = .01 * parseInt(a.mPosX), a.mPosX = c);
            null != a.mPosY && (c = .01 * parseInt(a.mPosY), a.mPosY = c)
        }
        a = f.extend({
            render: "canvas",
            ecLevel: "H",
            minVersion: 6,
            fill: "#666",
            background: "#fff",
            text: "http://www.baidu.com",
            size: 300,
            radius: .5,
            quiet: 4,
            mode: 4,
            mSize: .1,
            mPosX: .5,
            mPosY: .5,
            label: "\u626b\u7801\u5173\u6ce8\u6211",
            fontname: "Microsoft YaHei",
            fontcolor: "orange"
        }, a);
        f(this).empty().qrcode(a)
    }
})(jQuery);