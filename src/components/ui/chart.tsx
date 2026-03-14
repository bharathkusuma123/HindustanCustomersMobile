// import * as React from "react";
// import * as RechartsPrimitive from "recharts";

// import { cn } from "@/lib/utils";

// // Format: { THEME_NAME: CSS_SELECTOR }
// const THEMES = { light: "", dark: ".dark" } as const;

// export type ChartConfig = {
//   [k in string]: {
//     label?: React.ReactNode;
//     icon?: React.ComponentType;
//   } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
// };

// type ChartContextProps = {
//   config: ChartConfig;
// };

// const ChartContext = React.createContext<ChartContextProps | null>(null);

// function useChart() {
//   const context = React.useContext(ChartContext);

//   if (!context) {
//     throw new Error("useChart must be used within a <ChartContainer />");
//   }

//   return context;
// }

// const ChartContainer = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div"> & {
//     config: ChartConfig;
//     children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
//   }
// >(({ id, className, children, config, ...props }, ref) => {
//   const uniqueId = React.useId();
//   const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

//   return (
//     <ChartContext.Provider value={{ config }}>
//       <div
//         data-chart={chartId}
//         ref={ref}
//         className={cn(
//           "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
//           className,
//         )}
//         {...props}
//       >
//         <ChartStyle id={chartId} config={config} />
//         <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
//       </div>
//     </ChartContext.Provider>
//   );
// });
// ChartContainer.displayName = "Chart";

// const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
//   const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);

//   if (!colorConfig.length) {
//     return null;
//   }

//   return (
//     <style
//       dangerouslySetInnerHTML={{
//         __html: Object.entries(THEMES)
//           .map(
//             ([theme, prefix]) => `
// ${prefix} [data-chart=${id}] {
// ${colorConfig
//   .map(([key, itemConfig]) => {
//     const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
//     return color ? `  --color-${key}: ${color};` : null;
//   })
//   .join("\n")}
// }
// `,
//           )
//           .join("\n"),
//       }}
//     />
//   );
// };

// const ChartTooltip = RechartsPrimitive.Tooltip;

// const ChartTooltipContent = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
//     React.ComponentProps<"div"> & {
//       hideLabel?: boolean;
//       hideIndicator?: boolean;
//       indicator?: "line" | "dot" | "dashed";
//       nameKey?: string;
//       labelKey?: string;
//     }
// >(
//   (
//     {
//       active,
//       payload,
//       className,
//       indicator = "dot",
//       hideLabel = false,
//       hideIndicator = false,
//       label,
//       labelFormatter,
//       labelClassName,
//       formatter,
//       color,
//       nameKey,
//       labelKey,
//     },
//     ref,
//   ) => {
//     const { config } = useChart();

//     const tooltipLabel = React.useMemo(() => {
//       if (hideLabel || !payload?.length) {
//         return null;
//       }

//       const [item] = payload;
//       const key = `${labelKey || item.dataKey || item.name || "value"}`;
//       const itemConfig = getPayloadConfigFromPayload(config, item, key);
//       const value =
//         !labelKey && typeof label === "string"
//           ? config[label as keyof typeof config]?.label || label
//           : itemConfig?.label;

//       if (labelFormatter) {
//         return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
//       }

//       if (!value) {
//         return null;
//       }

//       return <div className={cn("font-medium", labelClassName)}>{value}</div>;
//     }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

//     if (!active || !payload?.length) {
//       return null;
//     }

//     const nestLabel = payload.length === 1 && indicator !== "dot";

//     return (
//       <div
//         ref={ref}
//         className={cn(
//           "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
//           className,
//         )}
//       >
//         {!nestLabel ? tooltipLabel : null}
//         <div className="grid gap-1.5">
//           {payload.map((item, index) => {
//             const key = `${nameKey || item.name || item.dataKey || "value"}`;
//             const itemConfig = getPayloadConfigFromPayload(config, item, key);
//             const indicatorColor = color || item.payload.fill || item.color;

//             return (
//               <div
//                 key={item.dataKey}
//                 className={cn(
//                   "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
//                   indicator === "dot" && "items-center",
//                 )}
//               >
//                 {formatter && item?.value !== undefined && item.name ? (
//                   formatter(item.value, item.name, item, index, item.payload)
//                 ) : (
//                   <>
//                     {itemConfig?.icon ? (
//                       <itemConfig.icon />
//                     ) : (
//                       !hideIndicator && (
//                         <div
//                           className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
//                             "h-2.5 w-2.5": indicator === "dot",
//                             "w-1": indicator === "line",
//                             "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
//                             "my-0.5": nestLabel && indicator === "dashed",
//                           })}
//                           style={
//                             {
//                               "--color-bg": indicatorColor,
//                               "--color-border": indicatorColor,
//                             } as React.CSSProperties
//                           }
//                         />
//                       )
//                     )}
//                     <div
//                       className={cn(
//                         "flex flex-1 justify-between leading-none",
//                         nestLabel ? "items-end" : "items-center",
//                       )}
//                     >
//                       <div className="grid gap-1.5">
//                         {nestLabel ? tooltipLabel : null}
//                         <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
//                       </div>
//                       {item.value && (
//                         <span className="font-mono font-medium tabular-nums text-foreground">
//                           {item.value.toLocaleString()}
//                         </span>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   },
// );
// ChartTooltipContent.displayName = "ChartTooltip";

// const ChartLegend = RechartsPrimitive.Legend;

// const ChartLegendContent = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<"div"> &
//     Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
//       hideIcon?: boolean;
//       nameKey?: string;
//     }
// >(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
//   const { config } = useChart();

