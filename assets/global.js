/**
 * Stellar Reverb - Global Shopify Functions
 * Core e-commerce functionality
 */

// ===== Shopify Global Functions =====
window.Shopify = window.Shopify || {};

// Cart functionality
window.Shopify.addItem = function(variant_id, quantity, callback) {
  const params = {
    type: 'POST',
    url: '/cart/add.js',
    data: 'quantity=' + quantity + '&id=' + variant_id,
    dataType: 'json',
    success: function(line_item) {
      if (typeof callback === 'function') {
        callback(line_item);
      }
    },
    error: function(XMLHttpRequest, textStatus) {
      console.error('Error adding to cart:', textStatus);
    }
  };
  
  fetch(params.url, {
    method: params.type,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.data
  })
  .then(response => response.json())
  .then(data => params.success(data))
  .catch(error => params.error(null, error));
};

// Format money
window.Shopify.formatMoney = function(cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }
  
  let value = '';
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = format || '${{amount}}';
  
  function formatWithDelimiters(number, precision, thousands, decimal) {
    thousands = thousands || ',';
    decimal = decimal || '.';
    
    if (isNaN(number) || number === null) {
      return 0;
    }
    
    number = (number / 100.0).toFixed(precision);
    
    const parts = number.split('.');
    const dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
    const centsAmount = parts[1] ? (decimal + parts[1]) : '';
    
    return dollarsAmount + centsAmount;
  }
  
  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }
  
  return formatString.replace(placeholderRegex, value);
};

// Product variant selection
window.Shopify.OptionSelectors = function(selectorDivId, options) {
  this.selectorDivId = selectorDivId;
  this.product = options.product;
  this.onVariantSelected = options.onVariantSelected;
  this.replaceSelector(selectorDivId);
  this.initDropdown();
};

window.Shopify.OptionSelectors.prototype.initDropdown = function() {
  const selectors = document.querySelectorAll('#' + this.selectorDivId + ' select');
  
  selectors.forEach((selector, index) => {
    selector.addEventListener('change', () => {
      const selectedOptions = Array.from(selectors).map(s => s.value);
      const variant = this.product.variants.find(v => {
        return v.options.every((option, i) => option === selectedOptions[i]);
      });
      
      if (this.onVariantSelected && typeof this.onVariantSelected === 'function') {
        this.onVariantSelected(variant, selector);
      }
    });
  });
};

window.Shopify.OptionSelectors.prototype.replaceSelector = function(selectorDivId) {
  const selectorDiv = document.getElementById(selectorDivId);
  if (!selectorDiv) return;
  
  selectorDiv.innerHTML = '';
  
  if (this.product && this.product.options) {
    this.product.options.forEach((option, index) => {
      const selectWrapper = document.createElement('div');
      selectWrapper.className = 'selector-wrapper';
      
      const label = document.createElement('label');
      label.textContent = option.name;
      label.setAttribute('for', 'ProductSelect-option-' + index);
      
      const select = document.createElement('select');
      select.id = 'ProductSelect-option-' + index;
      select.className = 'single-option-selector';
      select.setAttribute('data-option', 'option' + (index + 1));
      
      option.values.forEach(value => {
        const optionElement = document.createElement('option');
        optionElement.value = value;
        optionElement.textContent = value;
        select.appendChild(optionElement);
      });
      
      selectWrapper.appendChild(label);
      selectWrapper.appendChild(select);
      selectorDiv.appendChild(selectWrapper);
    });
  }
};

// Image switching
window.Shopify.Image = {
  preload: function(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  },
  
  loadImage: function(path) {
    new Image().src = path;
  },
  
  switchImage: function(image, element, callback) {
    const size = this.imageSize(element.src);
    const imageUrl = this.getSizedImageUrl(image, size);
    
    if (callback) {
      callback(imageUrl, image, element);
    } else {
      element.src = imageUrl;
    }
  },
  
  imageSize: function(src) {
    const match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master))\./);
    
    if (match !== null) {
      return match[1];
    } else {
      return null;
    }
  },
  
  getSizedImageUrl: function(src, size) {
    if (size === null) {
      return src;
    }
    
    if (size === 'master') {
      return this.removeProtocol(src);
    }
    
    const match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
    
    if (match !== null) {
      const prefix = src.split(match[0]);
      const suffix = match[0];
      
      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    }
    
    return null;
  },
  
  removeProtocol: function(path) {
    return path.replace(/http(s)?:/, '');
  }
};

// Utility functions
window.Shopify.utils = {
  resizeImage: function(src, size) {
    return window.Shopify.Image.getSizedImageUrl(src, size);
  },
  
  debounce: function(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
  
  throttle: function(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Initialize global functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize quantity selectors
  const quantityInputs = document.querySelectorAll('input[type="number"][name="quantity"]');
  quantityInputs.forEach(input => {
    const decreaseBtn = input.parentNode.querySelector('.quantity__button--minus');
    const increaseBtn = input.parentNode.querySelector('.quantity__button--plus');
    
    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value) || 1;
        if (currentValue > 1) {
          input.value = currentValue - 1;
          input.dispatchEvent(new Event('change'));
        }
      });
    }
    
    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(input.value) || 1;
        input.value = currentValue + 1;
        input.dispatchEvent(new Event('change'));
      });
    }
  });
  
  // Initialize variant selectors
  const variantSelectors = document.querySelectorAll('.variant-selector');
  variantSelectors.forEach(selector => {
    selector.addEventListener('change', function() {
      const form = this.closest('form');
      const selectedVariant = this.value;
      
      // Update price
      const priceElement = form.querySelector('.price');
      if (priceElement && window.productVariants) {
        const variant = window.productVariants.find(v => v.id == selectedVariant);
        if (variant) {
          priceElement.textContent = window.Shopify.formatMoney(variant.price, window.moneyFormat);
        }
      }
      
      // Update availability
      const submitButton = form.querySelector('[type="submit"]');
      if (submitButton && window.productVariants) {
        const variant = window.productVariants.find(v => v.id == selectedVariant);
        if (variant) {
          if (variant.available) {
            submitButton.disabled = false;
            submitButton.textContent = submitButton.dataset.addToCart || 'Add to cart';
          } else {
            submitButton.disabled = true;
            submitButton.textContent = submitButton.dataset.soldOut || 'Sold out';
          }
        }
      }
    });
  });
});

console.log('🛒 Shopify global functions loaded');

