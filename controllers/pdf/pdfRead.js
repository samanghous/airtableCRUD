import pdf from 'pdf-parse';
import fs from 'fs';

export const pdfRead = async (req, res) => {
    try{
        let pdfBuffer = await fs.promises.readFile('./files/pdfTask1.pdf');

        let result = await pdf(pdfBuffer);
        result = result.text.split('\n');


        let dataStartIntdex;

        // identify starting index of your table
        for(let i = 0; i < result.length; i++) {
            // get current row
            let currentRow = result[i];
            if(currentRow.toLowerCase().startsWith('name')) {
                dataStartIntdex = i+1;
            }
        }

        let employeeList = [];

        for(let i = dataStartIntdex; i < result.length; i++) {
            let currentRow = result[i].trim();

            currentRow = currentRow.split(' ');
            let name, designation, joiningDate, activeProjects;
            designation="";

            name = currentRow[0];
            for(let j=1;j<=currentRow.length-3;j++){
                designation=designation+currentRow[j];
                if(j<currentRow.length-3){
                    designation=designation+" ";
                }
            }
            joiningDate = currentRow[currentRow.length-2];
            activeProjects = currentRow[currentRow.length-1];

            employeeList.push({
                name,
                designation,
                joiningDate,
                activeProjects
            });
        }
    


        res.status(200).json({ success: true, message: "Data extracted" , data:employeeList})
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};