/**
 * Stellar Reverb - Shopify Theme JavaScript
 * Cosmic streetwear e-commerce with enhanced interactivity
 * Version: 1.0.0
 */

// ===== Shopify Theme Integration =====
class StellarReverbTheme {
  constructor() {
    this.isGlitchActive = false;
    this.cosmicParticles = [];
    this.cart = null;
    this.settings = this.getThemeSettings();
    
    this.init();
  }

  // Get theme settings from CSS custom properties
  getThemeSettings() {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    return {
      cosmicEffectsEnabled: computedStyle.getPropertyValue('--cosmic-effects-enabled').trim() === '1',
      starFieldEnabled: computedStyle.getPropertyValue('--star-field-enabled').trim() === '1',
      nebulaEffectsEnabled: computedStyle.getPropertyValue('--nebula-effects-enabled').trim() === '1',
      scanlinesEnabled: computedStyle.getPropertyValue('--scanlines-enabled').trim() === '1',
      glitchTextEnabled: computedStyle.getPropertyValue('--glitch-text-enabled').trim() === '1',
      particleCount: parseInt(computedStyle.getPropertyValue('--particle-count').trim()) || 20
    };
  }

  // Initialize all theme features
  init() {
    this.initializeCosmicEffects();
    this.initializeGlitchEffects();
    this.initializeInteractiveElements();
    this.initializeShopifyIntegration();
    this.initializeScrollEffects();
    this.initializeAccessibility();
    
    console.log('🌌 Stellar Reverb Shopify Theme loaded successfully!');
  }

  // ===== Cosmic Background Effects =====
  initializeCosmicEffects() {
    if (!this.settings.cosmicEffectsEnabled) return;
    
    if (this.settings.starFieldEnabled) {
      this.createStarField();
    }
    
    if (this.settings.cosmicEffectsEnabled) {
      this.createFloatingParticles();
    }
    
    this.initializeAudioVisualizer();
  }

  createStarField() {
    const starField = document.createElement('div');
    starField.className = 'star-field';
    starField.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -3;
      overflow: hidden;
    `;

    // Create stars with performance optimization
    const starCount = window.innerWidth < 768 ? 50 : 100;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
        animation-delay: ${Math.random() * 2}s;
      `;
      starField.appendChild(star);
    }

    document.body.appendChild(starField);

