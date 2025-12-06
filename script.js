// Question weights (importance scores)
const questionWeights = {
    q1: 3,    // Number of floors
    q2: 2,    // Number of families
    q3: 1,    // Floor number
    q4: 8,    // Fire extinguisher in residence
    q5: 5,    // Fire extinguisher in common area
    q6: 6,    // Fire sprinkler
    q7: 8,    // Smoke detector
    q8: 3,    // Used extinguisher before
    q9: 2,    // Neighbor used extinguisher
    q10: 4,   // Firemen visit
    q11: 2,   // Building age
    q12: 3,   // Distance to fire station
    q13: 4,   // Fire drill conducted
    q14: 1,   // Balcony
    q15: 10,  // Escape routes (MOST IMPORTANT)
    q16: 2,   // Car parking
    q17: 4,   // Extinguisher in parking
    q18: 3,   // Workplace extinguisher
    q19: 5,   // Manual call point
    q20: 6,   // Fire blanket
    q21: 7,   // Fire hydrant system
    q22: 4    // ISI awareness
};

// Maximum possible score
const maxScore = Object.values(questionWeights).reduce((a, b) => a + b, 0);

// Positive answers for scoring
const positiveAnswers = {
    q4: 'yes',      // Extinguisher in residence
    q5: 'yes',      // Extinguisher in common area
    q6: 'yes',      // Fire sprinkler
    q7: 'yes',      // Smoke detector
    q8: 'yes',      // Used extinguisher (experience)
    q9: 'yes',      // Neighbor used (awareness)
    q10: 'no',      // No firemen visit (no incidents)
    q11: '<4',      // Newer building (<4 years)
    q12: '<5',      // Close to fire station
    q13: 'yes',     // Fire drill conducted
    q14: 'yes',     // Has balcony
    q15: ['2', '3', '4'],  // Multiple escape routes
    q16: 'yes',     // Has car parking
    q17: 'yes',     // Extinguisher in parking
    q18: 'yes',     // Workplace has extinguisher
    q19: 'yes',     // Manual call point
    q20: 'yes',     // Fire blanket
    q21: 'yes',     // Fire hydrant
    q22: 'yes'      // Aware of ISI marks
};

// Recommendations for each question
const recommendations = {
    q4: "🚨 HIGH PRIORITY: Install a portable fire extinguisher in your residence. ABC-type extinguishers are suitable for most home fires.",
    q5: "⚠️ MEDIUM PRIORITY: Ensure fire extinguishers are available in common areas like corridors and lift lobbies.",
    q6: "💡 RECOMMENDED: Consider installing fire sprinklers for automatic fire suppression.",
    q7: "🚨 HIGH PRIORITY: Install smoke detectors on every floor, especially near bedrooms. Test them monthly.",
    q8: "💡 TIP: Practice using a fire extinguisher with PASS technique (Pull, Aim, Squeeze, Sweep).",
    q9: "💡 AWARENESS: Learn from neighbors' experiences. Discuss fire safety with your building community.",
    q10: "⚠️ WARNING: Frequent fire department visits indicate higher risk areas. Be extra vigilant.",
    q11: "💡 NOTE: Older buildings may need electrical and fire safety upgrades.",
    q12: "⚠️ CONSIDERATION: If far from fire station, ensure better on-site firefighting capability.",
    q13: "🚨 HIGH PRIORITY: Conduct regular fire drills. All residents should know evacuation routes.",
    q14: "💡 TIP: Balconies can serve as secondary escape routes. Keep them accessible.",
    q15: "🚨 CRITICAL: Ensure at least 2 clear escape routes. Remove all obstructions immediately.",
    q16: "💡 NOTE: Underground parking increases fire risk. Ensure proper ventilation and fire safety.",
    q17: "⚠️ MEDIUM PRIORITY: Install fire extinguishers in parking areas.",
    q18: "💡 AWARENESS: Check your workplace/school fire safety measures too.",
    q19: "⚠️ MEDIUM PRIORITY: Manual call points help quick alarm activation.",
    q20: "🚨 HIGH PRIORITY: Keep a fire blanket in kitchen for grease fires.",
    q21: "⚠️ MEDIUM PRIORITY: Ensure fire hydrant system is functional and accessible.",
    q22: "💡 IMPORTANT: Always purchase BIS/ISI marked fire safety equipment (IS 15683)."
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    
    // Add change listeners to all inputs
    const form = document.getElementById('fireSafetyForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('change', updateProgress);
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateAndShowResults();
    });
});

