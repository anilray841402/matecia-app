import User from "../../models/user.model.js";
import nodemailer from 'nodemailer';

const emailExhibitors = async (req, res) => {
    const exhibitorId = req.params.id;
    let email;
    let password;
    let contactPerson;

    if (!exhibitorId) {
        return res.status(400).json({
            success: false,
            message: "Invalid Exhibitor ID",
        });
    }

    try {
        const exhibitors = await User.aggregate([
            {
                $match: { role: 'user' } 
            },
            {
                $lookup: {
                    from: 'exhibitordetails',     
                    localField: '_id',              
                    foreignField: 'userId',    
                    as: 'details'            
                }
            },
            {
                $unwind: {
                    path: '$details',
                    preserveNullAndEmptyArrays: true
                }
            },
        ]);

        exhibitors.forEach(ex => {
            email = ex.email;
            password = ex.textPassword;
            contactPerson = ex.details?.contactPerson;
        });

        if (email) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Your Login Credentials for Matecia Exhibitors Portal',
                html: `
                    <p style="color: #000; font-size: 22px; font-weight:500;">Dear ${contactPerson},</p>
                    <p style="color: #000;font-size: 20px;font-weight: 500; margin: 10px 0px 0px 0px;">Please find your login credentials for MATECIA Exhibitor Panel.</strong>.</p>
                  <p style="color: #000;font-size: 20px;font-weight: 500; margin: 10px 0px 40px 0px;">
                    <strong>Login link:</strong> <a href="https://www.matecia.com/exhibitors-panel" target="_blank">https://www.matecia.com/exhibitors-panel</a><br/>
                    <strong>Email/User Id:</strong> ${email}<br/>
                    <strong>Password:</strong> ${password}
                   </p>

                    <p style="font-size:16px;"><span style="font-style:italic; font-weight:bold; margin-top:40px; display:block; color:#333;">Thanks & Regards,<br/>MATECIA Building Material Exhibition<br/>Call: +91 8178655044</span></p>
                     `
            };

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log(`📧 Email sent to ${email}:`, info.response);

            } catch (err) {
                const errorMsg = err.message.toLowerCase();
                if (errorMsg.includes('421') || errorMsg.includes('450') || errorMsg.includes('550')) {
                    console.error(`⚠️ Gmail throttling or bounce detected for ${email}:`, err.message);
                } else {
                    console.error(`❌ Email failed to ${email}:`, err.message);
                }

            }
        }
        res.status(200).json({
            success: true,
            message: "Mail Sent Sucessfully"
        });
    } catch (err) {
        res.json({
            success: false,
            message: "Email not sent",
            error: err
        });
     }
};

export default emailExhibitors;
