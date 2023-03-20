import dotenv from 'dotenv'
dotenv.config()
import Airtable from 'airtable';
var base = new Airtable({apiKey:process.env.AIRTABLE_TOKEN}).base(process.env.AIRTABLE_BASE);

export const updateTable = async (req, res) => {
    try {
        let resultdata=[]
        let updateList=[]
        const { fields } = req.body;
        fields.forEach((element)=>{
            updateList.push(
            {
                "id":element["id"],
                "fields":{
                    "FirstName":element["FirstName"],
                    "LastName":element["LastName"],
                    "Status":element["Status"]
                }
            })
        })
        base('Table1').update(updateList, function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
                resultdata.push(record.getId())
            });
            res.status(200).json({ success: true, message: resultdata })
          })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};