"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const [countryName, setCountryName] = useState<string>("");
  const [chartData, setChartData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const pathname = window.location.pathname;
    const code = pathname.split("/")[1];

    const fetchIso3 = async () => {
      try {
        if (!code) {
          throw new Error("Country code not found");
        }

        const response = await fetch(
          `https://date.nager.at/api/v3/CountryInfo/${code}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setCountryName(data.commonName);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIso3();
  }, []);

  useEffect(() => {
    if (!countryName) return;

    const getChartData = async () => {
      try {
        const response = await fetch(
          `https://countriesnow.space/api/v0.1/countries/population`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: countryName,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        const population = data.data.populationCounts;
        setChartData(population);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getChartData();
  }, [countryName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatYAxis = (tickItem: number) => {
    return `${(tickItem / 1000000).toFixed(1)}M`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="year" />
        <YAxis tickFormatter={formatYAxis} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
