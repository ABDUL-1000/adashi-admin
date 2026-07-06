export interface ChartDatum {
  name?: string;
  label?: string;
  month?: string;
  value?: number;
  count?: number;
  amount?: number;
}

export interface AdminAnalytics {
  activeOrganizers?: ChartDatum[];
  mostActiveOrganizers?: ChartDatum[];
  popularContributionSizes?: ChartDatum[];
  averageGroupSizes?: ChartDatum[];
  averageGroupSize?: number;
  transactionVolumes?: ChartDatum[];
  monthlyTransactionVolume?: ChartDatum[];
}