// Update progress bar
function updateProgress() {
    const form = document.getElementById('fireSafetyForm');
    const inputs = form.querySelectorAll('input[type="radio"]:checked, input[type="number"]:not(:placeholder-shown), select:not([value=""])');
    
    const totalQuestions = 22; // Total questions in the form
    const answered = inputs.length;
    const percentage = Math.round((answered / totalQuestions) * 100);
    
    // Update progress bar
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressPercent').textContent = percentage + '%';
    document.getElementById('progressStats').textContent = answered + ' of ' + totalQuestions + ' questions answered';
}

// Calculate score
function calculateScore() {
    const form = document.getElementById('fireSafetyForm');
    let totalScore = 0;
    let maxPossible = 0;
    let missingAnswers = [];
    let riskAreas = [];
    
    // Calculate for each question
    for (let i = 1; i <= 22; i++) {
        const questionKey = 'q' + i;
        const weight = questionWeights[questionKey];
        
        if (!weight) continue; // Skip if no weight defined
        
        maxPossible += weight;
        
        const element = form.querySelector(`[name="${questionKey}"]`);
        if (!element) continue;
        
        let answer;
        
        // Get answer based on input type
        if (element.type === 'radio') {
            const selected = form.querySelector(`[name="${questionKey}"]:checked`);
            answer = selected ? selected.value : null;
        } else if (element.type === 'number') {
            answer = element.value;
        }
        
        if (!answer) {
            missingAnswers.push(i);
            continue;
        }
        
        // Check if answer is positive
        const positiveAnswer = positiveAnswers[questionKey];
        let isPositive = false;
        
        if (Array.isArray(positiveAnswer)) {
            isPositive = positiveAnswer.includes(answer);
        } else {
            isPositive = answer === positiveAnswer;
        }
        
        if (isPositive) {
            totalScore += weight;
        } else {
            // Add to risk areas if negative answer
            riskAreas.push({
                question: i,
                answer: answer,
                recommendation: recommendations[questionKey] || "Review this safety aspect"
            });
        }
    }
    
    // Calculate percentage score
    const percentageScore = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;
    
    return {
        score: totalScore,
        maxPossible: maxPossible,
        percentage: percentageScore,
        missing: missingAnswers,
        riskAreas: riskAreas,
        totalQuestions: 22
    };
}

// Get safety level based on score
function getSafetyLevel(percentage) {
    if (percentage >= 85) {
        return {
            level: "Excellent Safety",
            color: "#4CAF50",
            icon: "✅",
            description: "Your building has excellent fire safety measures. Maintain regular checks."
        };
    } else if (percentage >= 70) {
        return {
            level: "Good Safety",
            color: "#8BC34A",
            icon: "👍",
            description: "Good fire safety measures in place. Address the recommendations below."
        };
    } else if (percentage >= 50) {
        return {
            level: "Moderate Safety",
            color: "#FFC107",
            icon: "⚠️",
            description: "Moderate fire safety. Important improvements needed."
        };
    } else if (percentage >= 30) {
        return {
            level: "Needs Improvement",
            color: "#FF9800",
            icon: "🔔",
            description: "Significant fire safety improvements required."
        };
    } else {
        return {
            level: "High Risk",
            color: "#F44336",
            icon: "🚨",
            description: "Immediate action required to address fire safety issues."
        };
    }
}

// Calculate and show results
function calculateAndShowResults() {
    const results = calculateScore();
    const safetyLevel = getSafetyLevel(results.percentage);
    
    // Store results in sessionStorage for report.html
    sessionStorage.setItem('fireSafetyResults', JSON.stringify({
        score: results.percentage,
        safetyLevel: safetyLevel,
        riskAreas: results.riskAreas,
        missing: results.missing,
        timestamp: new Date().toISOString()
    }));
    
    // Redirect to report page
    window.location.href = 'report.html';
}

// Utility function for Amazon tracking
function trackAmazonClick() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'amazon_click', {
            'event_category': 'affiliate',
            'event_label': 'fire_safety_store_click'
        });
    }
}

// Utility function for coffee tracking
function trackCoffeeClick() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'coffee_click', {
            'event_category': 'support',
            'event_label': 'buy_me_coffee_click'
        });
    }
}