//   if (!payload?.length) {
//     return null;
//   }

//   return (
//     <div
//       ref={ref}
//       className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
//     >
//       {payload.map((item) => {
//         const key = `${nameKey || item.dataKey || "value"}`;
//         const itemConfig = getPayloadConfigFromPayload(config, item, key);

//         return (
//           <div
//             key={item.value}
//             className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
//           >
//             {itemConfig?.icon && !hideIcon ? (
//               <itemConfig.icon />
//             ) : (
//               <div
//                 className="h-2 w-2 shrink-0 rounded-[2px]"
//                 style={{
//                   backgroundColor: item.color,
//                 }}
//               />
//             )}
//             {itemConfig?.label}
//           </div>
//         );
//       })}
//     </div>
//   );
// });
// ChartLegendContent.displayName = "ChartLegend";

// // Helper to extract item config from a payload.
// function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
//   if (typeof payload !== "object" || payload === null) {
//     return undefined;
//   }

//   const payloadPayload =
//     "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
//       ? payload.payload
//       : undefined;

//   let configLabelKey: string = key;

//   if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
//     configLabelKey = payload[key as keyof typeof payload] as string;
//   } else if (
//     payloadPayload &&
//     key in payloadPayload &&
//     typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
//   ) {
//     configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
//   }

//   return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
// }

// export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };






import * as React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart, BarChart, PieChart, ProgressChart } from "react-native-chart-kit";
import { Svg, Circle, Rect, G, Path } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Types
export interface ChartConfig {
  [key: string]: {
    label?: string;
    icon?: React.ComponentType<any>;
    color?: string;
    theme?: {
      light: string;
      dark: string;
    };
  };
}

interface ChartContextProps {
  config: ChartConfig;
}

interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
  style?: any;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  children?: React.ReactNode;
}

interface ChartLegendProps {
  payload?: any[];
  verticalAlign?: "top" | "bottom";
  hideIcon?: boolean;
  nameKey?: string;
}

// Chart Context
const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

// Main Chart Container
export const ChartContainer = ({ config, children, style }: ChartContainerProps) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <View style={[styles.container, style]}>
        {children}
      </View>
    </ChartContext.Provider>
  );
};

// Chart Types
export const Chart = {
  Line: ({ data, width = SCREEN_WIDTH - 32, height = 220, ...props }: any) => (
    <LineChart
      data={data}
      width={width}
      height={height}
      chartConfig={props.chartConfig || defaultChartConfig}
      bezier
      style={styles.chart}
      {...props}
    />
  ),
  
  Bar: ({ data, width = SCREEN_WIDTH - 32, height = 220, ...props }: any) => (
    <BarChart
      data={data}
      width={width}
      height={height}
      chartConfig={props.chartConfig || defaultChartConfig}
      style={styles.chart}
      {...props}
    />
  ),
  
  Pie: ({ data, width = SCREEN_WIDTH - 32, height = 220, ...props }: any) => (
    <PieChart
      data={data}
      width={width}
      height={height}
      chartConfig={props.chartConfig || defaultChartConfig}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      style={styles.chart}
      {...props}
    />
  ),
  
  Progress: ({ data, width = SCREEN_WIDTH - 32, height = 220, ...props }: any) => (
    <ProgressChart
      data={data}
      width={width}
      height={height}
      chartConfig={props.chartConfig || defaultChartConfig}
      style={styles.chart}
      {...props}
    />
  ),
};

// Default chart configuration
const defaultChartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(43, 107, 63, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#2B6B3F",
  },
};

// Chart Tooltip
export const ChartTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <View style={styles.tooltip}>
      <Text style={styles.tooltipLabel}>{label}</Text>
      {payload.map((item, index) => (
        <View key={index} style={styles.tooltipItem}>
          <View style={[styles.tooltipDot, { backgroundColor: item.color || '#2B6B3F' }]} />
          <Text style={styles.tooltipValue}>
            {item.name}: {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
};

export const ChartTooltipContent = ChartTooltip;

// Chart Legend
export const ChartLegend = ({ payload, verticalAlign = "bottom", hideIcon = false, nameKey }: ChartLegendProps) => {
  const { config } = useChart();

  if (!payload || !payload.length) {
    return null;
  }

  return (
    <View style={[
      styles.legendContainer,
      verticalAlign === "top" ? styles.legendTop : styles.legendBottom
    ]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.legendContent}>
          {payload.map((item, index) => {
            const key = nameKey ? item[nameKey as keyof typeof item] : item.dataKey || "value";
            const itemConfig = config[key as string];

            return (
              <View key={index} style={styles.legendItem}>
                {!hideIcon && (
                  <View style={[styles.legendIcon, { backgroundColor: item.color || '#2B6B3F' }]} />
                )}
                <Text style={styles.legendText}>
                  {itemConfig?.label || item.name || item.value}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export const ChartLegendContent = ChartLegend;

// Helper component for chart style (replaces the web version's style injection)
export const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  // In React Native, we handle styling through StyleSheet
  // This component doesn't need to render anything
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 12,
    borderRadius: 8,
    position: 'absolute',
    zIndex: 1000,
  },
  tooltipLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 14,
  },
  tooltipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tooltipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  tooltipValue: {
    color: '#fff',
    fontSize: 12,
  },
  legendContainer: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  legendTop: {
    marginBottom: 16,
  },
  legendBottom: {
    marginTop: 16,
  },
  legendContent: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});

// Export types
export type { ChartConfig };