    // Add twinkle animation if not already added
    if (!document.querySelector('#twinkle-animation')) {
      const style = document.createElement('style');
      style.id = 'twinkle-animation';
      style.textContent = `
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'cosmic-particles';
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -2;
      overflow: hidden;
    `;

    const particleCount = window.innerWidth < 768 ? 
      Math.floor(this.settings.particleCount / 2) : 
      this.settings.particleCount;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const colors = ['var(--color-cosmic-cyan)', 'var(--color-cosmic-magenta)', 'var(--color-cosmic-purple)'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0.6;
        animation: float-cosmic ${Math.random() * 10 + 5}s ease-in-out infinite;
        animation-delay: ${Math.random() * 3}s;
        box-shadow: 0 0 10px ${color};
      `;
      
      particleContainer.appendChild(particle);
      this.cosmicParticles.push(particle);
    }

    document.body.appendChild(particleContainer);

    // Add floating animation
    if (!document.querySelector('#float-cosmic-animation')) {
      const style = document.createElement('style');
      style.id = 'float-cosmic-animation';
      style.textContent = `
        @keyframes float-cosmic {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-30px) translateX(20px) rotate(90deg); 
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-10px) translateX(-15px) rotate(180deg); 
            opacity: 1;
          }
          75% { 
            transform: translateY(-40px) translateX(10px) rotate(270deg); 
            opacity: 0.6;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  initializeAudioVisualizer() {
    const visualizer = document.createElement('div');
    visualizer.className = 'audio-visualizer';
    visualizer.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      gap: 2px;
      align-items: end;
      opacity: 0.3;
      pointer-events: none;
      z-index: 100;
    `;

    for (let i = 0; i < 12; i++) {
      const bar = document.createElement('div');
      bar.style.cssText = `
        width: 3px;
        height: ${Math.random() * 20 + 5}px;
        background: linear-gradient(to top, var(--color-cosmic-purple), var(--color-cosmic-cyan));
        border-radius: 2px;
        animation: visualizer-pulse ${Math.random() * 2 + 1}s ease-in-out infinite alternate;
        animation-delay: ${i * 0.1}s;
      `;
      visualizer.appendChild(bar);
    }

    document.body.appendChild(visualizer);

    if (!document.querySelector('#visualizer-animation')) {
      const style = document.createElement('style');
      style.id = 'visualizer-animation';
      style.textContent = `
        @keyframes visualizer-pulse {
          0% { height: 5px; opacity: 0.3; }
          100% { height: 30px; opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ===== Glitch Effects =====
  initializeGlitchEffects() {
    if (!this.settings.glitchTextEnabled) return;

    document.querySelectorAll('.glitch-text').forEach(element => {
      this.enhanceGlitchText(element);
    });

    // Random glitch triggers
    setInterval(() => {
      if (Math.random() < 0.1) {
        this.triggerRandomGlitch();
      }
    }, 3000);
  }

  enhanceGlitchText(element) {
    element.addEventListener('mouseenter', () => {
      this.triggerGlitchEffect(element);
    });

    if (!element.getAttribute('data-text')) {
      element.setAttribute('data-text', element.textContent);
    }
  }

  triggerGlitchEffect(element) {
    if (this.isGlitchActive) return;
    
    this.isGlitchActive = true;
    element.style.animation = 'glitch-main 0.3s ease-in-out';
    
    setTimeout(() => {
      element.style.animation = '';
      this.isGlitchActive = false;
    }, 300);
  }

  triggerRandomGlitch() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    if (glitchElements.length > 0) {
      const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
      this.triggerGlitchEffect(randomElement);
    }
  }

  // ===== Shopify Integration =====
  initializeShopifyIntegration() {
    this.initializeCart();
    this.initializeProductForms();
    this.initializeQuickView();
    this.initializeSearch();
  }

  initializeCart() {
    // Cart drawer functionality
    const cartTriggers = document.querySelectorAll('[data-cart-trigger]');
    const cartDrawer = document.querySelector('.cart-drawer');
    const cartClose = document.querySelector('.cart-drawer__close');

    cartTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCartDrawer();
      });
    });

    if (cartClose) {
      cartClose.addEventListener('click', () => {
        this.closeCartDrawer();
      });
    }

