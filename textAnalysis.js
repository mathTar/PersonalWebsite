function analyzeText() {
    const text = document.getElementById('text-input').value;
    const resultsDiv = document.getElementById('analysis-results');
    
    if (text.trim().length < 100) {
        resultsDiv.innerHTML = '<p class="error">Please enter a longer text for meaningful analysis (at least 100 characters).</p>';
        return;
    }
    
    resultsDiv.innerHTML = '<p>Analyzing text...</p>';
    
    setTimeout(() => {
        const letters = (text.match(/[a-zA-Z]/g) || []).length;
        const words = text.split(/\s+/).filter(word => word.length > 0).length;
        const spaces = (text.match(/\s/g) || []).length;
        const newlines = (text.match(/\n/g) || []).length;
        const specialSymbols = (text.match(/[^\w\s]/g) || []).length;
        
        const tokens = text.toLowerCase()
            .replace(/[^\w\s']|_/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .split(/\s+/);
        
        const pronouns = [
            'i', 'me', 'my', 'mine', 'myself',
            'you', 'your', 'yours', 'yourself', 'yourselves',
            'he', 'him', 'his', 'himself',
            'she', 'her', 'hers', 'herself',
            'it', 'its', 'itself',
            'we', 'us', 'our', 'ours', 'ourselves',
            'they', 'them', 'their', 'theirs', 'themselves',
            'who', 'whom', 'whose', 'which', 'what',
            'this', 'that', 'these', 'those',
            'anybody', 'anyone', 'anything',
            'everybody', 'everyone', 'everything',
            'nobody', 'no one', 'nothing',
            'somebody', 'someone', 'something',
            'each', 'either', 'neither', 'one', 'other'
        ];
        
        const prepositions = [
            'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'around', 'at',
            'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by',
            'concerning', 'considering',
            'despite', 'down', 'during',
            'except', 'for', 'from',
            'in', 'inside', 'into',
            'like',
            'near',
            'of', 'off', 'on', 'onto', 'out', 'outside', 'over',
            'past', 'regarding',
            'since',
            'through', 'throughout', 'to', 'toward', 'towards',
            'under', 'underneath', 'until', 'unto', 'up', 'upon',
            'with', 'within', 'without'
        ];
        
        const indefiniteArticles = ['a', 'an', 'some', 'any', 'many', 'much', 'few', 'little'];
        
        const pronounCounts = countOccurrences(tokens, pronouns);
        const prepositionCounts = countOccurrences(tokens, prepositions);
        const articleCounts = countOccurrences(tokens, indefiniteArticles);
        
        resultsDiv.innerHTML = `
            <h3>Text Analysis Results</h3>
            
            <h4>Basic Text Statistics</h4>
            <div class="analysis-results-grid">
                <div class="analysis-item">
                    <h5>Letters</h5>
                    <p>${letters}</p>
                </div>
                <div class="analysis-item">
                    <h5>Words</h5>
                    <p>${words}</p>
                </div>
                <div class="analysis-item">
                    <h5>Spaces</h5>
                    <p>${spaces}</p>
                </div>
                <div class="analysis-item">
                    <h5>Newlines</h5>
                    <p>${newlines}</p>
                </div>
                <div class="analysis-item">
                    <h5>Special Symbols</h5>
                    <p>${specialSymbols}</p>
                </div>
            </div>
            
            <h4>Pronouns (${sumValues(pronounCounts)} total)</h4>
            <div class="word-category">
                ${generateTokenTable(pronounCounts)}
            </div>
            
            <h4>Prepositions (${sumValues(prepositionCounts)} total)</h4>
            <div class="word-category">
                ${generateTokenTable(prepositionCounts)}
            </div>
            
            <h4>Indefinite Articles (${sumValues(articleCounts)} total)</h4>
            <div class="word-category">
                ${generateTokenTable(articleCounts)}
            </div>
        `;
        
        const items = document.querySelectorAll('.analysis-item, .token-item');
        items.forEach((item, index) => {
            item.style.animation = `scaleIn 0.3s ease-out ${0.05 * index}s both`;
        });
    }, 800);
}

function countOccurrences(tokens, targetList) {
    const counts = {};
    
    targetList.forEach(item => {
        counts[item] = 0;
    });
    
    tokens.forEach(token => {
        if (targetList.includes(token)) {
            counts[token]++;
        }
    });
    
    return Object.fromEntries(
        Object.entries(counts).filter(([_, count]) => count > 0)
    );
}

function generateTokenTable(counts) {
    const entries = Object.entries(counts);
    
    if (entries.length === 0) {
        return "<p>None found in the text.</p>";
    }
    
    entries.sort((a, b) => b[1] - a[1]);
    
    let html = '<div class="token-grid">';
    
    entries.forEach(([token, count]) => {
        html += `
            <div class="token-item">
                <span class="token-name">${token}</span>
                <span class="token-count">${count}</span>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

function sumValues(obj) {
    return Object.values(obj).reduce((sum, val) => sum + val, 0);
}
