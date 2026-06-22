import http from 'k6/http';

export const options = {
 stages: [
    { duration: '30s', target: 1000},
    { duration: '1m', target: 10000 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
 const res = http.post(
        "http://127.0.0.1/auth/signup/generateOtp",
        JSON.stringify({
            phone: "9876543210"
        }),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    console.log("Status:", res.status);
    console.log("Body:", res.body);
}