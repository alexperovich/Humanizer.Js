﻿module Humanizer.Configuration.Configurator
{
    "use strict";

    var formatter: LocaliserRegistry<Localisation.Formatter.IFormatter> = new FormatterRegistry();
    var ordinalizers: LocaliserRegistry<Localisation.Ordinalizers.IOrdinalizer> = new OrdinalizerRegistry();

    export function getFormatter(culture: string): Localisation.Formatter.IFormatter
    {
        return formatter.resolveForCulture(culture);
    }

    export function getOrdinalizer(): Localisation.Ordinalizers.IOrdinalizer
    {
        return ordinalizers.resolveForCulture(Resources.getCurrentCulture());
    }
} 