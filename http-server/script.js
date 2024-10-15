document.addEventListener('DOMContentLoaded', () => {
    const email = document.getElementById('email');
    const submit = document.getElementById('submit');
    const userform = document.getElementById('user-form');
    const dob = document.getElementById('dob');

    if (!email || !submit || !userform || !dob) {
        console.error("One or more form elements are missing in the DOM.");
        return;
    }

    // Email validation logic
    email.addEventListener('input', () => {
        validate(email);
    });

    let validate = (element) => {
        if (element.validity.typeMismatch) {
            element.setCustomValidity("Please enter a valid email address");
            element.reportValidity();
        } else {
            element.setCustomValidity('');
            element.reportValidity();
        }
    };

    // Date of birth validation logic
    const minDate = new Date(
        new Date().getFullYear() - 55,
        new Date().getMonth(),
        new Date().getDate()
    );
    const maxDate = new Date(
        new Date().getFullYear() - 18,
        new Date().getMonth(),
        new Date().getDate()
    );

    let formatDate = (date) => {
        let d = date.getDate();
        let m = date.getMonth() + 1; // Months are 0-indexed
        let y = date.getFullYear();
        if (d < 10) {
            d = '0' + d;
        }
        if (m < 10) {
            m = '0' + m;
        }
        return `${y}-${m}-${d}`;
    };

    let isDateValid = (dateString) => {
        let enteredDate = new Date(dateString);
        return enteredDate >= minDate && enteredDate <= maxDate;
    };

    dob.setAttribute('min', formatDate(minDate));
    dob.setAttribute('max', formatDate(maxDate));

    dob.addEventListener('input', () => {
        if (!isDateValid(dob.value)) {
            dob.setCustomValidity(`Date of birth must be between ${formatDate(minDate)} and ${formatDate(maxDate)}`);
            dob.reportValidity();
        } else {
            dob.setCustomValidity('');
            dob.reportValidity();
        }
    });

    // Retrieve user entries from localStorage
    const retrieveEntries = () => {
        let entries = localStorage.getItem('userEntries');
        return entries ? JSON.parse(entries) : [];
    };

    let userEntries = retrieveEntries();

    // Display user entries in a table
    const displayEntries = () => {
        const entries = retrieveEntries();
        if (!entries.length) {
            document.getElementById('entries').innerHTML = "<p>No entries found.</p>";
            return;
        }
        const tableEntries = entries.map((entry) => {
            const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
            const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
            const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
            const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
            const termsCell = `<td class='border px-4 py-2'>${entry.terms ? 'Accepted' : 'Not Accepted'}</td>`;
            const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${termsCell}</tr>`;
            return row;
        }).join('\n');

        const table = `
            <table class='table-auto w-full'>
                <thead>
                    <tr>
                        <th class='px-4 py-2'>Name</th>
                        <th class='px-4 py-2'>Email</th>
                        <th class='px-4 py-2'>Password</th>
                        <th class='px-4 py-2'>Date of Birth</th>
                        <th class='px-4 py-2'>Terms</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableEntries}
                </tbody>
            </table>
        `;
        document.getElementById('entries').innerHTML = table;
    };

    // Handle form submission and save entries to localStorage
    const handleFormSubmit = (event) => {
        event.preventDefault();
        let name = document.getElementById('name').value.trim();
        let emailValue = document.getElementById('email').value.trim();
        let dobValue = document.getElementById('dob').value;
        let password = document.getElementById('password').value;
        let terms = document.getElementById('terms').checked;

        if (!name || !emailValue || !dobValue || !password || !terms) {
            alert("Please fill out all required fields.");
            return;
        }

        const userdata = { name, email: emailValue, dob: dobValue, password, terms };
        userEntries.push(userdata);
        localStorage.setItem('userEntries', JSON.stringify(userEntries));

        // Optionally, reset the form
        userform.reset();

        displayEntries();
    };

    // Attach the form submit event listener
    userform.addEventListener('submit', handleFormSubmit);

    // Display existing entries on page load
    displayEntries();
});