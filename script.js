// 1. Setup - Only declare these ONCE
const SUPABASE_URL = 'https://lhoywrhaxktegachfjfw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxob3l3cmhheGt0ZWdhY2hmamZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTYxNzUsImV4cCI6MjA4ODMzMjE3NX0.Q_cKNnUZDlSqL0ISM2p2trYEcMBrnZqcQM2Zol5fAuw';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY); 

// 2. Search Function
async function checkBuilding() {
    const address = document.getElementById('addressSearch').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "Searching...";

    // Search the 'reviews' table for this address
    const { data, error } = await _supabase
        .from('reviews')
        .select('*')
        .ilike('address', `%${address}%`);

    if (error) {
        resultsDiv.innerHTML = "Error fetching data.";
        return;
    }

    if (data.length === 0) {
        resultsDiv.innerHTML = "No reviews found for this address.";
    } else {
        resultsDiv.innerHTML = data.map(rev => `
            <div style="border:1px solid #ccc; padding:10px; margin:5px;">
                <strong>Rating: ${rev.rating}/5</strong><br>
                ${rev.comment}
            </div>
        `).join('');
    }
}

// 3. Submit Function
async function submitReview() {
    const address = document.getElementById('revAddress').value;
    const landlord = document.getElementById('revLandlord').value;
    const rating = document.getElementById('revRating').value;
    const comment = document.getElementById('revComment').value;

    const { error } = await _supabase
        .from('reviews')
        .insert([{ 
            address: address, 
            landlord_name: landlord, 
            rating: parseInt(rating), 
            comment: comment 
        }]);

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Review posted successfully!");
        location.reload(); // Refresh to show new data
    }
}