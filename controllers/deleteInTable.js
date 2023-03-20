import dotenv from 'dotenv'
dotenv.config()
import Airtable from 'airtable';
var base = new Airtable({apiKey:process.env.AIRTABLE_TOKEN}).base(process.env.AIRTABLE_BASE);

export const deleteInTable = async (req, res) => {
    try {
        let deleteList=[]
        const { fields } = req.body;
        fields.forEach((element)=>{
            deleteList.push(element["id"])
        })
        base('Table1').destroy(deleteList, function(err, records) {
            if (err) {
                res.status(500).json({ success: false })
                console.error(err);
                return;
            }
            res.status(200).json({ success: true, data: records })
          })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};