"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Country {
  countryCode: string;
  name: string;
}

const TableList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://date.nager.at/api/v3/AvailableCountries",
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
        setCountries(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleClick = (countryCode: string) => {
    router.push(`/${countryCode}`);
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="relative overflow-x-auto px-8 py-8 md:px-16 lg:px-32 xl:px-64">
      <table className="w-full text-sm text-center rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Code
            </th>
            <th scope="col" className="px-6 py-3">
              Country Name
            </th>
          </tr>
        </thead>

        <tbody>
          {countries.map((country) => (
            <tr
              key={country.countryCode}
              className="cursor-pointer bg-white border-b hover:bg-blue-50 "
              onClick={() => handleClick(country.countryCode)}
            >
              <td className="px-6 py-4">{country.countryCode}</td>
              <td className="px-6 py-4">{country.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
