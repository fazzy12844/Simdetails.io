document.addEventListener('DOMContentLoaded', function() {
    const simNumberInput = document.getElementById('simNumber');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultContent = document.getElementById('resultContent');

    // Sample database of SIM information (in a real app, this would come from an API)
    const simDatabase = {
        '03001234567': {
            number: '03001234567',
            network: 'Jazz (Mobilink)',
            owner: 'Ali Ahmed',
            cnic: '42201-1234567-8',
            registrationDate: '15/03/2020',
            status: 'Active',
            location: 'Lahore, Punjab'
        },
        '03111234567': {
            number: '03111234567',
            network: 'Zong',
            owner: 'Fatima Khan',
            cnic: '35202-9876543-1',
            registrationDate: '22/07/2021',
            status: 'Active',
            location: 'Karachi, Sindh'
        },
        '03311234567': {
            number: '03311234567',
            network: 'Ufone',
            owner: 'Bilal Hassan',
            cnic: '36401-4567892-3',
            registrationDate: '05/11/2019',
            status: 'Blocked',
            location: 'Islamabad'
        },
        '03411234567': {
            number: '03411234567',
            network: 'Telenor',
            owner: 'Sara Malik',
            cnic: '33303-6543210-9',
            registrationDate: '30/09/2022',
            status: 'Active',
            location: 'Peshawar, KPK'
        }
    };

    // Function to determine network based on prefix
    function getNetworkByNumber(number) {
        const prefix = number.substring(0, 4);
        
        if (prefix >= '0300' && prefix <= '0307') return 'Jazz (Mobilink)';
        if (prefix >= '0311' && prefix <= '0317') return 'Zong';
        if (prefix >= '0331' && prefix <= '0337') return 'Ufone';
        if (prefix >= '0341' && prefix <= '0347') return 'Telenor';
        
        return 'Unknown Network';
    }

    // Function to display results
    function displayResults(simInfo) {
        resultContent.innerHTML = `
            <div class="sim-detail">
                <span class="label">Phone Number:</span>
                <span class="value">${simInfo.number}</span>
            </div>
            <div class="sim-detail">
                <span class="label">Network:</span>
                <span class="value">${simInfo.network}</span>
            </div>
            <div class="sim-detail">
                <span class="label">Owner Name:</span>
                <span class="value">${simInfo.owner}</span>
            </div>
            <div class="sim-detail">
                <span class="label">CNIC:</span>
                <span class="value">${simInfo.cnic}</span>
            </div>
            <div class="sim-detail">
                <span class="label">Registration Date:</span>
                <span class="value">${simInfo.registrationDate}</span>
            </div>
            <div class="sim-detail">
                <span class="label">Status:</span>
                <span class="value">${simInfo.status}</span>
            </div>
            <div class="sim-detail">
                <span class="label">Location:</span>
                <span class="value">${simInfo.location}</span>
            </div>
        `;
        
        resultContainer.style.display = 'block';
    }

    // Search button click handler
    searchBtn.addEventListener('click', function() {
        const simNumber = simNumberInput.value.trim();
        
        // Validate input
        if (!simNumber) {
            alert('Please enter a SIM number');
            return;
        }
        
        if (!/^\d{11}$/.test(simNumber)) {
            alert('Please enter a valid 11-digit SIM number');
            return;
        }
        
        // Check if number exists in database
        if (simDatabase[simNumber]) {
            displayResults(simDatabase[simNumber]);
        } else {
            // For numbers not in our sample database, show basic info
            const network = getNetworkByNumber(simNumber);
            displayResults({
                number: simNumber,
                network: network,
                owner: 'Not available in demo',
                cnic: 'Not available in demo',
                registrationDate: 'Not available in demo',
                status: 'Unknown',
                location: 'Pakistan'
            });
        }
    });

    // Clear button click handler
    clearBtn.addEventListener('click', function() {
        resultContainer.style.display = 'none';
        simNumberInput.value = '';
        simNumberInput.focus();
    });

    // Allow search on Enter key
    simNumberInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});