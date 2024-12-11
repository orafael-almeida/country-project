import SectionTitle from "@/components/SectionTitle";
import TableList from "@/components/TableList";

const MainSection = () => {
  return (
    <div className="h-screen py-32">
      <SectionTitle
        title="Country List"
        description="Complete list of coutnries and additional informations"
      />
      <TableList />
    </div>
  );
};

export default MainSection;
