import dotenv from 'dotenv'
dotenv.config()
import Airtable from 'airtable';
var base = new Airtable({apiKey:process.env.AIRTABLE_TOKEN}).base(process.env.AIRTABLE_BASE);

export const getTable = async (req, res) => {
    try {

        let result={"FirstName":[],"Status":[]}
        base('Table1').select({
            maxRecords: 3,
            view: "Grid view",
            returnFieldsByFieldId:true,
            fields: ["FirstName", "Status"],
            filterByFormula: "NOT({FirstName} = '')",
            sort: [{field: "FirstName", direction: "asc"}]
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function(record) {
                result["FirstName"].push(record.fields["fldYbOGK2h5b8qD2Q"])  
                result["Status"].push(record.fields["fldj5YxA14fnBHw7h"])  
            });
            fetchNextPage();
        }, function done(err) {
            if (err) { 
                console.error(err); 
                res.status(400).json({ success: false});
                return; 
            }
            else{
                res.status(200).json({ success: true, data:result});
            }
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};