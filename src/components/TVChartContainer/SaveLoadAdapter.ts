import type {
  ChartData,
  ChartMetaInfo,
  ChartTemplate,
  IExternalSaveLoadAdapter,
  LineToolsAndGroupsState,
  StudyTemplateMetaInfo,
} from "charting_library";

type ChartDataInfo = ChartData & {
  appVersion?: number;
};

export class SaveLoadAdapter implements IExternalSaveLoadAdapter {
  private charts: ChartDataInfo[] | undefined;
  private setTvCharts: (a: ChartDataInfo[]) => void;
  private currentAppVersion: number;

  constructor(
    charts: ChartDataInfo[] | undefined,
    setTvCharts: (a: ChartDataInfo[]) => void,
    currentAppVersion: number
  ) {
    this.charts = charts;
    this.setTvCharts = setTvCharts;
    this.currentAppVersion = currentAppVersion;
  }

  getAllCharts(): Promise<ChartMetaInfo[]> {
    const charts = this.charts || [];
    const filteredCharts = charts.filter((chart) => {
      if (!chart.id) {
        return false;
      }

      if (!chart.appVersion) {
        chart.appVersion = 1;
      }

      return chart.appVersion === this.currentAppVersion;
    }) as ChartMetaInfo[];

    return Promise.resolve(filteredCharts);
  }

  removeChart(id: string) {
    if (!this.charts) return Promise.reject();

    this.charts = this.charts.filter((chart) => chart.id !== id);
    this.setTvCharts(this.charts);

    return Promise.resolve();
  }

  saveChart(chartData) {
    if (!chartData.id) {
      chartData.id = `gmx-chart-v${this.currentAppVersion}`;
    }

    if (!chartData.appVersion) {
      chartData.appVersion = this.currentAppVersion;
    }

    if (this.charts) {
      this.charts = this.charts.filter((chart) => chart.id !== chartData.id);
      this.charts.push(chartData);

      this.setTvCharts(this.charts);
    }

    return Promise.resolve(chartData.id);
  }

  getChartContent(id: string) {
    if (!this.charts) return Promise.reject();
    for (let i = 0; i < this.charts.length; ++i) {
      if (this.charts[i].id === id) {
        const { content } = this.charts[i];

        return Promise.resolve(content);
      }
    }
    return Promise.reject();
  }

  // Dummy implementations to satisfy the interface

  getAllStudyTemplates(): Promise<StudyTemplateMetaInfo[]> {
    return Promise.resolve([]);
  }
  removeStudyTemplate(): Promise<void> {
    return Promise.resolve();
  }
  saveStudyTemplate(): Promise<void> {
    return Promise.resolve();
  }
  getStudyTemplateContent(): Promise<string> {
    return Promise.resolve("");
  }
  getDrawingTemplates(): Promise<string[]> {
    return Promise.resolve([]);
  }
  loadDrawingTemplate(): Promise<string> {
    return Promise.resolve("");
  }
  removeDrawingTemplate(): Promise<void> {
    return Promise.resolve();
  }
  saveDrawingTemplate(): Promise<void> {
    return Promise.resolve();
  }
  getChartTemplateContent(): Promise<ChartTemplate> {
    return Promise.resolve({});
  }
  getAllChartTemplates(): Promise<string[]> {
    return Promise.resolve([]);
  }
  saveChartTemplate(): Promise<void> {
    return Promise.resolve();
  }
  removeChartTemplate(): Promise<void> {
    return Promise.resolve();
  }
  saveLineToolsAndGroups(): Promise<void> {
    return Promise.resolve();
  }
  loadLineToolsAndGroups(): Promise<Partial<LineToolsAndGroupsState> | null> {
    return Promise.resolve(null);
  }
}
