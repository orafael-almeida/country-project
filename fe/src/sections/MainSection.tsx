import SectionTitle from "@/components/SectionTitle";
import TableList from "@/components/TableList";

const MainSection = () => {
  return (
    <div className="h-screen py-32">
      <SectionTitle
        title="Country List"
        description="Complete list of countries. Click to open additional informations"
      />
      <TableList />
    </div>
  );
};

export default MainSection;
