import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const exportData = () => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const data1: Record<any, any>[] = [];

  const data2: Record<any, any>[] = [];

  const wsPrimaryCameras = XLSX.utils.json_to_sheet(data1);
  const wsSecondaryCameras = XLSX.utils.json_to_sheet(data2);

  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    wb,
    wsPrimaryCameras,
    "არჩეული კამერა (კამერები)"
  );
  XLSX.utils.book_append_sheet(wb, wsSecondaryCameras, "სხვა კამერები");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });

  FileSaver.saveAs(data, `fileName` + fileExtension);
};
