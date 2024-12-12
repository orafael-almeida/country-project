"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Chart from "./Chart";

interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders:
    | [
        {
          commonName: string;
          countryCode: string;
        }
      ]
    | null;
}

const CountryCard = () => {
  const [countryInfos, setCountryInfos] = useState<CountryInfo>();
  const [flagUrl, setFlagUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const pathname = window.location.pathname;
    const code = pathname.split("/")[1];

    const fetchCountry = async () => {
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

        const infos = await response.json();
        setCountryInfos(infos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCountryFlag = async () => {
      try {
        const response = await fetch(
          `https://countriesnow.space/api/v0.1/countries/flag/images`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              iso2: code,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setFlagUrl(data.data.flag);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryFlag();
    fetchCountry();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-slate-100 h-auto w-[90%] sm:w-[80%] lg:w-[60%] shadow-xl mt-8 p-4 mx-auto">
      <div className="flex flex-col sm:flex-row justify-around">
        <div className="h-[100px] w-[150px] sm:max-w-[300px] sm:max-h-[450px]">
          {flagUrl && (
            <Image
              src={flagUrl}
              alt="Country Flag"
              layout="responsive"
              width={300}
              height={450}
              className="object-contain"
            />
          )}
        </div>
        <div className="flex flex-col w-full items-start pt-4 sm:px-10">
          <p className="text-3xl font-bold">{countryInfos?.commonName}</p>
          <p className="font-bold">
            Official name:{" "}
            <span className="font-normal">{countryInfos?.officialName}</span>
          </p>
          <div className="py-2">
            <div className="flex flex-col">
              <p className="font-bold">
                Country Code:{" "}
                <span className="font-normal">{countryInfos?.countryCode}</span>
              </p>
              <p className="font-bold">
                Region:{" "}
                <span className="font-normal">{countryInfos?.region}</span>
              </p>
            </div>
            <p className="text-justify font-bold">
              Borders:{" "}
              {countryInfos?.borders?.map((border, index) => (
                <span key={border.countryCode} className="font-normal">
                  {border.commonName}
                  {index === (countryInfos.borders?.length ?? 0) - 1
                    ? "."
                    : ", "}
                </span>
              ))}
            </p>
            <p className="font-bold">
              Borders Count:{" "}
              <span className="font-normal">
                {countryInfos?.borders ? countryInfos.borders.length - 1 : 0}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col justify-center items-center py-10">
        <h3 className="text-3xl py-8">Population</h3>
        <Chart />
      </div>
    </div>
  );
};

export default CountryCard;
