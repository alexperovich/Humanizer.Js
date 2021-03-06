﻿var Humanizer;
(function (Humanizer) {
    (function (Bytes) {
        "use strict";

        var ByteRate = (function () {
            function ByteRate(size, interval) {
                this.size = size;
                this.interval = interval;
            }
            ByteRate.prototype.humanize = function (timeUnit) {
                if (typeof timeUnit === "undefined") { timeUnit = 1 /* Second */; }
                var displayInterval;
                var displayUnit;

                if (timeUnit === 1 /* Second */) {
                    displayInterval = (1).seconds();
                    displayUnit = "s";
                } else if (timeUnit === 2 /* Minute */) {
                    displayInterval = (1).minutes();
                    displayUnit = "min";
                } else if (timeUnit === 3 /* Hour */) {
                    displayInterval = (1).hours();
                    displayUnit = "hour";
                } else {
                    throw Error("timeUnit must be Second, Minute, or Hour");
                }

                return (new Bytes.ByteSize(this.size.bytes / this.interval.toSeconds() * displayInterval.toSeconds())).toString() + "/" + displayUnit;
            };
            return ByteRate;
        })();
        Bytes.ByteRate = ByteRate;
    })(Humanizer.Bytes || (Humanizer.Bytes = {}));
    var Bytes = Humanizer.Bytes;
})(Humanizer || (Humanizer = {}));
//The MIT License (MIT)
var Humanizer;
(function (Humanizer) {
    //Copyright (c) 2013-2014 Omar Khudeira (http://omar.io)
    //Permission is hereby granted, free of charge, to any person obtaining a copy
    //of this software and associated documentation files (the "Software"), to deal
    //in the Software without restriction, including without limitation the rights
    //to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    //copies of the Software, and to permit persons to whom the Software is
    //furnished to do so, subject to the following conditions:
    //The above copyright notice and this permission notice shall be included in
    //all copies or substantial portions of the Software.
    //THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    //IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    //FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    //AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    //LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    //OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    //THE SOFTWARE.
    (function (Bytes) {
        "use strict";

        function isDigit(str) {
            return (/[0-9]/).test(str.charAt(0));
        }

        var ByteSize = (function () {
            function ByteSize(byteSize) {
                this.bits = Math.ceil(byteSize * ByteSize.BitsInByte);

                this.bytes = byteSize;
                this.kilobytes = byteSize / ByteSize.BytesInKilobyte;
                this.megabytes = byteSize / ByteSize.BytesInMegabyte;
                this.gigabytes = byteSize / ByteSize.BytesInGigabyte;
                this.terabytes = byteSize / ByteSize.BytesInTerabyte;
            }
            ByteSize.prototype.largestWholeNumberSymbol = function () {
                // Absolute value is used to deal with negative values
                if (Math.abs(this.terabytes) >= 1) {
                    return ByteSize.TerabyteSymbol;
                }

                if (Math.abs(this.gigabytes) >= 1) {
                    return ByteSize.GigabyteSymbol;
                }

                if (Math.abs(this.megabytes) >= 1) {
                    return ByteSize.MegabyteSymbol;
                }

                if (Math.abs(this.kilobytes) >= 1) {
                    return ByteSize.KilobyteSymbol;
                }

                if (Math.abs(this.bytes) >= 1) {
                    return ByteSize.ByteSymbol;
                }

                return ByteSize.BitSymbol;
            };

            ByteSize.prototype.largestWholeNumberValue = function () {
                // Absolute value is used to deal with negative values
                if (Math.abs(this.terabytes) >= 1) {
                    return this.terabytes;
                }

                if (Math.abs(this.gigabytes) >= 1) {
                    return this.gigabytes;
                }

                if (Math.abs(this.megabytes) >= 1) {
                    return this.megabytes;
                }

                if (Math.abs(this.kilobytes) >= 1) {
                    return this.kilobytes;
                }

                if (Math.abs(this.bytes) >= 1) {
                    return this.bytes;
                }

                return this.bits;
            };

            ByteSize.fromBits = function (value) {
                return new ByteSize(value / ByteSize.BitsInByte);
            };

            ByteSize.fromBytes = function (value) {
                return new ByteSize(value);
            };

            ByteSize.fromKilobytes = function (value) {
                return new ByteSize(value * ByteSize.BytesInKilobyte);
            };

            ByteSize.fromMegabytes = function (value) {
                return new ByteSize(value * ByteSize.BytesInMegabyte);
            };

            ByteSize.fromGigabytes = function (value) {
                return new ByteSize(value * ByteSize.BytesInGigabyte);
            };

            ByteSize.fromTerabyte = function (value) {
                return new ByteSize(value * ByteSize.BytesInTerabyte);
            };

            ByteSize.prototype.toString = function () {
                return this.largestWholeNumberValue() + " " + this.largestWholeNumberSymbol();
            };

            ByteSize.prototype.toExponential = function (fractionDigits) {
                return this.largestWholeNumberValue().toExponential(fractionDigits) + " " + this.largestWholeNumberSymbol();
            };

            ByteSize.prototype.toFixed = function (fractionDigits) {
                return this.largestWholeNumberValue().toFixed(fractionDigits) + " " + this.largestWholeNumberSymbol();
            };

            ByteSize.prototype.toPercision = function (percision) {
                return this.largestWholeNumberValue().toPrecision(percision) + " " + this.largestWholeNumberSymbol();
            };

            ByteSize.prototype.equals = function (other) {
                return this.bits === other.bits;
            };

            ByteSize.prototype.compareTo = function (other) {
                if (this.bits - other.bits < 0) {
                    return -1;
                }
                if (this.bits - other.bits > 0) {
                    return 1;
                }
                return 0;
            };

            ByteSize.prototype.add = function (other) {
                return ByteSize.fromBits(this.bits + other.bits);
            };

            ByteSize.prototype.addBits = function (value) {
                return ByteSize.fromBits(this.bits + value);
            };

            ByteSize.prototype.addBytes = function (value) {
                return ByteSize.fromBytes(this.bytes + value);
            };

            ByteSize.prototype.addKilobytes = function (value) {
                return ByteSize.fromKilobytes(this.kilobytes + value);
            };

            ByteSize.prototype.addMegabytes = function (value) {
                return ByteSize.fromMegabytes(this.megabytes + value);
            };

            ByteSize.prototype.addGigabytes = function (value) {
                return ByteSize.fromGigabytes(this.gigabytes + value);
            };

            ByteSize.prototype.addTerabytes = function (value) {
                return ByteSize.fromTerabyte(this.terabytes + value);
            };

            ByteSize.prototype.subtract = function (other) {
                return ByteSize.fromBits(this.bits - other.bits);
            };

            ByteSize.prototype.per = function (internval) {
                /// <summary>
                ///     Turns a quantity of bytes in a given interval into a rate that can be manipulated
                /// </summary>
                /// <param name="internval" type="number" integer="true">
                ///     Interval to create rate for
                /// </param>
                return new Bytes.ByteRate(this, internval);
            };

            ByteSize.parse = function (str) {
                if (!str) {
                    throw new Error("'str' cannot be undefined, null, or empty");
                }

                str = str.trim();
                var num;
                var found = false;
                for (num = 0; num < str.length; num++) {
                    if (!(isDigit(str.charAt(num)) || (str.charAt(num) === "."))) {
                        found = true;
                        break;
                    }
                }

                if (found === false) {
                    return null;
                }

                var lastNumber = num;

                var numberPart = str.substr(0, lastNumber).trim();
                var sizePart = str.substr(lastNumber).trim();

                var $number;
                try  {
                    $number = parseFloat(numberPart);
                } catch (ex) {
                    return null;
                }

                switch (sizePart.toUpperCase()) {
                    case ByteSize.ByteSymbol:
                        if (sizePart === ByteSize.BitSymbol) {
                            if ($number % 1 !== 0) {
                                return null;
                            }
                            return ByteSize.fromBits($number);
                        }
                        return ByteSize.fromBytes($number);
                    case ByteSize.KilobyteSymbol:
                        return ByteSize.fromKilobytes($number);
                    case ByteSize.MegabyteSymbol:
                        return ByteSize.fromMegabytes($number);
                    case ByteSize.GigabyteSymbol:
                        return ByteSize.fromGigabytes($number);
                    case ByteSize.TerabyteSymbol:
                        return ByteSize.fromTerabyte($number);
                }
                return null;
            };
            ByteSize.MinValue = new ByteSize(Number.MIN_VALUE);
            ByteSize.MaxValue = new ByteSize(Number.MAX_VALUE);

            ByteSize.BitsInByte = 8;
            ByteSize.BytesInKilobyte = 1024;
            ByteSize.BytesInMegabyte = 1048576;
            ByteSize.BytesInGigabyte = 1073741824;
            ByteSize.BytesInTerabyte = 1099511627776;

            ByteSize.BitSymbol = "b";
            ByteSize.ByteSymbol = "B";
            ByteSize.KilobyteSymbol = "KB";
            ByteSize.MegabyteSymbol = "MB";
            ByteSize.GigabyteSymbol = "GB";
            ByteSize.TerabyteSymbol = "TB";
            return ByteSize;
        })();
        Bytes.ByteSize = ByteSize;
    })(Humanizer.Bytes || (Humanizer.Bytes = {}));
    var Bytes = Humanizer.Bytes;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /**
    * Considers input as bits
    */
    Number.prototype.bits = function () {
        /// <summary>
        ///     Considers input as bits
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromBits(this);
    };

    /**
    * Considers input as bytes
    */
    Number.prototype.bytes = function () {
        /// <summary>
        ///     Considers input as bytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromBytes(this);
    };

    /**
    * Considers input as kilobytes
    */
    Number.prototype.kilobytes = function () {
        /// <summary>
        ///     Considers input as kilobytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromKilobytes(this);
    };

    /**
    * Considers input as megabytes
    */
    Number.prototype.megabytes = function () {
        /// <summary>
        ///     Considers input as megabytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromMegabytes(this);
    };

    /**
    * Considers input as gigabytes
    */
    Number.prototype.gigabytes = function () {
        /// <summary>
        ///     Considers input as gigabytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromGigabytes(this);
    };

    /**
    * Considers input as terabytes
    */
    Number.prototype.terabytes = function () {
        /// <summary>
        ///     Considers input as terabytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromTerabyte(this);
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /**
    * Changes the casing of the provided input
    */
    String.prototype.applyCasing = function (casing) {
        switch (casing) {
            case 0 /* Title */:
                return this.transform(Humanizer.To.TitleCase);
            case 2 /* LowerCase */:
                return this.transform(Humanizer.To.LowerCase);
            case 1 /* AllCaps */:
                return this.transform(Humanizer.To.UpperCase);
            case 3 /* Sentence */:
                return this.transform(Humanizer.To.SentenceCase);
            default:
                throw new Error();
        }
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var Arr = (function () {
        function Arr() {
        }
        Arr.prototype.humanize = function () {
            switch (arguments.length) {
                case 0:
                    return Humanizer.Configuration.Configurator.getCollectionFormatters().humanize(this);
                case 1:
                    if (typeof arguments[0] === "string") {
                        return Humanizer.Configuration.Configurator.getCollectionFormatters().humanize(this, arguments[0]);
                    } else {
                        var df = arguments[0];
                        return Humanizer.Configuration.Configurator.getCollectionFormatters().humanize(this, df);
                    }
                case 2:
                    return Humanizer.Configuration.Configurator.getCollectionFormatters().humanize(this, arguments[0], arguments[1]);
                default:
                    throw new Error("Unknown call");
            }
        };
        return Arr;
    })();

    Array.prototype.humanize = Arr.prototype.humanize;
})(Humanizer || (Humanizer = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
        var CollectionFormatterRegistry = (function (_super) {
            __extends(CollectionFormatterRegistry, _super);
            function CollectionFormatterRegistry() {
                _super.call(this, new Humanizer.Localisation.CollectionFormatters.DefaultCollectionFormatter());
                this.register("en", new Humanizer.Localisation.CollectionFormatters.EnglishCollectionFormatter());
            }
            return CollectionFormatterRegistry;
        })(Configuration.LocaliserRegistry);
        Configuration.CollectionFormatterRegistry = CollectionFormatterRegistry;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
        (function (Configurator) {
            "use strict";

            var formatter = new Configuration.FormatterRegistry();
            var ordinalizers = new Configuration.OrdinalizerRegistry();
            var collections = new Configuration.CollectionFormatterRegistry();
            var numberToWords = new Configuration.NumberToWordsConverterRegistry();

            function getFormatter(culture) {
                return formatter.resolveForCulture(culture);
            }
            Configurator.getFormatter = getFormatter;

            function getOrdinalizer() {
                return ordinalizers.resolveForCulture(Humanizer.Resources.getCurrentCulture());
            }
            Configurator.getOrdinalizer = getOrdinalizer;

            function getCollectionFormatters() {
                return collections.resolveForCulture(Humanizer.Resources.getCurrentCulture());
            }
            Configurator.getCollectionFormatters = getCollectionFormatters;

            function getNumberToWordsConverter(culture) {
                return numberToWords.resolveForCulture(culture);
            }
            Configurator.getNumberToWordsConverter = getNumberToWordsConverter;

            Configurator.dateHumanizeStrategy = new Humanizer.DateHumanizeStrategy.DefaultDateHumanizeStrategy();
        })(Configuration.Configurator || (Configuration.Configurator = {}));
        var Configurator = Configuration.Configurator;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
        "use strict";

        var FormatterRegistry = (function (_super) {
            __extends(FormatterRegistry, _super);
            function FormatterRegistry() {
                _super.call(this, new Humanizer.Localisation.Formatter.DefaultFormatter("en-US"));
                this.registerDefaultFormatter("bg");
                this.registerDefaultFormatter("pt-Bthis.r");
                this.registerDefaultFormatter("sv");
                this.registerDefaultFormatter("tr");
                this.registerDefaultFormatter("vi");
                this.registerDefaultFormatter("en");
                this.registerDefaultFormatter("af");
                this.registerDefaultFormatter("da");
                this.registerDefaultFormatter("de");
                this.registerDefaultFormatter("el");
                this.registerDefaultFormatter("es");
                this.registerDefaultFormatter("fa");
                this.registerDefaultFormatter("fi-FI");
                this.registerDefaultFormatter("fr");
                this.registerDefaultFormatter("fr-BE");
                this.registerDefaultFormatter("hu");
                this.registerDefaultFormatter("id");
                this.registerDefaultFormatter("ja");
                this.registerDefaultFormatter("nb");
                this.registerDefaultFormatter("nb-NO");
                this.registerDefaultFormatter("nl");
                this.registerDefaultFormatter("bn-BD");
                this.registerDefaultFormatter("it");
                this.registerDefaultFormatter("uz-Latn-UZ");
                this.registerDefaultFormatter("uz-Cyrl-UZ");
            }
            FormatterRegistry.prototype.registerDefaultFormatter = function (culture) {
                this.register(culture, new Humanizer.Localisation.Formatter.DefaultFormatter(culture));
            };
            return FormatterRegistry;
        })(Configuration.LocaliserRegistry);
        Configuration.FormatterRegistry = FormatterRegistry;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
        "use strict";

        var LocaliserRegistry = (function () {
            function LocaliserRegistry(_default) {
                this.localizer = {};
                this.defaultLocalizer = function (culture) {
                    return _default;
                };
            }
            LocaliserRegistry.prototype.resolveForCulture = function (culture) {
                if (typeof culture === "undefined") { culture = Humanizer.Resources.getCurrentCulture(); }
                return this.findLocaliser(culture)(culture);
            };

            LocaliserRegistry.prototype.register = function () {
                var culture = arguments[0];
                if (typeof arguments[1] === "function") {
                    var func = arguments[1];
                    this.localizer[culture] = func;
                } else {
                    var localiser = arguments[1];
                    this.localizer[culture] = function (c) {
                        return localiser;
                    };
                }
            };

            LocaliserRegistry.prototype.findLocaliser = function (culture) {
                var localiser = this.localizer[culture];
                if (localiser !== undefined) {
                    return localiser;
                }
                culture = culture.substr(0, 2);
                localiser = this.localizer[culture];
                if (localiser !== undefined) {
                    return localiser;
                }
                return this.defaultLocalizer;
            };
            return LocaliserRegistry;
        })();
        Configuration.LocaliserRegistry = LocaliserRegistry;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
        var NumberToWordsConverterRegistry = (function (_super) {
            __extends(NumberToWordsConverterRegistry, _super);
            function NumberToWordsConverterRegistry() {
                _super.call(this, new Humanizer.Localisation.NumberToWords.DefaultNumberToWordsConverter());
                this.register("en", new Humanizer.Localisation.NumberToWords.EnglishNumberToWordsConverter());
                this.register("ar", new Humanizer.Localisation.NumberToWords.ArabicNumberToWordsConverter());
            }
            return NumberToWordsConverterRegistry;
        })(Configuration.LocaliserRegistry);
        Configuration.NumberToWordsConverterRegistry = NumberToWordsConverterRegistry;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
        var OrdinalizerRegistry = (function (_super) {
            __extends(OrdinalizerRegistry, _super);
            function OrdinalizerRegistry() {
                _super.call(this, new Humanizer.Localisation.Ordinalizers.DefaultOrdinalizer());
                this.register("en", new Humanizer.Localisation.Ordinalizers.EnglishOrdinalizer());
            }
            return OrdinalizerRegistry;
        })(Configuration.LocaliserRegistry);
        Configuration.OrdinalizerRegistry = OrdinalizerRegistry;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    Date.prototype.humanize = function (dateToCompareAgainst, culture) {
        if (typeof dateToCompareAgainst === "undefined") { dateToCompareAgainst = new Date(); }
        if (typeof culture === "undefined") { culture = Humanizer.Resources.getCurrentCulture(); }
        return Humanizer.Configuration.Configurator.dateHumanizeStrategy.humanize(this, dateToCompareAgainst, culture);
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (DateHumanizeStrategy) {
        "use strict";

        var DefaultDateHumanizeStrategy = (function () {
            function DefaultDateHumanizeStrategy() {
            }
            DefaultDateHumanizeStrategy.prototype.humanize = function (input, comparisonBase, culture) {
                var tense = input > comparisonBase ? 0 /* Future */ : 1 /* Past */;
                var ts = Math.abs(comparisonBase.getTime() - input.getTime());

                var formatter = Humanizer.Configuration.Configurator.getFormatter(culture);

                if (ts < (500).milliseconds()) {
                    return formatter.DateHumanize(0 /* Millisecond */, tense, 0);
                }

                if (ts < (60).seconds()) {
                    return formatter.DateHumanize(1 /* Second */, tense, Math.floor(ts.toSeconds()));
                }

                if (ts < (120).seconds()) {
                    return formatter.DateHumanize(0 /* Millisecond */, tense, 1);
                }

                if (ts < (60).minutes()) {
                    return formatter.DateHumanize(2 /* Minute */, tense, Math.floor(ts.toMinutes()));
                }

                if (ts < (90).minutes()) {
                    return formatter.DateHumanize(3 /* Hour */, tense, 1);
                }

                if (ts < (24).hours()) {
                    return formatter.DateHumanize(3 /* Hour */, tense, Math.floor(ts.toHours()));
                }

                if (ts < (28).days()) {
                    return formatter.DateHumanize(4 /* Day */, tense, Math.floor(ts.toDays()));
                }

                if (ts >= (28).days() && ts < (30).days()) {
                    var compBase2 = comparisonBase.atMidnight();
                    compBase2.setMonth(comparisonBase.getMonth() + (tense === 0 /* Future */ ? 1 : -1));
                    if (compBase2.getTime() === input.atMidnight().getTime()) {
                        return formatter.DateHumanize(6 /* Month */, tense, 1);
                    }
                    return formatter.DateHumanize(4 /* Day */, tense, Math.floor(ts.toDays()));
                }

                if (ts < (645).days()) {
                    var months = Math.floor(ts.toDays() / 29.5);
                    return formatter.DateHumanize(6 /* Month */, tense, months);
                }

                var years = Math.floor(ts.toDays() / 365);
                if (years === 0) {
                    years = 1;
                }
                return formatter.DateHumanize(7 /* Year */, tense, years);
            };
            return DefaultDateHumanizeStrategy;
        })();
        DateHumanizeStrategy.DefaultDateHumanizeStrategy = DefaultDateHumanizeStrategy;
    })(Humanizer.DateHumanizeStrategy || (Humanizer.DateHumanizeStrategy = {}));
    var DateHumanizeStrategy = Humanizer.DateHumanizeStrategy;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (DateHumanizeStrategy) {
        "use strict";

        var PrecisionDateHumanizeStrategy = (function () {
            function PrecisionDateHumanizeStrategy(precision) {
                if (typeof precision === "undefined") { precision = 0.75; }
                this.precision = precision;
            }
            PrecisionDateHumanizeStrategy.prototype.humanize = function (input, comparisonBase, culture) {
                var tense = input > comparisonBase ? 0 /* Future */ : 1 /* Past */;
                var ts = Math.abs(comparisonBase.getTime() - input.getTime());

                var days = ts.toDays();
                var weeks = Math.floor(days / 7);
                var daysInWeek = days % 7;
                ts = ts - (weeks * 7 + daysInWeek).milliseconds();
                var hours = Math.floor(ts.toHours());
                ts = ts - hours.toMilliseconds();
                var minutes = Math.floor(ts.toMinutes());
                ts = ts - minutes.milliseconds();
                var seconds = Math.floor(ts.toSeconds());
                var milliseconds = ts - seconds.milliseconds();
                var years = 0;
                var months = 0;

                if (milliseconds >= 999 * this.precision) {
                    seconds++;
                }
                if (seconds >= 59 * this.precision) {
                    minutes++;
                }
                if (minutes >= 59 * this.precision) {
                    hours++;
                }
                if (hours >= 23 * this.precision) {
                    days++;
                }

                if (days >= 30 * this.precision && days <= 30) {
                    months = 1;
                }
                var factor;
                var maxMonths;
                if (days > 31 && days < 365 * this.precision) {
                    factor = Math.floor(days / 30);
                    maxMonths = Math.ceil(days / 30);
                    months = (days >= 30 * (factor + this.precision)) ? maxMonths : maxMonths - 1;
                }

                if (days >= 365 * this.precision && days <= 366) {
                    years = 1;
                }
                if (days > 365) {
                    factor = Math.floor(days / 365);
                    maxMonths = Math.ceil(days / 365);
                    years = (days >= 365 * (factor + this.precision)) ? maxMonths : maxMonths - 1;
                }

                var formatter = Humanizer.Configuration.Configurator.getFormatter(culture);
                if (years > 0) {
                    return formatter.DateHumanize(7 /* Year */, tense, years);
                }
                if (months > 0) {
                    return formatter.DateHumanize(6 /* Month */, tense, months);
                }
                if (days > 0) {
                    return formatter.DateHumanize(4 /* Day */, tense, days);
                }
                if (hours > 0) {
                    return formatter.DateHumanize(3 /* Hour */, tense, hours);
                }
                if (minutes > 0) {
                    return formatter.DateHumanize(2 /* Minute */, tense, minutes);
                }
                if (seconds > 0) {
                    return formatter.DateHumanize(1 /* Second */, tense, seconds);
                }
                return formatter.DateHumanize(0 /* Millisecond */, tense, 0);
            };
            return PrecisionDateHumanizeStrategy;
        })();
        DateHumanizeStrategy.PrecisionDateHumanizeStrategy = PrecisionDateHumanizeStrategy;
    })(Humanizer.DateHumanizeStrategy || (Humanizer.DateHumanizeStrategy = {}));
    var DateHumanizeStrategy = Humanizer.DateHumanizeStrategy;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var someTime = {};

    var MILLIS_PER_SECOND = 1000;
    var MILLIS_PER_MINUTE = MILLIS_PER_SECOND * 60;
    var MILLIS_PER_HOUR = MILLIS_PER_MINUTE * 60;
    var MILLIS_PER_DAY = MILLIS_PER_HOUR * 24;
    var MILLIS_PER_WEEK = MILLIS_PER_DAY * 7;

    for (var i = 1; i <= 10; i++) {
        var plural = i > 1 ? "s" : "";
        var second = "second" + plural;
        var minute = "minute" + plural;
        var hour = "hour" + plural;
        var day = "day" + plural;
        var week = "week" + plural;
        var month = "month" + plural;
        var year = "year" + plural;

        someTime[i] = {};

        someTime[i][second] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_SECOND);
            };
            return fn;
        }(i));
        someTime[i][second + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_SECOND);
            };
            return fn;
        }(i));
        someTime[i][minute] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_MINUTE);
            };
            return fn;
        }(i));
        someTime[i][minute + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_MINUTE);
            };
            return fn;
        }(i));
        someTime[i][hour] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_HOUR);
            };
            return fn;
        }(i));
        someTime[i][hour + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_HOUR);
            };
            return fn;
        }(i));
        someTime[i][day] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_DAY);
            };
            return fn;
        }(i));
        someTime[i][day + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_DAY);
            };
            return fn;
        }(i));
        someTime[i][week] = (function (j) {
            var fn = function () {
                return new Date((new Date()).getTime() + j * MILLIS_PER_WEEK);
            };
            return fn;
        }(i));
        someTime[i][week + "From"] = (function (j) {
            var fn = function (date) {
                return new Date(date.getTime() + j * MILLIS_PER_WEEK);
            };
            return fn;
        }(i));
        someTime[i][month] = (function (j) {
            var fn = function () {
                var now = new Date();
                now.setMonth(now.getMonth() + j);
                return now;
            };
            return fn;
        }(i));
        someTime[i][month + "From"] = (function (j) {
            var fn = function (date) {
                var newDate = new Date(date.getTime());
                newDate.setMonth(date.getMonth() + j);
                return newDate;
            };
            return fn;
        }(i));
        someTime[i][year] = (function (j) {
            var fn = function () {
                var now = new Date();
                now.setFullYear(now.getFullYear() + j);
                return now;
            };
            return fn;
        }(i));
        someTime[i][year + "From"] = (function (j) {
            var fn = function (date) {
                var newDate = new Date(date.getTime());
                newDate.setFullYear(newDate.getFullYear() + j);
                return newDate;
            };
            return fn;
        }(i));
    }

    var In = (function () {
        function In() {
        }
        In.theYear = function (year) {
            return new Date(year, 0, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of January of the current year
        */
        In.january = function () {
            /// <summary>
            ///     Returns the 1st of January of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 0, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of February of the current year
        */
        In.february = function () {
            /// <summary>
            ///     Returns the 1st of February of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 1, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of March of the current year
        */
        In.march = function () {
            /// <summary>
            ///     Returns the 1st of March of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 2, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of April of the current year
        */
        In.april = function () {
            /// <summary>
            ///     Returns the 1st of April of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 3, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of May of the current year
        */
        In.may = function () {
            /// <summary>
            ///     Returns the 1st of May of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 4, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of June of the current year
        */
        In.june = function () {
            /// <summary>
            ///     Returns the 1st of June of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 5, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of July of the current year
        */
        In.july = function () {
            /// <summary>
            ///     Returns the 1st of July of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 6, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of August of the current year
        */
        In.august = function () {
            /// <summary>
            ///     Returns the 1st of August of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 7, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of September of the current year
        */
        In.september = function () {
            /// <summary>
            ///     Returns the 1st of September of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 8, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of October of the current year
        */
        In.october = function () {
            /// <summary>
            ///     Returns the 1st of October of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 9, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of November of the current year
        */
        In.november = function () {
            /// <summary>
            ///     Returns the 1st of November of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 10, 1, 0, 0, 0, 0);
        };

        /**
        * Returns the 1st of December of the current year
        */
        In.december = function () {
            /// <summary>
            ///     Returns the 1st of December of the current year
            /// </summary>
            return new Date((new Date()).getFullYear(), 11, 1, 0, 0, 0, 0);
        };
        In.one = someTime[1];
        In.two = someTime[2];
        In.three = someTime[3];
        In.four = someTime[4];
        In.five = someTime[5];
        In.six = someTime[6];
        In.seven = someTime[7];
        In.eight = someTime[8];
        In.nine = someTime[9];
        In.ten = someTime[10];
        return In;
    })();
    Humanizer.In = In;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    Date.prototype.at = function (hour, min, second, millisecond) {
        if (typeof min === "undefined") { min = 0; }
        if (typeof second === "undefined") { second = 0; }
        if (typeof millisecond === "undefined") { millisecond = 0; }
        return new Date(this.getFullYear(), this.getMonth(), this.getDate(), hour, min, second, millisecond);
    };

    /**
    * Returns a new instance of DateTime based on the provided date where the time is set to midnight
    */
    Date.prototype.atMidnight = function () {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the time is set to midnight
        /// </summary>
        return this.at(0);
    };

    /**
    * Returns a new instance of DateTime based on the provided date where the time is set to noon
    */
    Date.prototype.atNoon = function () {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the time is set to noon
        /// </summary>
        return this.at(12);
    };

    /**
    * Returns a new instance of DateTime based on the provided date where the year is set to the provided year
    */
    Date.prototype.in = function (year) {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the year is set to the provided year
        /// </summary>
        return new Date(year, this.getMonth(), this.getDate(), this.getHours(), this.getSeconds(), this.getMilliseconds());
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /**
    * Options for specifying the desired grammatical gender for the output words
    * @enum
    */
    (function (GrammaticalGender) {
        /**
        * Indicates masculine grammatical gender
        */
        GrammaticalGender[GrammaticalGender["Masculine"] = 0] = "Masculine";

        /**
        * Indicates feminine grammatical gender
        */
        GrammaticalGender[GrammaticalGender["Feminine"] = 1] = "Feminine";

        /**
        * Indicates neuter grammatical gender
        */
        GrammaticalGender[GrammaticalGender["Neuter"] = 2] = "Neuter";
    })(Humanizer.GrammaticalGender || (Humanizer.GrammaticalGender = {}));
    var GrammaticalGender = Humanizer.GrammaticalGender;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /**
    * Provides hint for Humanizer as to whether a word is singular, plural or with unknown plurality
    * @enum
    * @readonly
    */
    (function (Plurality) {
        /**
        * The word is singular
        */
        Plurality[Plurality["Singular"] = 0] = "Singular";

        /**
        * The word is plural
        */
        Plurality[Plurality["Plural"] = 1] = "Plural";

        /**
        * I am unsure of the plurality
        */
        Plurality[Plurality["CouldBeEither"] = 2] = "CouldBeEither";
    })(Humanizer.Plurality || (Humanizer.Plurality = {}));
    var Plurality = Humanizer.Plurality;

    var InflectorExtensionsRule = (function () {
        function InflectorExtensionsRule(pattern, replacement) {
            this.regex = new RegExp(pattern, "i");
            this.replacement = replacement;
        }
        InflectorExtensionsRule.prototype.apply = function (word) {
            if (!this.regex.test(word)) {
                return null;
            }
            return word.replace(this.regex, this.replacement);
        };
        return InflectorExtensionsRule;
    })();

    var plurals = [];
    var singulars = [];
    var uncountables = [];

    function addUncountable(word) {
        uncountables.push(word);
    }

    function addSingular(rule, replacement) {
        singulars.push(new InflectorExtensionsRule(rule, replacement));
    }

    function addPlural(rule, replacement) {
        plurals.push(new InflectorExtensionsRule(rule, replacement));
    }

    function addIrregluar(singular, plural) {
        addPlural("(" + singular.charAt(0) + ")" + singular.substr(1) + "$", "\\1" + plural.substr(1));
        addSingular("(" + plural.charAt(0) + ")" + plural.substr(1) + "$", "\\1" + singular.substr(1));
    }

    addPlural("$", "s");
    addPlural("s$", "s");
    addPlural("(ax|test)is$", "\\1es");
    addPlural("(octop|vir|alumn|fung)us$", "\\1i");
    addPlural("(alias|status)$", "\\1es");
    addPlural("(bu)s$", "\\1ses");
    addPlural("(buffal|tomat|volcan)o$", "\\1oes");
    addPlural("([ti])um$", "\\1a");
    addPlural("sis$", "ses");
    addPlural("(?:([^f])fe|([lr])f)$", "\\1\\2ves");
    addPlural("(hive)$", "\\1s");
    addPlural("([^aeiouy]|qu)y$", "\\1ies");
    addPlural("(x|ch|ss|sh)$", "\\1es");
    addPlural("(matr|vert|ind)ix|ex$", "\\1ices");
    addPlural("([m|l])ouse$", "\\1ice");
    addPlural("^(ox)$", "\\1en");
    addPlural("(quiz)$", "\\1zes");

    addSingular("s$", "");
    addSingular("(n)ews$", "\\1ews");
    addSingular("([ti])a$", "\\1um");
    addSingular("((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$", "\\1\\2sis");
    addSingular("(^analy)ses$", "\\1sis");
    addSingular("([^f])ves$", "\\1fe");
    addSingular("(hive)s$", "\\1");
    addSingular("(tive)s$", "\\1");
    addSingular("([lr])ves$", "\\1f");
    addSingular("([^aeiouy]|qu)ies$", "\\1y");
    addSingular("(s)eries$", "\\1eries");
    addSingular("(m)ovies$", "\\1ovie");
    addSingular("(x|ch|ss|sh)es$", "\\1");
    addSingular("([m|l])ice$", "\\1ouse");
    addSingular("(bus)es$", "\\1");
    addSingular("(o)es$", "\\1");
    addSingular("(shoe)s$", "\\1");
    addSingular("(cris|ax|test)es$", "\\1is");
    addSingular("(octop|vir|alumn|fung)i$", "\\1us");
    addSingular("(alias|status)es$", "\\1");
    addSingular("^(ox)en", "\\1");
    addSingular("(vert|ind)ices$", "\\1ex");
    addSingular("(matr)ices$", "\\1ix");
    addSingular("(quiz)zes$", "\\1");

    addIrregluar("person", "people");
    addIrregluar("man", "men");
    addIrregluar("child", "children");
    addIrregluar("sex", "sexes");
    addIrregluar("move", "moves");
    addIrregluar("goose", "geese");
    addIrregluar("alumna", "alumnae");

    addUncountable("equipment");
    addUncountable("information");
    addUncountable("rice");
    addUncountable("money");
    addUncountable("species");
    addUncountable("series");
    addUncountable("fish");
    addUncountable("sheep");
    addUncountable("deer");
    addUncountable("aircraft");

    function applyRules(rules, word) {
        if (word === null) {
            return null;
        }

        var result = word;

        if (uncountables.indexOf(word.toLowerCase()) === -1) {
            for (var i = rules.length - 1; i >= 0; i--) {
                result = rules[i].apply(word);
                if (result !== null) {
                    break;
                }
            }
        }

        return result;
    }

    var Inflector = (function () {
        function Inflector() {
        }
        Inflector.prototype.pluralize = function (x) {
            if (typeof x === "undefined") { x = true; }
            var $this = this;

            if (x === 1 /* Plural */) {
                return $this;
            }

            var result = applyRules(plurals, $this);

            if (x === 0 /* Singular */ || x === true) {
                return result;
            }

            var asSingular = applyRules(singulars, $this);
            var asSingularAsPlural = applyRules(plurals, asSingular);
            if ((asSingular !== null) && (asSingular !== $this) && (asSingular + "s" !== $this) && (asSingularAsPlural !== $this) && (result !== $this)) {
                return $this;
            }
            return result;
        };

        Inflector.prototype.singularize = function (x) {
            if (typeof x === "undefined") { x = true; }
            var $this = this;

            if (x === 0 /* Singular */) {
                return $this;
            }

            var result = applyRules(singulars, $this);

            if (x === 1 /* Plural */ || x === true) {
                return result;
            }

            // the Plurality is unknown so we should check all possibilities
            var asPlural = applyRules(plurals, $this);
            var asPluralAsSingular = applyRules(singulars, asPlural);
            if ((asPlural !== $this) && ($this + "s" !== asPlural) && (asPluralAsSingular === $this) && (result !== $this)) {
                return $this;
            }

            return result || $this;
        };
        return Inflector;
    })();

    String.prototype.pluralize = Inflector.prototype.pluralize;

    String.prototype.singularize = Inflector.prototype.singularize;

    /**
    * Humanizes the input with Title casing
    */
    String.prototype.titleize = function () {
        /// <summary>
        ///     Humanizes the input with Title casing
        /// </summary>
        return this.humanize(0 /* Title */);
    };

    /**
    * By default, pascalize converts strings to UpperCamelCase also removing underscores
    */
    String.prototype.pascalize = function () {
        /// <summary>
        ///     By default, pascalize converts strings to UpperCamelCase also removing underscores
        /// </summary>
        var words = this.split("_");
        var result = [];
        var length = words.length;
        for (var i = 0; i < length; i++) {
            var word = words[i];
            result.push(word.charAt(0).toUpperCase());
            result.push(word.substr(1));
        }
        return result.join("");
    };

    /**
    * Same as Pascalize except that the first character is lower case
    */
    String.prototype.camelize = function () {
        /// <summary>
        ///     Same as Pascalize except that the first character is lower case
        /// </summary>
        var word = this.pascalize();
        return word.charAt(0).toLowerCase() + word.substr(1);
    };

    /**
    * Separates the input words with underscore
    */
    String.prototype.underscore = function () {
        /// <summary>
        ///     Separates the input words with underscore
        /// </summary>
        return this.replace(/([A-Z]+)([A-Z][a-z])/, "$1_$2").replace(/([a-z\d])([A-Z])/, "$1_$2").replace(/[-\s]/, "_").toLowerCase();
    };

    /**
    * Replaces underscores with dashes in the string
    */
    String.prototype.dasherize = function () {
        /// <summary>
        ///     Replaces underscores with dashes in the string
        /// </summary>
        return this.replace("_", "-");
    };

    /**
    * Replaces underscores with hyphens in the string
    */
    String.prototype.hyphenate = function () {
        /// <summary>
        ///     Replaces underscores with hyphens in the string
        /// </summary>
        return this.dasherize();
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /**
    * @enum
    * @readonly
    */
    (function (LetterCasing) {
        /** SomeString -> Some String */
        LetterCasing[LetterCasing["Title"] = 0] = "Title";

        /** SomeString -> SOME STRING */
        LetterCasing[LetterCasing["AllCaps"] = 1] = "AllCaps";

        /** SomeString -> some string */
        LetterCasing[LetterCasing["LowerCase"] = 2] = "LowerCase";

        /** SomeString -> Some string */
        LetterCasing[LetterCasing["Sentence"] = 3] = "Sentence";
    })(Humanizer.LetterCasing || (Humanizer.LetterCasing = {}));
    var LetterCasing = Humanizer.LetterCasing;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (CollectionFormatters) {
            "use strict";

            var DefaultCollectionFormatter = (function () {
                function DefaultCollectionFormatter() {
                    this.defaultSeparator = "";
                }
                DefaultCollectionFormatter.prototype.humanize = function () {
                    var collection = arguments[0];
                    switch (arguments.length) {
                        case 1:
                            return this.humanize_collection(collection);
                        case 2:
                            if (typeof arguments[1] === "string") {
                                return this.humanize_collection_separator(collection, arguments[1]);
                            }
                            return this.humanizer_collection_objectFormatter(collection, arguments[1]);
                        case 3:
                            return this.humanizer_collection_objectFormatter_separator(collection, arguments[1], arguments[2]);
                    }
                };

                DefaultCollectionFormatter.prototype.humanize_collection = function (collection) {
                    return this.humanizer_collection_objectFormatter_separator(collection, function (item) {
                        return item.toString();
                    }, this.defaultSeparator);
                };

                DefaultCollectionFormatter.prototype.humanize_collection_separator = function (collection, separator) {
                    return this.humanizer_collection_objectFormatter_separator(collection, function (item) {
                        return item.toString();
                    }, separator);
                };

                DefaultCollectionFormatter.prototype.humanizer_collection_objectFormatter = function (collection, objectFormatter) {
                    return this.humanizer_collection_objectFormatter_separator(collection, objectFormatter, this.defaultSeparator);
                };

                DefaultCollectionFormatter.prototype.humanizer_collection_objectFormatter_separator = function (collection, objectFormatter, separator) {
                    throw new Error("A collection formatter for the current culture has not been implemented yet.");
                };
                return DefaultCollectionFormatter;
            })();
            CollectionFormatters.DefaultCollectionFormatter = DefaultCollectionFormatter;
        })(Localisation.CollectionFormatters || (Localisation.CollectionFormatters = {}));
        var CollectionFormatters = Localisation.CollectionFormatters;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (CollectionFormatters) {
            "use strict";

            var EnglishCollectionFormatter = (function (_super) {
                __extends(EnglishCollectionFormatter, _super);
                function EnglishCollectionFormatter() {
                    _super.call(this);
                    this.defaultSeparator = "and";
                }
                EnglishCollectionFormatter.prototype.humanizer_collection_objectFormatter_separator = function (collection, objectFormatter, separator) {
                    if (collection === null) {
                        throw new Error("Collection null");
                    }

                    var length = collection.length;

                    switch (length) {
                        case 0:
                            return "";
                        case 1:
                            return objectFormatter(collection[0]);
                        case 2:
                            return objectFormatter(collection[1]) + " " + separator + " " + objectFormatter(collection[1]);
                    }

                    var most = [];
                    for (var i = 0; i < length - 1; i++) {
                        most.push(objectFormatter(collection[i]));
                    }
                    return most.join(", ") + " " + separator + " " + objectFormatter(collection[length - 1]);
                };
                return EnglishCollectionFormatter;
            })(CollectionFormatters.DefaultCollectionFormatter);
            CollectionFormatters.EnglishCollectionFormatter = EnglishCollectionFormatter;
        })(Localisation.CollectionFormatters || (Localisation.CollectionFormatters = {}));
        var CollectionFormatters = Localisation.CollectionFormatters;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (Formatter) {
            "use strict";

            function format(resourceKey, culture, num) {
                var str = Humanizer.Resources.getResource(culture)[resourceKey];
                if (num === undefined) {
                    return str;
                } else {
                    return Humanizer.Resources.format(str, num);
                }
            }

            function getResourceForDate(unit, timeUnitTense, count, culture) {
                var resourceKey = Localisation.ResourceKeys.DateHumanize.GetResourceKey(unit, timeUnitTense, count);
                return count === 1 ? format(resourceKey, culture) : format(resourceKey, culture, count);
            }

            function getResourceForTime(unit, count, culture) {
                var resourceKey = Localisation.ResourceKeys.TimeHumanize.GetResourceKey(unit, count);
                return count === 1 ? format(resourceKey, culture) : format(resourceKey, culture, count);
            }

            var DefaultFormatter = (function () {
                function DefaultFormatter(culture) {
                    this.culture = culture;
                }
                DefaultFormatter.prototype.DateHumanize_Now = function () {
                    return getResourceForDate(0 /* Millisecond */, 1 /* Past */, 0, this.culture);
                };

                DefaultFormatter.prototype.DateHumanize = function (timeunit, timeUnitTense, unit) {
                    return getResourceForDate(timeunit, timeUnitTense, unit, this.culture);
                };

                DefaultFormatter.prototype.TimeHumanizer_Zero = function () {
                    return getResourceForTime(0 /* Millisecond */, 0, this.culture);
                };

                DefaultFormatter.prototype.TimeHumanize = function (timeunit, unit) {
                    return getResourceForTime(timeunit, unit, this.culture);
                };
                return DefaultFormatter;
            })();
            Formatter.DefaultFormatter = DefaultFormatter;
        })(Localisation.Formatter || (Localisation.Formatter = {}));
        var Formatter = Localisation.Formatter;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (NumberToWords) {
            var arabicGroup = ["مئة", "ألف", "مليون", "مليار", "تريليون", "كوادريليون", "كوينتليون", "سكستيليون"];
            var arabicAppendedGroup = ["", "ألفاً", "مليوناً", "ملياراً", "تريليوناً", "كوادريليوناً", "كوينتليوناً", "سكستيليوناً"];
            var arabicPluralGroups = ["", "آلاف", "ملايين", "مليارات", "تريليونات", "كوادريليونات", "كوينتليونات", "سكستيليونات"];
            var onesGroup = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة", "عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"];
            var tensGroup = ["", "عشرة", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
            var hundredsGroup = ["", "مئة", "مئتان", "ثلاث مئة", "أربع مئة", "خمس مئة", "ست مئة", "سبع مئة", "ثمان مئة", "تسع مئة"];
            var arabicAppendedTwos = ["مئتان", "ألفان", "مليونان", "ملياران", "تريليونان", "كوادريليونان", "كوينتليونان", "سكستيليونلن"];
            var arabicTwos = ["مئتان", "ألفان", "مليونان", "ملياران", "تريليونان", "كوادريليونان", "كوينتليونان", "سكستيليونان"];

            var ArabicNumberToWordsConverter = (function (_super) {
                __extends(ArabicNumberToWordsConverter, _super);
                function ArabicNumberToWordsConverter() {
                    _super.apply(this, arguments);
                }
                ArabicNumberToWordsConverter.prototype.convert_number = function (num) {
                    if (num === 0) {
                        return "صفر";
                    }

                    var result = "";
                    var groupLevel = 0;

                    while (num >= 1) {
                        var groupNumber = num % 1000;
                        num = Math.floor(num / 1000);

                        var tens = groupNumber % 100;
                        var hundreds = Math.floor(groupNumber / 100);
                        var process = "";

                        if (hundreds > 0) {
                            if ((tens === 0) && (hundreds === 2)) {
                                process = arabicAppendedTwos[0];
                            } else {
                                process = hundredsGroup[hundreds];
                            }
                        }

                        if (tens > 0) {
                            if (tens < 20) {
                                if ((tens === 2) && (hundreds === 0) && (groupLevel > 0)) {
                                    if ((num === 2000) || (num === 2000000) || (num === 2000000000)) {
                                        process = arabicAppendedTwos[groupLevel];
                                    } else {
                                        process = arabicTwos[groupLevel];
                                    }
                                } else {
                                    if (process !== "") {
                                        process += " و ";
                                    }

                                    if ((tens === 1) && (groupLevel > 0) && (hundreds === 0)) {
                                        process += " ";
                                    } else {
                                        process += onesGroup[tens];
                                    }
                                }
                            } else {
                                var ones = tens % 10;
                                tens = Math.floor(tens / 10);

                                if (ones > 0) {
                                    if (process !== "") {
                                        process += " و ";
                                    }

                                    process += onesGroup[ones];
                                }

                                if (process !== "") {
                                    process += " و ";
                                }

                                process += tensGroup[tens];
                            }
                        }

                        if (process !== "") {
                            if (groupLevel > 0) {
                                if (result !== "") {
                                    result = "و " + result;
                                }

                                if (groupNumber !== 2) {
                                    if (groupNumber % 100 !== 1) {
                                        if (groupNumber >= 3) {
                                            result = arabicPluralGroups[groupLevel] + " " + result;
                                        } else {
                                            result = (result !== "" ? arabicAppendedGroup[groupLevel] : arabicGroup[groupLevel]) + " " + result;
                                        }
                                    } else {
                                        result = arabicGroup[groupLevel] + " " + result;
                                    }
                                }
                            }

                            result = process + " " + result;
                        }

                        groupLevel++;
                    }

                    return result.trim();
                };

                ArabicNumberToWordsConverter.prototype.convertToOrdinal_number = function (num) {
                    throw new Error("Not Implemented");
                };
                return ArabicNumberToWordsConverter;
            })(NumberToWords.GenderedNumberToWordsConverter);
            NumberToWords.ArabicNumberToWordsConverter = ArabicNumberToWordsConverter;
        })(Localisation.NumberToWords || (Localisation.NumberToWords = {}));
        var NumberToWords = Localisation.NumberToWords;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (NumberToWords) {
            "use strict";

            var DefaultNumberToWordsConverter = (function (_super) {
                __extends(DefaultNumberToWordsConverter, _super);
                function DefaultNumberToWordsConverter() {
                    _super.apply(this, arguments);
                }
                DefaultNumberToWordsConverter.prototype.convert_number = function (num) {
                    return num.toString();
                };

                DefaultNumberToWordsConverter.prototype.convertToOrdinal_number = function (num) {
                    return num.toString();
                };
                return DefaultNumberToWordsConverter;
            })(NumberToWords.GenderlessNumberToWordsConverter);
            NumberToWords.DefaultNumberToWordsConverter = DefaultNumberToWordsConverter;
        })(Localisation.NumberToWords || (Localisation.NumberToWords = {}));
        var NumberToWords = Localisation.NumberToWords;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (NumberToWords) {
            "use strict";

            var unitsMap = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
            var tensMap = ["zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
            var exceptions = {
                1: "first",
                2: "second",
                3: "third",
                4: "fourth",
                5: "fifth",
                8: "eighth",
                9: "ninth",
                12: "twelfth"
            };

            function getUnitValue(num, isOrdinal) {
                if (isOrdinal) {
                    var exception = exceptions[num];
                    if (exception) {
                        return exception;
                    } else {
                        return unitsMap[num] + "th";
                    }
                } else {
                    return unitsMap[num];
                }
            }

            function removeOnePrefix(toWords) {
                if (toWords.indexOf("one") === 0) {
                    return toWords.substr(4);
                }
                return toWords;
            }

            function convert(num, isOrdinal) {
                if (num === 0) {
                    return getUnitValue(0, isOrdinal);
                }

                if (num < 0) {
                    return "minus " + convert(-num, false);
                }

                var parts = [];

                if ((num / 1000000000) > 0) {
                    parts.push(convert(Math.floor(num / 1000000000), false) + " billion");
                    num %= 1000000000;
                }

                if ((num / 1000000) > 0) {
                    parts.push(convert(Math.floor(num / 1000000), false) + " million");
                    num %= 1000000;
                }

                if ((num / 1000) > 0) {
                    parts.push(convert(Math.floor(num / 1000), false) + " thousand");
                    num %= 1000;
                }

                if ((num / 100) > 0) {
                    parts.push(convert(Math.floor(num / 100), false) + " hundred");
                    num %= 100;
                }

                if (num > 0) {
                    if (parts.length !== 0) {
                        parts.push("and");
                    }

                    if (num < 20) {
                        parts.push(getUnitValue(num, isOrdinal));
                    } else {
                        var lastPart = tensMap[Math.floor(num / 10)];
                        if ((num % 10) > 0) {
                            lastPart += "-" + getUnitValue(num % 10, isOrdinal);
                        } else if (isOrdinal && lastPart.indexOf("y") === lastPart.length - 1) {
                            lastPart = lastPart.substr(0, lastPart.length - 1) + "ieth";
                        }
                        parts.push(lastPart);
                    }
                } else if (isOrdinal) {
                    parts[parts.length - 1] += "th";
                }

                var toWords = parts.join(" ");

                if (isOrdinal) {
                    toWords = removeOnePrefix(toWords);
                }

                return toWords;
            }

            var EnglishNumberToWordsConverter = (function (_super) {
                __extends(EnglishNumberToWordsConverter, _super);
                function EnglishNumberToWordsConverter() {
                    _super.apply(this, arguments);
                }
                EnglishNumberToWordsConverter.prototype.convert_number = function (num) {
                    return convert(num, false);
                };

                EnglishNumberToWordsConverter.prototype.convertToOrdinal_number = function (num) {
                    return convert(num, true);
                };
                return EnglishNumberToWordsConverter;
            })(NumberToWords.GenderlessNumberToWordsConverter);
            NumberToWords.EnglishNumberToWordsConverter = EnglishNumberToWordsConverter;
        })(Localisation.NumberToWords || (Localisation.NumberToWords = {}));
        var NumberToWords = Localisation.NumberToWords;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (NumberToWords) {
            "use strict";

            var GenderedNumberToWordsConverter = (function () {
                function GenderedNumberToWordsConverter(defaultGender) {
                    if (typeof defaultGender === "undefined") { defaultGender = 0 /* Masculine */; }
                    this.defaultGender = defaultGender;
                }
                GenderedNumberToWordsConverter.prototype.convert = function () {
                    if (arguments.length === 1) {
                        return this.convert_number(arguments[0]);
                    }
                    return this.convert_number_grammaticalGender(arguments[0], arguments[1]);
                };

                GenderedNumberToWordsConverter.prototype.convertToOrdinal = function () {
                    if (arguments.length === 1) {
                        return this.convertToOrdinal_number(arguments[0]);
                    }
                    return this.convertToOrdinal_number_grammaticalGender(arguments[0], arguments[1]);
                };

                GenderedNumberToWordsConverter.prototype.convert_number = function (num) {
                    return this.convert_number_grammaticalGender(num, this.defaultGender);
                };

                GenderedNumberToWordsConverter.prototype.convert_number_grammaticalGender = function (num, gender) {
                    throw new Error("Abstract");
                };

                GenderedNumberToWordsConverter.prototype.convertToOrdinal_number = function (num) {
                    return this.convertToOrdinal_number_grammaticalGender(num, this.defaultGender);
                };

                GenderedNumberToWordsConverter.prototype.convertToOrdinal_number_grammaticalGender = function (num, gender) {
                    throw new Error("Abstract");
                };
                return GenderedNumberToWordsConverter;
            })();
            NumberToWords.GenderedNumberToWordsConverter = GenderedNumberToWordsConverter;
        })(Localisation.NumberToWords || (Localisation.NumberToWords = {}));
        var NumberToWords = Localisation.NumberToWords;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (NumberToWords) {
            "use strict";

            var GenderlessNumberToWordsConverter = (function () {
                function GenderlessNumberToWordsConverter() {
                }
                GenderlessNumberToWordsConverter.prototype.convert = function () {
                    if (arguments.length === 1) {
                        return this.convert_number(arguments[0]);
                    }
                    return this.convert_number_grammaticalGender(arguments[0], arguments[1]);
                };

                GenderlessNumberToWordsConverter.prototype.convertToOrdinal = function () {
                    if (arguments.length === 1) {
                        return this.convertToOrdinal_number(arguments[0]);
                    }
                    return this.convertToOrdinal_number_grammaticalGender(arguments[0], arguments[1]);
                };

                GenderlessNumberToWordsConverter.prototype.convert_number = function (num) {
                    throw new Error("Abstract");
                };

                GenderlessNumberToWordsConverter.prototype.convert_number_grammaticalGender = function (num, gender) {
                    return this.convert_number(num);
                };

                GenderlessNumberToWordsConverter.prototype.convertToOrdinal_number = function (num) {
                    throw new Error("Abstract");
                };

                GenderlessNumberToWordsConverter.prototype.convertToOrdinal_number_grammaticalGender = function (num, gender) {
                    return this.convertToOrdinal_number(num);
                };
                return GenderlessNumberToWordsConverter;
            })();
            NumberToWords.GenderlessNumberToWordsConverter = GenderlessNumberToWordsConverter;
        })(Localisation.NumberToWords || (Localisation.NumberToWords = {}));
        var NumberToWords = Localisation.NumberToWords;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (Ordinalizers) {
            "use strict";

            var DefaultOrdinalizer = (function () {
                function DefaultOrdinalizer() {
                }
                DefaultOrdinalizer.prototype.convert = function () {
                    return arguments[1];
                };
                return DefaultOrdinalizer;
            })();
            Ordinalizers.DefaultOrdinalizer = DefaultOrdinalizer;
        })(Localisation.Ordinalizers || (Localisation.Ordinalizers = {}));
        var Ordinalizers = Localisation.Ordinalizers;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (Ordinalizers) {
            "use strict";

            var EnglishOrdinalizer = (function () {
                function EnglishOrdinalizer() {
                }
                EnglishOrdinalizer.prototype.convert = function () {
                    var num = arguments[0];
                    var numberString = arguments[1];

                    var nMod100 = Math.floor(num % 100);
                    if (nMod100 <= 11 && nMod100 <= 13) {
                        return numberString + "th";
                    }

                    switch (Math.floor(num % 10)) {
                        case 1:
                            return numberString + "st";
                        case 2:
                            return numberString + "nd";
                        case 3:
                            return numberString + "rd";
                        default:
                            return numberString + "th";
                    }
                };
                return EnglishOrdinalizer;
            })();
            Ordinalizers.EnglishOrdinalizer = EnglishOrdinalizer;
        })(Localisation.Ordinalizers || (Localisation.Ordinalizers = {}));
        var Ordinalizers = Localisation.Ordinalizers;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (ResourceKeys) {
            "use strict";

            var DateHumanize = (function () {
                function DateHumanize() {
                }
                DateHumanize.Now = "DateHumanize_Now";
                DateHumanize.DateTimeFormat = "DateHumanize_{0}{1}{2}";
                DateHumanize.Ago = "Ago";
                DateHumanize.FromNow = "FromNow";
                DateHumanize.GetResourceKey = function (timeUnit, timeUnitTense, count) {
                    if (typeof count === "undefined") { count = 1; }
                    ResourceKeys.ValidateRange(count);

                    if (count === 1) {
                        return DateHumanize.Now;
                    }

                    var singularity = count === 1 ? ResourceKeys.Single : ResourceKeys.Multiple;
                    var tense = timeUnitTense === 0 /* Future */ ? DateHumanize.FromNow : DateHumanize.Ago;
                    var unit = timeUnit.toString().toQuantity(count, 0 /* None */);
                    return Humanizer.Resources.format(DateHumanize.DateTimeFormat, singularity, unit, tense);
                };
                return DateHumanize;
            })();
            ResourceKeys.DateHumanize = DateHumanize;
        })(Localisation.ResourceKeys || (Localisation.ResourceKeys = {}));
        var ResourceKeys = Localisation.ResourceKeys;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (ResourceKeys) {
            "use strict";

            var TimeHumanize = (function () {
                function TimeHumanize() {
                }
                TimeHumanize.TimeFormat = "TimeHumanize_{0}{1}{2}";
                TimeHumanize.Zero = "TimeHumanize_Zero";
                TimeHumanize.GetResourceKey = function (unit, count) {
                    if (typeof count === "undefined") { count = 1; }
                    ResourceKeys.ValidateRange(count);

                    if (count === 0) {
                        return TimeHumanize.Zero;
                    }

                    return Humanizer.Resources.format(TimeHumanize.TimeFormat, count === 1 ? ResourceKeys.Single : ResourceKeys.Multiple, Localisation.TimeUnit[unit], count === 1 ? "" : "s");
                };
                return TimeHumanize;
            })();
            ResourceKeys.TimeHumanize = TimeHumanize;
        })(Localisation.ResourceKeys || (Localisation.ResourceKeys = {}));
        var ResourceKeys = Localisation.ResourceKeys;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (ResourceKeys) {
            "use strict";

            ResourceKeys.Single = "Single";
            ResourceKeys.Multiple = "Multiple";
            ResourceKeys.ValidateRange = function (count) {
                if (count < 0) {
                    throw new RangeError();
                }
            };
        })(Localisation.ResourceKeys || (Localisation.ResourceKeys = {}));
        var ResourceKeys = Localisation.ResourceKeys;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        "use strict";

        (function (Tense) {
            Tense[Tense["Future"] = 0] = "Future";
            Tense[Tense["Past"] = 1] = "Past";
        })(Localisation.Tense || (Localisation.Tense = {}));
        var Tense = Localisation.Tense;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        "use strict";

        /**
        * Units of time.
        * @enum
        * @readonly
        */
        (function (TimeUnit) {
            TimeUnit[TimeUnit["Millisecond"] = 0] = "Millisecond";
            TimeUnit[TimeUnit["Second"] = 1] = "Second";
            TimeUnit[TimeUnit["Minute"] = 2] = "Minute";
            TimeUnit[TimeUnit["Hour"] = 3] = "Hour";
            TimeUnit[TimeUnit["Day"] = 4] = "Day";
            TimeUnit[TimeUnit["Week"] = 5] = "Week";
            TimeUnit[TimeUnit["Month"] = 6] = "Month";
            TimeUnit[TimeUnit["Year"] = 7] = "Year";
        })(Localisation.TimeUnit || (Localisation.TimeUnit = {}));
        var TimeUnit = Localisation.TimeUnit;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var MILLIS_PER_SECOND = 1000;
    var MILLIS_PER_MINUTE = MILLIS_PER_SECOND * 60;
    var MILLIS_PER_HOUR = MILLIS_PER_MINUTE * 60;
    var MILLIS_PER_DAY = MILLIS_PER_HOUR * 24;

    Number.prototype.days = function () {
        return this * MILLIS_PER_DAY;
    };

    Number.prototype.weeks = function () {
        return (this * 7).days();
    };

    Number.prototype.hours = function () {
        return this * MILLIS_PER_HOUR;
    };

    Number.prototype.minutes = function () {
        return this * MILLIS_PER_MINUTE;
    };

    Number.prototype.seconds = function () {
        return this * MILLIS_PER_SECOND;
    };

    Number.prototype.milliseconds = function () {
        return this;
    };

    Number.prototype.toDays = function () {
        return this / MILLIS_PER_DAY;
    };

    Number.prototype.toWeeks = function () {
        return (this / 7).toDays();
    };

    Number.prototype.toDays = function () {
        return this / MILLIS_PER_DAY;
    };

    Number.prototype.toHours = function () {
        return this / MILLIS_PER_HOUR;
    };

    Number.prototype.toMinutes = function () {
        return this / MILLIS_PER_MINUTE;
    };

    Number.prototype.toSeconds = function () {
        return this / MILLIS_PER_SECOND;
    };

    Number.prototype.toMilliseconds = function () {
        return this;
    };

    Number.prototype.time = function (percision, countEmptyUnits, culture) {
        if (typeof percision === "undefined") { percision = 1; }
        if (typeof countEmptyUnits === "undefined") { countEmptyUnits = false; }
        if (typeof culture === "undefined") { culture = Humanizer.Resources.getCurrentCulture(); }
        var timeParts = parts(this, culture);
        var i = 0;
        if (!countEmptyUnits) {
            while (i < timeParts.length) {
                if (timeParts[i] === null) {
                    timeParts.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
        if (percision < timeParts.length) {
            timeParts.splice(percision, timeParts.length - percision);
        }
        if (countEmptyUnits) {
            i = 0;
            while (i < timeParts.length) {
                if (timeParts[i] === null) {
                    timeParts.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
        return timeParts.join(", ");
    };

    function parts(timespan, culture) {
        var days = timespan / MILLIS_PER_DAY;
        var weeks = Math.floor(days / 7);
        var daysInWeek = days % 7;
        timespan = timespan - ((weeks * 7 + daysInWeek) * MILLIS_PER_DAY);
        var hours = Math.floor(timespan / MILLIS_PER_HOUR);
        timespan = timespan - (hours * MILLIS_PER_HOUR);
        var minutes = Math.floor(timespan / MILLIS_PER_MINUTE);
        timespan = timespan - (minutes * MILLIS_PER_MINUTE);
        var seconds = Math.floor(timespan / MILLIS_PER_SECOND);
        var milliseconds = timespan - (seconds * MILLIS_PER_SECOND);

        var outputWeeks = weeks > 0;
        var outputDays = outputWeeks || daysInWeek > 0;
        var outputHours = outputDays || hours > 0;
        var outputMinutes = outputHours || minutes > 0;
        var outputSeconds = outputMinutes || seconds > 0;
        var outputMilliseconds = outputSeconds || milliseconds > 0;

        var result;
        var formatter = Humanizer.Configuration.Configurator.getFormatter(culture);
        if (outputWeeks) {
            result.push(part(formatter, 5 /* Week */, weeks));
        }
        if (outputDays) {
            result.push(part(formatter, 4 /* Day */, days));
        }
        if (outputHours) {
            result.push(part(formatter, 3 /* Hour */, hours));
        }
        if (outputMinutes) {
            result.push(part(formatter, 2 /* Minute */, minutes));
        }
        if (outputSeconds) {
            result.push(part(formatter, 1 /* Second */, seconds));
        }
        if (outputMilliseconds) {
            result.push(part(formatter, 0 /* Millisecond */, milliseconds));
        } else {
            result.push(formatter.TimeHumanizer_Zero());
        }
        return result;
    }

    function part(formatter, timeUnit, unit) {
        return unit !== 0 ? formatter.TimeHumanize(timeUnit, unit) : null;
    }
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /**
    * 3501.ToWords() -> "three thousand five hundred and one"
    */
    Number.prototype.toWords = function () {
        /// <summary>
        ///     3501.ToWords() -> "three thousand five hundred and one"
        /// </summary>
        var gender = arguments.length >= 1 && typeof arguments[0] === "number" ? arguments[0] : null;
        var converter = Humanizer.Configuration.Configurator.getNumberToWordsConverter(arguments.length > 0 && typeof arguments[arguments.length - 1] === "string" ? arguments[arguments.length - 1] : Humanizer.Resources.getCurrentCulture());
        if (gender === null) {
            return converter.convert(this);
        }
        return converter.convert(this, gender);
    };

    Number.prototype.toOrdinalWords = function () {
        var gender = arguments.length >= 1 && typeof arguments[0] === "number" ? arguments[0] : null;
        var converter = Humanizer.Configuration.Configurator.getNumberToWordsConverter(arguments.length > 0 && typeof arguments[arguments.length - 1] === "string" ? arguments[arguments.length - 1] : Humanizer.Resources.getCurrentCulture());
        if (gender === null) {
            return converter.convertToOrdinal(this);
        }
        return converter.convertToOrdinal(this, gender);
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /**
    * Dictating what should be done when a match is not found - currently used only for DehumanizeTo
    * @readononly
    * @enum
    */
    (function (OnNoMatch) {
        //** This is the default behavior which throws a NoMatchFoundException */
        OnNoMatch[OnNoMatch["ThrowsException"] = 0] = "ThrowsException";

        /** If set to ReturnsNull the method returns null instead of throwing an exception */
        OnNoMatch[OnNoMatch["ReturnsNull"] = 1] = "ReturnsNull";
    })(Humanizer.OnNoMatch || (Humanizer.OnNoMatch = {}));
    var OnNoMatch = Humanizer.OnNoMatch;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /** Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th. */
    String.prototype.ordinalize = function (gender) {
        /// <signature>
        ///     <summary>
        ///         Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        ///     </summary>
        /// </signature>
        /// <signature>
        ///     <summary>
        ///         Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        ///     </summary>
        ///     <param name="gender" type="Humanizer.GrammaticalGender">
        ///         The grammatical gender to use for output words
        ///     </param>
        /// </signature>
        if (gender === undefined) {
            return Humanizer.Configuration.Configurator.getOrdinalizer().convert(parseInt(this, 10), this);
        } else {
            return Humanizer.Configuration.Configurator.getOrdinalizer().convert(parseInt(this, 10), this, gender);
        }
    };

    /** Turns a number into an ordinal number used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th. */
    Number.prototype.ordinalize = function (gender) {
        /// <signature>
        ///     <summary>
        ///         Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        ///     </summary>
        /// </signature>
        /// <signature>
        ///     <summary>
        ///         Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        ///     </summary>
        ///     <param name="gender" type="Humanizer.GrammaticalGender">
        ///         The grammatical gender to use for output words
        ///     </param>
        /// </signature>
        if (gender === undefined) {
            return Humanizer.Configuration.Configurator.getOrdinalizer().convert(this, this.toString());
        } else {
            return Humanizer.Configuration.Configurator.getOrdinalizer().convert(this, this.String(), gender);
        }
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Resources) {
        "use strict";

        Resources._cultures["en-US"] = {
            DateHumanize_MultipleDaysAgo: "{0} days ago",
            DateHumanize_MultipleDaysFromNow: "{0} days from now",
            DateHumanize_MultipleHoursAgo: "{0} hours ago",
            DateHumanize_MultipleHoursFromNow: "{0} hours from now",
            DateHumanize_MultipleMinutesAgo: "{0} minutes ago",
            DateHumanize_MultipleMinutesFromNow: "{0} minutes from now",
            DateHumanize_MultipleMonthsAgo: "{0} months ago",
            DateHumanize_MultipleMonthsFromNow: "{0} months from now",
            DateHumanize_MultipleSecondsAgo: "{0} seconds ago",
            DateHumanize_MultipleSecondsFromNow: "{0} seconds from now",
            DateHumanize_MultipleYearsAgo: "{0} years ago",
            DateHumanize_MultipleYearsFromNow: "{0} years from now",
            DateHumanize_Now: "now",
            DateHumanize_SingleDayAgo: "yesterday",
            DateHumanize_SingleDayFromNow: "tomorrow",
            DateHumanize_SingleHourAgo: "an hour ago",
            DateHumanize_SingleHourFromNow: "an hour from now",
            DateHumanize_SingleMinuteAgo: "a minute ago",
            DateHumanize_SingleMinuteFromNow: "a minute from now",
            DateHumanize_SingleMonthAgo: "one month ago",
            DateHumanize_SingleMonthFromNow: "one month from now",
            DateHumanize_SingleSecondAgo: "one second ago",
            DateHumanize_SingleSecondFromNow: "one second from now",
            DateHumanize_SingleYearAgo: "one year ago",
            DateHumanize_SingleYearFromNow: "one year from now",
            TimeHumanize_MultipleDays: "{0} days",
            TimeHumanize_MultipleHours: "{0} hours",
            TimeHumanize_MultipleMilliseconds: "{0} milliseconds",
            TimeHumanize_MultipleMinutes: "{0} minutes",
            TimeHumanize_MultipleSeconds: "{0} seconds",
            TimeHumanize_MultipleWeeks: "{0} weeks",
            TimeHumanize_SingleDay: "1 day",
            TimeHumanize_SingleHour: "1 hour",
            TimeHumanize_SingleMillisecond: "1 millisecond",
            TimeHumanize_SingleMinute: "1 minute",
            TimeHumanize_SingleSecond: "1 second",
            TimeHumanize_SingleWeek: "1 week",
            TimeHumanize_Zero: "no time"
        };
    })(Humanizer.Resources || (Humanizer.Resources = {}));
    var Resources = Humanizer.Resources;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    (function (Resources) {
        "use strict";

        Resources._cultures = {};

        function getCurrentCulture() {
            return navigator.language || navigator.userLanguage || "en-US";
        }
        Resources.getCurrentCulture = getCurrentCulture;

        function getResource(culture) {
            var r = Humanizer.Resources._cultures[culture];
            if (r !== undefined) {
                return r;
            }
            return Humanizer.Resources._cultures["en-US"];
        }
        Resources.getResource = getResource;

        function format(str) {
            var obj = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                obj[_i] = arguments[_i + 1];
            }
            var worker = str;
            for (var i = 0; i < obj.length; i++) {
                worker = worker.replace("{" + i + "}", obj[i].toString());
            }
            return worker;
        }
        Resources.format = format;
    })(Humanizer.Resources || (Humanizer.Resources = {}));
    var Resources = Humanizer.Resources;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var romanNumberals = {
        "M": 1000,
        "CM": 900,
        "D": 500,
        "CD": 400,
        "C": 100,
        "XC": 90,
        "L": 50,
        "XL": 40,
        "X": 10,
        "IX": 9,
        "V": 5,
        "IV": 4,
        "I": 1
    };

    var validRomanNumerals = /^(?:(?=[MDCLXVI])((M{0,3})((C[DM])|(D?C{0,3}))?((X[LC])|(L?XX{0,2})|L)?((I[VX])|(V?(II{0,2}))|V)?))$/;

    /**
    * Converts Roman numbers into integer
    * @returns {Number} Human-readable number
    */
    String.prototype.fromRoman = function () {
        /// <summary>
        ///     Converts Roman numbers into integer
        /// </summary>
        /// <returns type="Number" integer="true">
        ///     Human-readable number
        /// </returns>
        var input = this.toUpperCase().trim();
        var length = input.length;

        if ((length === 0) || !validRomanNumerals.test(input)) {
            throw new Error("Empty or invalid Roman numeral string.");
        }

        var total = 0;
        var i = length;

        while (i > 0) {
            var digit = romanNumberals[input.charAt(--i)];

            if (i > 0) {
                var previousDigit = romanNumberals[input.charAt(i - 1)];

                if (previousDigit < digit) {
                    digit -= previousDigit;
                    i--;
                }
            }
            total += digit;
        }

        return total;
    };

    /**
    * Converts the input to Roman number
    * @returns {String} Roman number
    */
    Number.prototype.toRoman = function () {
        /// <summary>
        ///     Converts the input to Roman number
        /// </summary>
        /// <returns type="String">
        ///     Roman number
        /// </returns>
        var minValue = 1;
        var maxValue = 3999;

        if ((this < minValue) || (this > maxValue)) {
            throw new Error("Out of range");
        }

        var sb = [];
        var input = this;

        for (var key in romanNumberals) {
            if (Object.prototype.hasOwnProperty.call(romanNumberals, romanNumberals)) {
                var value = romanNumberals[key];
                while (input / value > 0) {
                    sb.push(key);
                    input -= value;
                }
            }
        }

        return sb.join("");
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /**
    * Dehumanizes a string; e.g. 'some string', 'Some String', 'Some string' -> 'SomeString'
    */
    String.prototype.dehumanize = function () {
        /// <summary>
        ///     Dehumanizes a string; e.g. 'some string', 'Some String', 'Some string' -> 'SomeString'
        /// </summary>
        var titlizedWords = this.split(" ");
        var length = titlizedWords.length;
        for (var i = 0; i < length; i++) {
            titlizedWords[i] = titlizedWords[i].humanize(0 /* Title */);
        }
        return titlizedWords.join("").replace(" ", "");
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    function fromUnderscoreDashSeparatedWords(input) {
        return input.split(/[_-]/g, Number.MAX_VALUE).join(" ");
    }

    function fromPascalCase(input) {
        var pascalCaseRegex = /(?:([A-Z][a-z]+)(?=[A-Z]))|(?:([a-z]+)(?=[A-Z]))|(?:(\d+))|(?:([A-Z][a-z]+))|([A-Z]+)/g;
        var matches = input.match(pascalCaseRegex) || [];
        var matchesLength = matches.length;
        for (var i = 0; i < matchesLength; i++) {
            var word = matches[i] || "";
            matches[i] = (word.toUpperCase() === word) && (word.length > 1) ? word : word.toLowerCase();
        }
        var result = matches.join(" ");
        result = result.charAt(0).toUpperCase() + result.substr(1);
        return result.replace(" i ", " I ");
    }

    function humanize(input) {
        if (input === input.toUpperCase()) {
            return input;
        }

        if ((input.indexOf("_") !== -1) || (input.indexOf("-") !== -1)) {
            return fromUnderscoreDashSeparatedWords(input);
        }

        return fromPascalCase(input);
    }

    /**
    * Humanizes the input string
    * @param {Humanizer.LetterCasing} [casing] The desired casing for the output
    */
    String.prototype.humanize = function (casing) {
        /// <signature>
        ///     <summary>
        ///         Humanizes the input string; e.g. Underscored_input_String_is_turned_INTO_sentence -> 'Underscored input String is turned INTO sentence'
        ///     </summary>
        /// </signature>
        /// <signature>
        ///     <summary>
        ///         Humanized the input string based on the provided casing
        ///     </summary>
        ///     <param name="casing" type="Humanizer.LetterCasing">
        ///         The desired casing for the output
        ///     </param>
        /// </signature>
        if ((casing !== null) && (casing !== undefined)) {
            return humanize(this).applyCasing(casing);
        } else {
            return humanize(this);
        }
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    (function (ShowQuantityAs) {
        ShowQuantityAs[ShowQuantityAs["None"] = 0] = "None";
        ShowQuantityAs[ShowQuantityAs["Numeric"] = 1] = "Numeric";
        ShowQuantityAs[ShowQuantityAs["Words"] = 2] = "Words";
    })(Humanizer.ShowQuantityAs || (Humanizer.ShowQuantityAs = {}));
    var ShowQuantityAs = Humanizer.ShowQuantityAs;

    String.prototype.toQuantity = function (quantity, showQuantityAs) {
        if (typeof showQuantityAs === "undefined") { showQuantityAs = 0 /* None */; }
        var transformedInput = quantity === 1 ? this.singularize(2 /* CouldBeEither */) : this.pluralize(2 /* CouldBeEither */);

        if (showQuantityAs === 0 /* None */) {
            return transformedInput;
        }

        switch (showQuantityAs) {
            case 0 /* None */:
                return transformedInput;
            case 1 /* Numeric */:
                return quantity.toString() + transformedInput;
            case 2 /* Words */:
                return quantity.toWords() + transformedInput;
        }
    };
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /** Transforms a string using the provided transformers. Transformations are applied in the provided order. */
    String.prototype.transform = function () {
        /// <summary>
        ///     Transforms a string using the provided transformers. Transformations are applied in the provided order.
        /// </summary>
        var transformers = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            transformers[_i] = arguments[_i + 0];
        }
        var str = this;
        var length = transformers.length;
        for (var i = 0; i < length; i++) {
            str = transformers[i].transform(str);
        }
        return str;
    };

    var To = (function () {
        function To() {
        }
        To.TitleCase = new Humanizer.ToTitleCase();
        To.UpperCase = new Humanizer.ToUpperCase();
        To.LowerCase = new Humanizer.ToLowerCase();
        To.SentenceCase = new Humanizer.ToSentenceCase();
        return To;
    })();
    Humanizer.To = To;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var ToLowerCase = (function () {
        function ToLowerCase() {
        }
        ToLowerCase.prototype.transform = function (input) {
            return input.toLocaleLowerCase();
        };
        return ToLowerCase;
    })();
    Humanizer.ToLowerCase = ToLowerCase;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var ToSentenceCase = (function () {
        function ToSentenceCase() {
        }
        ToSentenceCase.prototype.transform = function (input) {
            if (input.length > 1) {
                return input.charAt(0).toUpperCase() + input.substr(1);
            }
            return input.toUpperCase();
        };
        return ToSentenceCase;
    })();
    Humanizer.ToSentenceCase = ToSentenceCase;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var ToTitleCase = (function () {
        function ToTitleCase() {
        }
        ToTitleCase.prototype.transform = function (input) {
            var words = input.split(" ");
            var result = [];
            var length = words.length;
            for (var i = 0; i < length; i++) {
                var word = words[i];
                if ((word.length === 0) || (word === word.toUpperCase())) {
                    result.push(word);
                } else if (word.length === 1) {
                    result.push(word.toUpperCase());
                } else {
                    result.push(word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
                }
            }
            return result.join(" ");
        };
        return ToTitleCase;
    })();
    Humanizer.ToTitleCase = ToTitleCase;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var ToUpperCase = (function () {
        function ToUpperCase() {
        }
        ToUpperCase.prototype.transform = function (input) {
            return input.toUpperCase();
        };
        return ToUpperCase;
    })();
    Humanizer.ToUpperCase = ToUpperCase;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    /**
    * Truncation location for humanizer
    * @enum
    * @readonly
    */
    (function (TruncateFrom) {
        /** Truncate letters from the left (start) of the string */
        TruncateFrom[TruncateFrom["Left"] = 0] = "Left";

        /** Truncate letters from the right (end) of the string */
        TruncateFrom[TruncateFrom["Right"] = 1] = "Right";
    })(Humanizer.TruncateFrom || (Humanizer.TruncateFrom = {}));
    var TruncateFrom = Humanizer.TruncateFrom;

    var Trunc = (function () {
        function Trunc() {
        }
        Trunc.prototype.truncate = function () {
            var length = arguments[0];
            var truncationString = "…";
            var from = 1 /* Right */;
            var truncator = Humanizer.Truncator.FixedLength;
            if (arguments.length > 1) {
                if (typeof arguments[1] === "string") {
                    truncationString = arguments[1];
                } else {
                    truncator = arguments[1];
                }
            }
            if (arguments.length > 2) {
                if (typeof arguments[2] === "number") {
                    from = arguments[2];
                } else {
                    truncator = arguments[2];
                }
            }
            if (arguments.length > 3) {
                from = arguments[3];
            }

            var $this = this;

            return truncator.truncate($this, length, truncationString, from);
        };
        return Trunc;
    })();

    String.prototype.truncate = Trunc.prototype.truncate;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var FixedLengthTruncator = (function () {
        function FixedLengthTruncator() {
        }
        FixedLengthTruncator.prototype.truncate = function (value, length, truncationString, truncateFrom) {
            if (typeof truncateFrom === "undefined") { truncateFrom = 1 /* Right */; }
            if (!value) {
                return null;
            }

            if (value.length === 0) {
                return value;
            }

            if (truncationString === null || truncationString.length > length) {
                return truncateFrom === 1 /* Right */ ? value.substr(0, length) : value.substr(value.length - length);
            }

            if (truncateFrom === 0 /* Left */) {
                return value.length > length ? truncationString + value.substr(value.length - length + truncationString.length) : value;
            }

            return value.length > length ? value.substr(0, length - truncationString.length) + truncationString : value;
        };
        return FixedLengthTruncator;
    })();
    Humanizer.FixedLengthTruncator = FixedLengthTruncator;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var charRegex = /[A-Za-z0-9]/;
    var FixedNumberOfCharactersTruncator = (function () {
        function FixedNumberOfCharactersTruncator() {
        }
        FixedNumberOfCharactersTruncator.prototype.truncate = function (value, length, truncationString, truncateFrom) {
            if (typeof truncateFrom === "undefined") { truncateFrom = 1 /* Right */; }
            if (!value) {
                return null;
            }

            if (value.length === 0) {
                return value;
            }

            if (truncationString === null || truncationString.length > length) {
                return truncateFrom === 1 /* Right */ ? value.substr(0, length) : value.substr(value.length - length);
            }

            var alphaNumericalCharatersProcessed = 0;

            if (value.match(charRegex).length <= length) {
                return value;
            }

            var i;
            if (truncateFrom = 0 /* Left */) {
                for (i = value.length - 1; i > 0; i--) {
                    if (charRegex.test(value.charAt(i))) {
                        alphaNumericalCharatersProcessed++;
                    }
                    if (alphaNumericalCharatersProcessed + truncationString.length === length) {
                        return truncationString + value.substr(i);
                    }
                }
            }

            for (i = 0; i < value.length - truncationString.length; i++) {
                if (charRegex.test(value.charAt(i))) {
                    alphaNumericalCharatersProcessed++;
                }
                if (alphaNumericalCharatersProcessed + truncationString.length === length) {
                    return value.substr(0, i + 1) + truncationString;
                }
            }

            return value;
        };
        return FixedNumberOfCharactersTruncator;
    })();
    Humanizer.FixedNumberOfCharactersTruncator = FixedNumberOfCharactersTruncator;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var whiteSpaceTest = /\s/;
    var empty = /^\s*$/;

    function truncateFromRight(value, length, truncationString) {
        var lastCharactersWasWhiteSpace = true;
        var numberOfWordsProcessed = 0;
        for (var i = 0; i < value.length; i++) {
            if (whiteSpaceTest.test(value.charAt(i))) {
                if (!lastCharactersWasWhiteSpace) {
                    numberOfWordsProcessed++;
                }

                lastCharactersWasWhiteSpace = true;

                if (numberOfWordsProcessed === length) {
                    return value.substr(0, i) + truncationString;
                }
            } else {
                lastCharactersWasWhiteSpace = false;
            }
        }
        return value + truncationString;
    }

    function truncateFromLeft(value, length, truncationString) {
        var lastCharactersWasWhiteSpace = true;
        var numberOfWordsProcessed = 0;
        for (var i = value.length - 1; i > 0; i--) {
            if (whiteSpaceTest.test(value.charAt(i))) {
                if (!lastCharactersWasWhiteSpace) {
                    numberOfWordsProcessed++;
                }

                lastCharactersWasWhiteSpace = true;

                if (numberOfWordsProcessed === length) {
                    return truncationString + value.substr(i + 1).trim();
                }
            } else {
                lastCharactersWasWhiteSpace = false;
            }
        }
        return truncationString + value;
    }

    var FixedNumberOfWordsTruncator = (function () {
        function FixedNumberOfWordsTruncator() {
        }
        FixedNumberOfWordsTruncator.prototype.truncate = function (value, length, truncationString, truncateFrom) {
            if (typeof truncateFrom === "undefined") { truncateFrom = 1 /* Right */; }
            if (value === null) {
                return null;
            }

            if (value.length === 0) {
                return value;
            }

            var numberOfWords = 0;
            var words = value.split(whiteSpaceTest);

            for (var i = 0; i < words.length; i++) {
                if (!empty.test(words[i])) {
                    numberOfWords++;
                }
            }

            if (numberOfWords <= length) {
                return value;
            }

            return truncateFrom === 1 /* Right */ ? truncateFromRight(value, length, truncationString) : truncateFromLeft(value, length, truncationString);
        };
        return FixedNumberOfWordsTruncator;
    })();
    Humanizer.FixedNumberOfWordsTruncator = FixedNumberOfWordsTruncator;
})(Humanizer || (Humanizer = {}));
var Humanizer;
(function (Humanizer) {
    "use strict";

    var Truncator = (function () {
        function Truncator() {
        }
        Truncator.FixedLength = new Humanizer.FixedLengthTruncator();
        Truncator.FixedNumberOfCharacters = new Humanizer.FixedNumberOfCharactersTruncator();
        Truncator.FixedNumberOfWords = new Humanizer.FixedNumberOfWordsTruncator();
        return Truncator;
    })();
    Humanizer.Truncator = Truncator;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=humanizer.js.map
