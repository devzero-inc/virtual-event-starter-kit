const cl = require('@supabase/supabase-js');
require('dotenv').config({ path: './.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = cl.createClient(supabaseUrl, supabaseAnonKey);

async function insertSpeakers() {
    const speakers = [
        {
            "id": "84b9179e-218d-4a4d-adc4-e69272e6769b",
            "speaker_name": "Aaron",
            "position": "Network Engineer"
        },
        {
            "id": "32445e61-acc6-4c6e-9b2a-c4cf563e3543",
            "speaker_name": "Michael",
            "position": "Database Administrator"
        },
        {
            "id": "8a2ccff7-e4a5-4304-a05d-6b6c22754c99",
            "speaker_name": "Olive",
            "position": "IT Consultant"
        },
        {
            "id": "0cc67de5-c421-405c-8c9e-013c71efcab9",
            "speaker_name": "John",
            "position": "Software Engineer"
        },
        {
            "id": "5db645c6-acd4-4dde-8c84-1a4d14cd7cfb",
            "speaker_name": "Jamie",
            "position": "Data Analyst"
        },
        {
            "id": "36b08404-b9c8-4c8d-9adc-e9697c2447ca",
            "speaker_name": "Alex",
            "position": "Web Developer"
        },
        {
            "id": "775ef0f0-f3ff-40a0-9ae8-8e4bfcf5cfca",
            "speaker_name": "Ellum",
            "position": "Network Engineer"
        },
        {
            "id": "8985f5b4-9fcf-44c4-8d9a-66b0a4bd038f",
            "speaker_name": "William",
            "position": "Cybersecurity Analyst"
        },
    ];

    for (const speaker of speakers) {
        const { data, error } = await supabase
            .from('speakers')
            .insert([
                {
                    id: speaker.id,
                    speaker_name: speaker.speaker_name,
                    position: speaker.position,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]);

        if (error) {
            console.error('Error:', error);
            break;
        } 
    }
}

async function insertEvents() {
    const events = [
        {
            speaker_id: "84b9179e-218d-4a4d-adc4-e69272e6769b",
            event_title: "How to Create a Next.js App",
            event_timing: "4:00 PM - 6:00 PM",
            event_type: "Live Stage"
        },
        {
            speaker_id: "32445e61-acc6-4c6e-9b2a-c4cf563e3543",
            event_title: "How to Create a React.js App",
            event_timing: "4:00 PM - 6:00 PM",
            event_type: "Live Stage"
        },
        {
            speaker_id: "8a2ccff7-e4a5-4304-a05d-6b6c22754c99",
            event_title: "How to Create a CRUD application",
            event_timing: "7:00 PM - 8:00 PM",
            event_type: "Live Stage"
        },
        {
            speaker_id: "0cc67de5-c421-405c-8c9e-013c71efcab9",
            event_title: "How to Dockerize Your Applications",
            event_timing: "4:00 PM - 6:00 PM",
            event_type: "DevZero Stage"
        },
        {
            speaker_id: "5db645c6-acd4-4dde-8c84-1a4d14cd7cfb",
            event_title: "Mastering Kubernetes for DevOps",
            event_timing: "4:00 PM - 6:00 PM",
            event_type: "DevZero Stage"
        },
        {
            speaker_id: "36b08404-b9c8-4c8d-9adc-e9697c2447ca",
            event_title: "Introduction to Machine Learning",
            event_timing: "7:00 PM - 8:00 PM",
            event_type: "DevZero Stage"
        },
        {
            speaker_id: "775ef0f0-f3ff-40a0-9ae8-8e4bfcf5cfca",
            event_title: "Building RESTful APIs with Node.js",
            event_timing: "7:00 PM - 8:00 PM",
            event_type: "DevZero Stage"
        },
        {
            speaker_id: "8985f5b4-9fcf-44c4-8d9a-66b0a4bd038f",
            event_title: "Effective Agile Project Management",
            event_timing: "7:00 PM - 8:00 PM",
            event_type: "DevZero Stage"
        },
        {
            speaker_id: "8985f5b4-9fcf-44c4-8d9a-66b0a4bd038f",
            event_title: "Cloud Security Best Practices",
            event_timing: "9:00 PM - 10:00 PM",
            event_type: "DevZero Stage"
        },
        {
            speaker_id: "775ef0f0-f3ff-40a0-9ae8-8e4bfcf5cfca",
            event_title: "Using GraphQL with React.js",
            event_timing: "9:00 PM - 10:00 PM",
            event_type: "DevZero Stage"
        },
    ];

    for (const event of events) {
        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    speaker_id: event.speaker_id,
                    event_title: event.event_title,
                    event_timing: event.event_timing,
                    event_type: event.event_type,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]);

        if (error) {
            console.error('Error:', error);
            break;
        } 
    }
}


(async () => {
    try {
        await insertSpeakers();
        await insertEvents();
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error:', error);
    }
})();