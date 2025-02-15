import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PrimaryButton from "../../globals/PirmaryButton";

const Invoice = ({ store }) => {
  if (!store?.address) return null;
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    const lineHeight = 7;

    const currentDate = new Date(store.createdAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const img = new Image();
    img.src = "/coderoadIcon.jpeg";

    img.onload = function () {
      // Header Section
      doc.addImage(img, "JPEG", margin, 10, 30, 30);
      doc
        .setFont("helvetica", "bold")
        .setFontSize(20)
        .text("CodeRoad Softwares", 50, 25);

      doc
        .setFontSize(16)
        .setTextColor(40)
        .text("INVOICE", pageWidth - margin, 25, { align: "right" });

      // Metadata Section
      autoTable(doc, {
        startY: 45,
        margin: { left: margin, right: margin },
        body: [
          ["Invoice Date", currentDate],
          ["Invoice Number", `CR-${store.createdAt.toString().slice(-6)}`],
        ],
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 2,
          lineColor: 200,
          lineWidth: 0.25,
        },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 40 },
          1: { cellWidth: 60 },
        },
      });

      // Company/Client Information
      autoTable(doc, {
        startY: 75,
        margin: { left: margin, right: margin },
        columnStyles: {
          0: { cellWidth: 85 },
          1: { cellWidth: 85 },
        },
        body: [
          [
            { content: "Bill To:", styles: { fontStyle: "bold" } },
            { content: "From:", styles: { fontStyle: "bold" } },
          ],
          [
            [
              store.name,
              `Attn: ${store.contactName}`,
              store.address.addressLine1,
              `${store.address.locality}, ${store.address.state}`,
              `India - ${store.address.pincode}`,
              `${store.email}`,
              `${store.phone}`,
            ].join("\n"),
            [
              "CodeRoad Softwares",
              "GULSHAN NAGAR Srinagar Bypass Road",
              "Nowgam, 190015",
              "Srinagar, India",
              "coderoadsoftwares@gmail.com",
              "+91 116 931 3784",
              "www.coderoad.in",
            ].join("\n"),
          ],
        ],
        styles: {
          fontSize: 10,
          lineColor: 200,
          lineWidth: 0.25,
          cellPadding: { top: 3, right: 2, bottom: 3, left: 2 },
        },
        didParseCell: (data) => {
          if (data.section === "body" && data.row.index === 0) {
            data.cell.styles.fillColor = 240;
          }
        },
      });

      // Items Table
      autoTable(doc, {
        startY: 130,
        margin: { left: margin, right: margin },
        head: [["Description", "Qty", "Unit Price", "Tax", "Total"]],
        body: [
          ["MediFlux - Hospital Management System", "1", 3500, "0%", 3500],
        ],
        headStyles: {
          fillColor: 240,
          textColor: 40,
          fontSize: 10,
          cellPadding: 3,
        },
        bodyStyles: {
          textColor: 40,
          fontSize: 10,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { halign: "center", cellWidth: 20 },
          2: { halign: "right", cellWidth: 30 },
          3: { halign: "right", cellWidth: 20 },
          4: { halign: "right", cellWidth: 30 },
        },
      });

      // Totals Table
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        margin: { left: margin, right: margin },
        body: [
          ["Subtotal:", 3500],
          ["Tax (0%):", "₹0"],
          [
            { content: "Total Amount:", styles: { fontStyle: "bold" } },
            { content: 3500, styles: { fontStyle: "bold" } },
          ],
        ],
        columnStyles: {
          0: { halign: "right", cellWidth: 140 },
          1: { halign: "right", cellWidth: 30 },
        },
        styles: {
          fontSize: 10,
          cellPadding: 3,
          lineColor: 200,
          lineWidth: 0.25,
        },
        theme: "grid",
      });

      // Footer Note
      doc
        .setFontSize(8)
        .setTextColor(100)
        .text(
          "Thank you for choosing CodeRoad Softwares!",
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 15,
          { align: "center" }
        );

      doc.save(
        `${store.name.replace(/ /g, "_")}_Invoice_${currentDate.replace(
          / /g,
          "-"
        )}.pdf`
      );
    };
  };

  return (
    <PrimaryButton
      label="Download Invoice"
      filled={false}
      fullWidth={true}
      customClasses="mt-4"
      iconType="download"
      onClick={generatePDF}
    />
  );
};

export default Invoice;
