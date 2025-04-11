// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Hero image animation with both mobile and desktop support
    const heroImage = document.querySelector('.hero-image-container');
    if (heroImage) {
        // Create animated float effect for all devices
        let startTime = Date.now();
        
        function animateImage() {
            // Calculate time for animations
            const elapsed = Date.now() - startTime;
            const floatCycle = elapsed % 6000; // 6 second float cycle
            const rotateCycle = elapsed % 20000; // 20 second rotation cycle
            
            // Mobile animation (simple float and rotation)
            if (window.innerWidth <= 992) {
                // Calculate float position (up and down)
                const floatY = -15 * Math.sin(floatCycle / 6000 * Math.PI * 2);
                
                // Calculate rotation
                const rotateX = 5 * Math.sin(rotateCycle / 20000 * Math.PI * 2);
                const rotateY = 5 * Math.cos(rotateCycle / 20000 * Math.PI * 2);
                
                // Apply transform
                heroImage.style.transform = `translateY(${floatY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            }
            
            // Request next frame
            requestAnimationFrame(animateImage);
        }
        
        // Start the animation
        animateImage();
        
        // Desktop interaction (mouse-based)
        document.addEventListener('mousemove', function(e) {
            // Only apply if screen is large enough
            if (window.innerWidth > 992) {
                const mouseX = e.clientX / window.innerWidth - 0.5;
                const mouseY = e.clientY / window.innerHeight - 0.5;
                
                // Apply rotation based on mouse position
                heroImage.style.transform = `rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg)`;
            }
        });
        
        // Reset on mouse leave for desktop
        document.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                heroImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Offset for navbar height
                    behavior: 'smooth'
                });
                
                // Update active navigation link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active navigation based on scroll position
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            let offset = section.offsetTop - 100;
            let height = section.offsetHeight;
            let id = section.getAttribute('id');
            
            if (scrollPosition >= offset && scrollPosition < offset + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Add click event for view schedule button
    const scheduleButton = document.getElementById('viewScheduleBtn');
    if (scheduleButton) {
        scheduleButton.addEventListener('click', function() {
            const scheduleOverlay = document.getElementById('scheduleOverlay');
            if (scheduleOverlay) {
                scheduleOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when overlay is active
            }
        });
    }
    
    // Close overlay functionality
    const closeButton = document.getElementById('closeOverlay');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            const scheduleOverlay = document.getElementById('scheduleOverlay');
            if (scheduleOverlay) {
                scheduleOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
    
    // Close overlay when clicking outside content area
    const scheduleOverlay = document.getElementById('scheduleOverlay');
    if (scheduleOverlay) {
        scheduleOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                scheduleOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
    
    // Player Stats Functionality
    const playerCards = document.querySelectorAll('.player-card');
    const playerStatsOverlay = document.getElementById('playerStatsOverlay');
    const closePlayerStats = document.getElementById('closePlayerStats');
    
    // Sample player database with detailed stats
    const playerDatabase = {
        // Batsmen
        'Rahul Sharma': {
            number: 1,
            role: 'Captain & Batsman',
            img: 'src/img/69257289.webp',
            batting: {
                matches: 45,
                runs: 1250,
                highest: '87*',
                average: 32.8,
                strikeRate: 128.6,
                centuries: 0,
                halfCenturies: 12
            },
            bowling: {
                wickets: 5,
                bestBowling: '2/23',
                economy: 7.25,
                average: 38.2,
                fiveWickets: 0
            },
            fielding: {
                catches: 28,
                runOuts: 12,
                stumpings: 0
            },
            bio: 'Rahul Sharma has been the backbone of our batting lineup since joining the team in 2019. As captain, he has led the team to multiple tournament victories with his strategic mindset and calm demeanor on the field.'
        },
        'Vikram Patel': {
            number: 2,
            role: 'Batsman',
            img: 'src/img/placeholder-player.jpg',
            batting: {
                matches: 42,
                runs: 980,
                highest: '76',
                average: 28.4,
                strikeRate: 132.1,
                centuries: 0,
                halfCenturies: 8
            },
            bowling: {
                wickets: 0,
                bestBowling: '-',
                economy: 0,
                average: 0,
                fiveWickets: 0
            },
            fielding: {
                catches: 15,
                runOuts: 8,
                stumpings: 0
            },
            bio: 'Vikram is known for his aggressive batting style and ability to score quick runs. He has been a consistent performer in the opening position and forms a strong partnership with the captain.'
        },
        'Suresh Reddy': {
            number: 3,
            role: 'Batsman',
            img: 'src/img/placeholder-player.jpg',
            batting: {
                matches: 39,
                runs: 870,
                highest: '92',
                average: 26.3,
                strikeRate: 125.8,
                centuries: 0,
                halfCenturies: 7
            },
            bowling: {
                wickets: 0,
                bestBowling: '-',
                economy: 0,
                average: 0,
                fiveWickets: 0
            },
            fielding: {
                catches: 18,
                runOuts: 6,
                stumpings: 0
            },
            bio: 'Suresh is a technically sound batsman who excels against both pace and spin. His consistency in the middle order has been crucial for the team in tight matches.'
        },
        'Ajay Kumar': {
            number: 4,
            role: 'Batsman',
            img: 'src/img/placeholder-player.jpg',
            batting: {
                matches: 35,
                runs: 760,
                highest: '65',
                average: 25.3,
                strikeRate: 118.7,
                centuries: 0,
                halfCenturies: 6
            },
            bowling: {
                wickets: 0,
                bestBowling: '-',
                economy: 0,
                average: 0,
                fiveWickets: 0
            },
            fielding: {
                catches: 12,
                runOuts: 5,
                stumpings: 0
            },
            bio: 'Ajay is known for his solid defense and ability to play long innings. He often anchors the innings during difficult situations and has rescued the team multiple times.'
        },
        'Ravi Verma': {
            number: 5,
            role: 'Batsman',
            img: 'src/img/placeholder-player.jpg',
            batting: {
                matches: 32,
                runs: 680,
                highest: '78',
                average: 24.3,
                strikeRate: 130.2,
                centuries: 0,
                halfCenturies: 5
            },
            bowling: {
                wickets: 2,
                bestBowling: '1/15',
                economy: 8.5,
                average: 42.0,
                fiveWickets: 0
            },
            fielding: {
                catches: 14,
                runOuts: 7,
                stumpings: 0
            },
            bio: 'Ravi is an aggressive batsman who specializes in power hitting. His quick scoring in the late middle order has helped the team set competitive totals.'
        },
        
        // Bowlers
        'Mahesh Yadav': {
            number: 6,
            role: 'Fast Bowler',
            img: 'src/img/placeholder-player.jpg',
            batting: {
                matches: 30,
                runs: 120,
                highest: '24',
                average: 8.5,
                strikeRate: 82.1,
                centuries: 0,
                halfCenturies: 0
            },
            bowling: {
                wickets: 45,
                bestBowling: '5/32',
                economy: 7.2,
                average: 22.4,
                fiveWickets: 1
            },
            fielding: {
                catches: 10,
                runOuts: 4,
                stumpings: 0
            },
            bio: 'Mahesh leads our bowling attack with his express pace and swing bowling. He has the ability to take early wickets and put pressure on the opposition.'
        },
        'Sanjay Singh': {
            number: 7,
            role: 'Spin Bowler',
            img: 'src/img/placeholder-player.jpg',
            batting: {
                matches: 28,
                runs: 95,
                highest: '18',
                average: 7.3,
                strikeRate: 75.4,
                centuries: 0,
                halfCenturies: 0
            },
            bowling: {
                wickets: 38,
                bestBowling: '4/25',
                economy: 6.8,
                average: 24.1,
                fiveWickets: 0
            },
            fielding: {
                catches: 8,
                runOuts: 3,
                stumpings: 0
            },
            bio: 'Sanjay is our lead spin bowler who can turn the ball significantly. His variations and control in the middle overs have been key to our success.'
        },
        'Vijay Chauhan': {
            number: 8,
            role: 'Medium Pace Bowler',
            img: 'src/img/placeholder-player.jpg',
            batting: {
                matches: 25,
                runs: 110,
                highest: '22',
                average: 9.2,
                strikeRate: 88.7,
                centuries: 0,
                halfCenturies: 0
            },
            bowling: {
                wickets: 35,
                bestBowling: '4/28',
                economy: 7.5,
                average: 25.7,
                fiveWickets: 0
            },
            fielding: {
                catches: 9,
                runOuts: 5,
                stumpings: 0
            },
            bio: 'Vijay is known for his accurate medium pace bowling and ability to bowl tight spells. He has been particularly effective in containing runs at the death.'
        }
    };
    
    // Add click listeners to all player cards
    playerCards.forEach(card => {
        card.addEventListener('click', function() {
            const playerName = this.querySelector('h5').textContent;
            if (playerDatabase[playerName]) {
                showPlayerStats(playerName);
            } else {
                // For players not in database, show generic message
                showGenericPlayerStats(playerName, this.querySelector('.player-role').textContent, this.querySelector('.player-number').textContent, this.querySelector('img').src);
            }
        });
    });
    
    // Function to show player stats
    function showPlayerStats(playerName) {
        const player = playerDatabase[playerName];
        
        // Set player basic info
        document.getElementById('playerOverlayImg').src = player.img;
        document.getElementById('playerOverlayName').textContent = playerName;
        document.getElementById('playerOverlayNumber').textContent = player.number;
        document.getElementById('playerOverlayRole').textContent = player.role;
        
        // Reset display of all stat categories
        document.getElementById('battingStats').style.display = 'none';
        document.getElementById('bowlingStats').style.display = 'none';
        document.getElementById('fieldingStats').style.display = 'none';
        
        // Show relevant stats based on player role
        if (player.role.includes('Bowler')) {
            // For bowlers, prioritize bowling stats
            document.getElementById('bowlingStats').style.display = 'block';
            
            // Only show batting stats if they have significant runs
            if (player.batting.runs > 100) {
                document.getElementById('battingStats').style.display = 'block';
            }
            
            // Show fielding only if they have significant contributions
            if (player.fielding.catches > 5 || player.fielding.runOuts > 3) {
                document.getElementById('fieldingStats').style.display = 'block';
            }
        } else if (player.role.includes('Batsman')) {
            // For batsmen, prioritize batting stats
            document.getElementById('battingStats').style.display = 'block';
            
            // Only show bowling stats if they have taken wickets
            if (player.bowling.wickets > 0) {
                document.getElementById('bowlingStats').style.display = 'block';
            }
            
            // Always show fielding for batsmen
            document.getElementById('fieldingStats').style.display = 'block';
        } else if (player.role.includes('All-Rounder')) {
            // For all-rounders, show all stats
            document.getElementById('battingStats').style.display = 'block';
            document.getElementById('bowlingStats').style.display = 'block';
            document.getElementById('fieldingStats').style.display = 'block';
        } else {
            // For other roles (like wicketkeeper), prioritize based on their stats
            if (player.batting.runs > 0) {
                document.getElementById('battingStats').style.display = 'block';
            }
            
            if (player.bowling.wickets > 0) {
                document.getElementById('bowlingStats').style.display = 'block';
            }
            
            document.getElementById('fieldingStats').style.display = 'block';
        }
        
        // Set batting stats
        document.getElementById('matchesPlayed').textContent = player.batting.matches;
        document.getElementById('totalRuns').textContent = player.batting.runs;
        document.getElementById('highestScore').textContent = player.batting.highest;
        document.getElementById('battingAverage').textContent = player.batting.average;
        document.getElementById('strikeRate').textContent = player.batting.strikeRate;
        document.getElementById('centuries').textContent = player.batting.centuries;
        document.getElementById('halfCenturies').textContent = player.batting.halfCenturies;
        
        // Set bowling stats
        document.getElementById('totalWickets').textContent = player.bowling.wickets;
        document.getElementById('bestBowling').textContent = player.bowling.bestBowling;
        document.getElementById('economyRate').textContent = player.bowling.economy;
        document.getElementById('bowlingAverage').textContent = player.bowling.average;
        document.getElementById('fiveWickets').textContent = player.bowling.fiveWickets;
        
        // Set fielding stats
        document.getElementById('catches').textContent = player.fielding.catches;
        document.getElementById('runOuts').textContent = player.fielding.runOuts;
        document.getElementById('stumpings').textContent = player.fielding.stumpings;
        
        // Set player bio
        document.getElementById('playerBio').textContent = player.bio;
        
        // Show the overlay
        playerStatsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function for players without detailed stats
    function showGenericPlayerStats(name, role, number, imgSrc) {
        // Set player basic info
        document.getElementById('playerOverlayImg').src = imgSrc;
        document.getElementById('playerOverlayName').textContent = name;
        document.getElementById('playerOverlayNumber').textContent = number || "N/A";
        document.getElementById('playerOverlayRole').textContent = role;
        
        // Hide all detailed stats
        document.getElementById('battingStats').style.display = 'none';
        document.getElementById('bowlingStats').style.display = 'none';
        document.getElementById('fieldingStats').style.display = 'none';
        
        // Set generic bio
        document.getElementById('playerBio').textContent = 
            `${name} is a valued member of our cricket team playing as a ${role}. Detailed statistics for this player will be updated soon.`;
        
        // Show the overlay
        playerStatsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close player stats overlay
    if (closePlayerStats) {
        closePlayerStats.addEventListener('click', function() {
            playerStatsOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close player stats overlay when clicking outside content
    if (playerStatsOverlay) {
        playerStatsOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                playerStatsOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
}); 