    // Cart overlay
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';
    cartOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      z-index: 1999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    `;
    
    cartOverlay.addEventListener('click', () => {
      this.closeCartDrawer();
    });
    
    document.body.appendChild(cartOverlay);
    this.cartOverlay = cartOverlay;
  }

  openCartDrawer() {
    const cartDrawer = document.querySelector('.cart-drawer');
    if (cartDrawer) {
      cartDrawer.classList.add('is-open');
      this.cartOverlay.style.opacity = '1';
      this.cartOverlay.style.visibility = 'visible';
      document.body.style.overflow = 'hidden';
    }
  }

  closeCartDrawer() {
    const cartDrawer = document.querySelector('.cart-drawer');
    if (cartDrawer) {
      cartDrawer.classList.remove('is-open');
      this.cartOverlay.style.opacity = '0';
      this.cartOverlay.style.visibility = 'hidden';
      document.body.style.overflow = '';
    }
  }

  initializeProductForms() {
    const productForms = document.querySelectorAll('[data-product-form]');
    
    productForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addToCart(form);
      });
    });
  }

  async addToCart(form) {
    const formData = new FormData(form);
    const button = form.querySelector('[type="submit"]');
    const originalText = button.textContent;
    
    // Loading state
    button.textContent = 'Adding to cosmic cart...';
    button.disabled = true;
    
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const item = await response.json();
        this.showCartNotification(item);
        this.updateCartCount();
        
        // Cosmic effect on successful add
        this.createParticleBurst(button);
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Cart error:', error);
      this.showNotification('Error adding to cart', 'error');
    } finally {
      button.textContent = originalText;
      button.disabled = false;
    }
  }

  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
      });
    } catch (error) {
      console.error('Failed to update cart count:', error);
    }
  }

  showCartNotification(item) {
    this.showNotification(`${item.product_title} added to cosmic cart!`, 'success');
  }

  initializeQuickView() {
    const quickViewTriggers = document.querySelectorAll('[data-quick-view]');
    
    quickViewTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const productHandle = trigger.dataset.quickView;
        this.openQuickView(productHandle);
      });
    });
  }

  async openQuickView(productHandle) {
    // Implementation for quick view modal
    console.log('Opening quick view for:', productHandle);
  }

  initializeSearch() {
    const searchForms = document.querySelectorAll('[data-search-form]');
    
    searchForms.forEach(form => {
      const input = form.querySelector('input[type="search"]');
      if (input) {
        input.addEventListener('input', this.debounce((e) => {
          this.performPredictiveSearch(e.target.value);
        }, 300));
      }
    });
  }

  async performPredictiveSearch(query) {
    if (query.length < 2) return;
    
    try {
      const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5`);
      const results = await response.json();
      
      // Display search results
      console.log('Search results:', results);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  // ===== Interactive Elements =====
  initializeInteractiveElements() {
    this.enhanceProductCards();
    this.enhanceNavigation();
    this.enhanceButtons();
    this.initializeKeyboardShortcuts();
  }

  enhanceProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
      const image = card.querySelector('.product-card__image');
      
      card.addEventListener('mouseenter', () => {
        if (image) {
          image.style.filter = 'brightness(1.2) contrast(1.1)';
        }
        this.createParticleBurst(card);
      });

      card.addEventListener('mouseleave', () => {
        if (image) {
          image.style.filter = '';
        }
      });
    });
  }

  enhanceNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px currentColor';
        this.style.transform = 'translateY(-2px)';
      });
      
      link.addEventListener('mouseleave', function() {
        this.style.textShadow = '';
        this.style.transform = '';
      });
    });
  }

  enhanceButtons() {
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });
    });
  }

  createRippleEffect(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(0, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);

    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-animation')) {
      const style = document.createElement('style');
      style.id = 'ripple-animation';
      style.textContent = `
        @keyframes ripple {
          to { transform: scale(2); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--color-cosmic-cyan);
        border-radius: 50%;
        left: ${centerX}px;
        top: ${centerY}px;
        pointer-events: none;
        z-index: 1000;
        animation: particle-burst 0.8s ease-out forwards;
        animation-delay: ${i * 0.05}s;
      `;
      
      const angle = (i / 8) * Math.PI * 2;
      const distance = 50 + Math.random() * 30;
      particle.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
      particle.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 800);
    }

    if (!document.querySelector('#particle-burst-animation')) {
      const style = document.createElement('style');
      style.id = 'particle-burst-animation';
      style.textContent = `
        @keyframes particle-burst {
          0% { 
            transform: translate(0, 0) scale(1); 
            opacity: 1; 
          }
          100% { 
            transform: translate(var(--end-x), var(--end-y)) scale(0); 
            opacity: 0; 
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // G key for glitch effect
      if (e.key.toLowerCase() === 'g' && !e.ctrlKey && !e.altKey) {
        this.triggerRandomGlitch();
      }
      
      // P key for particle burst
      if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.altKey) {
        this.createCursorParticleBurst();
      }
      
      // Escape key to close cart
      if (e.key === 'Escape') {
        this.closeCartDrawer();
      }
    });
  }

  createCursorParticleBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--color-cosmic-magenta);
        border-radius: 50%;
        left: ${centerX}px;
        top: ${centerY}px;
        pointer-events: none;
        z-index: 1000;
        animation: cursor-burst 1.2s ease-out forwards;
        animation-delay: ${i * 0.08}s;
        box-shadow: 0 0 10px var(--color-cosmic-magenta);
      `;
      
      const angle = (i / 12) * Math.PI * 2;
      const distance = 80 + Math.random() * 40;
      particle.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
      particle.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 1200);
    }

    if (!document.querySelector('#cursor-burst-animation')) {
      const style = document.createElement('style');
      style.id = 'cursor-burst-animation';
      style.textContent = `
        @keyframes cursor-burst {
          0% { 
            transform: translate(0, 0) scale(1) rotate(0deg); 
            opacity: 1; 
          }
          100% { 
            transform: translate(var(--end-x), var(--end-y)) scale(0) rotate(360deg); 
            opacity: 0; 
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ===== Scroll Effects =====
  initializeScrollEffects() {
    let ticking = false;

    const updateScrollEffects = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      // Parallax effect for headers
      document.querySelectorAll('.hero, .collection-header').forEach(header => {
        header.style.transform = `translateY(${rate * 0.3}px)`;
      });

      // Fade effect for hero content
      const heroContent = document.querySelector('.hero__content');
      if (heroContent) {
        const opacity = Math.max(0, 1 - scrolled / 600);
        heroContent.style.opacity = opacity;
      }

      // Reveal animations
      document.querySelectorAll('.product-card, .section').forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !element.classList.contains('revealed')) {
          element.classList.add('revealed');
          element.style.animation = 'reveal-up 0.8s ease-out forwards';
        }
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);

    // Add reveal animation
    if (!document.querySelector('#reveal-animation')) {
      const style = document.createElement('style');
      style.id = 'reveal-animation';
      style.textContent = `
        @keyframes reveal-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ===== Accessibility =====
  initializeAccessibility() {
    // Focus management
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('using-keyboard');
    });

    // Announce dynamic content changes
    this.createAriaLiveRegion();
  }

  createAriaLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'visually-hidden';
    liveRegion.id = 'aria-live-region';
    document.body.appendChild(liveRegion);
    this.ariaLiveRegion = liveRegion;
  }

  announceToScreenReader(message) {
    if (this.ariaLiveRegion) {
      this.ariaLiveRegion.textContent = message;
      setTimeout(() => {
        this.ariaLiveRegion.textContent = '';
      }, 1000);
    }
  }

  // ===== Utility Functions =====
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'error' ? 'rgba(255, 0, 0, 0.9)' : 'rgba(0, 255, 0, 0.9)'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: notification-slide 0.3s ease-out;
      max-width: 300px;
      font-family: var(--font-body-family);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Announce to screen readers
    this.announceToScreenReader(message);
    
    setTimeout(() => {
      notification.style.animation = 'notification-slide 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 4000);

    if (!document.querySelector('#notification-animation')) {
      const style = document.createElement('style');
      style.id = 'notification-animation';
      style.textContent = `
        @keyframes notification-slide {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// ===== Initialize Theme =====
document.addEventListener('DOMContentLoaded', () => {
  window.stellarReverbTheme = new StellarReverbTheme();
});

// ===== Shopify Theme Events =====
document.addEventListener('shopify:section:load', () => {
  // Reinitialize when sections are loaded in theme editor
  if (window.stellarReverbTheme) {
    window.stellarReverbTheme.initializeInteractiveElements();
  }
});

document.addEventListener('shopify:section:unload', () => {
  // Cleanup when sections are unloaded
  console.log('Section unloaded');
});

// ===== Performance Optimization =====
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty('--glitch-duration', '1s');
  document.documentElement.style.setProperty('--scan-duration', '4s');
}

console.log('🌌 Stellar Reverb Shopify Theme JavaScript loaded!');

