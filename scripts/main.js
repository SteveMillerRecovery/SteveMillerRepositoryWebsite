// Auto copyright year
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Mobile menu toggle
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav-links');
  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
    var icon = toggle.querySelector('.material-symbols-outlined');
    icon.textContent = expanded ? 'menu' : 'close';
  });
})();

// Scroll animations with IntersectionObserver
(function () {
  var elements = document.querySelectorAll('.animate-on-scroll');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(function (el) { observer.observe(el); });
})();

// Update active nav link on scroll
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar-links a');
  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.removeAttribute('aria-current');
          if (link.getAttribute('href') === '#' + id) {
            link.setAttribute('aria-current', 'page');
          }
        });
      }
    });
  });
})();

(function () {
  var ADD_ON_PLAN_ID = 'ongoing-support-add-on';
  var DEFAULT_PLAN_ID = 'free-30-min-consultation';
  var selectedPlan = { id: '', tier: '', name: '', price: '' };
  var selectedAddOn = { id: '', tier: '', name: '', price: '', selected: false };
  var planButtons = document.querySelectorAll('.plan-select-btn');
  var contactSection = document.getElementById('contact');
  var contactForm = document.getElementById('contact-form');
  var selectedPlanValue = document.getElementById('selected-plan-value');
  var selectedPlanIdInput = document.getElementById('contact-selected-plan-id');
  var selectedPlanTierInput = document.getElementById('contact-selected-plan-tier');
  var selectedPlanNameInput = document.getElementById('contact-selected-plan-name');
  var selectedPlanPriceInput = document.getElementById('contact-selected-plan-price');
  var selectedAddOnIdInput = document.getElementById('contact-selected-addon-id');
  var selectedAddOnTierInput = document.getElementById('contact-selected-addon-tier');
  var selectedAddOnNameInput = document.getElementById('contact-selected-addon-name');
  var selectedAddOnPriceInput = document.getElementById('contact-selected-addon-price');
  var selectedAddOnSelectedInput = document.getElementById('contact-selected-addon-selected');
  var directEmailLink = document.getElementById('direct-email-link');
  var formStatus = document.getElementById('contact-form-status');
  var nameInput = document.getElementById('contact-name');
  var emailInput = document.getElementById('contact-email-input');
  var messageInput = document.getElementById('contact-message');
  var messageHiddenInput = document.getElementById('contact-message-hidden');
  var submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
  var submitTargetFrame = document.getElementById('contact-form-target');
  var isSubmitting = false;

  if (!contactForm || !directEmailLink) return;

  function safeTrim(value) {
    return (value || '').replace(/\s+/g, ' ').trim();
  }

  function getRecipientAddress() {
    var recipient = safeTrim(directEmailLink.getAttribute('data-recipient'));
    if (recipient) return recipient;
    var href = directEmailLink.getAttribute('href') || '';
    if (href.indexOf('mailto:') === 0) {
      return href.replace(/^mailto:/, '').split('?')[0];
    }
    return 'steve@stevemillerrecoveryservices.com';
  }

  function getPlanFromButton(button) {
    return {
      id: safeTrim(button.getAttribute('data-plan-id')),
      tier: safeTrim(button.getAttribute('data-plan-tier')),
      name: safeTrim(button.getAttribute('data-plan-name')),
      price: safeTrim(button.getAttribute('data-plan-price'))
    };
  }

  function isAddOnPlan(plan) {
    return plan.id === ADD_ON_PLAN_ID || safeTrim(plan.tier).toLowerCase() === 'add-on';
  }

  function getSelectedPlanDescription() {
    if (!selectedPlan.name) return 'Not selected';
    var summary = selectedPlan.tier ? selectedPlan.tier + ' - ' + selectedPlan.name : selectedPlan.name;
    if (selectedPlan.price) summary += ' (' + selectedPlan.price + ')';
    return summary;
  }

  function getSelectedAddOnDescription() {
    if (!selectedAddOn.selected || !selectedAddOn.name) return 'Not selected';
    var summary = selectedAddOn.tier ? selectedAddOn.tier + ' - ' + selectedAddOn.name : selectedAddOn.name;
    if (selectedAddOn.price) summary += ' (' + selectedAddOn.price + ')';
    return summary;
  }

  function getSelectionSummary() {
    if (!selectedPlan.name) return 'No plan selected yet';
    var summary = getSelectedPlanDescription();
    if (selectedAddOn.selected && selectedAddOn.name) {
      summary += ' + Add-On: ' + selectedAddOn.name;
      if (selectedAddOn.price) summary += ' (' + selectedAddOn.price + ')';
    }
    return summary;
  }

  function setSelectedButtonState() {
    planButtons.forEach(function (button) {
      var plan = getPlanFromButton(button);
      var planIsAddOn = isAddOnPlan(plan);
      var isSelected = false;
      if (planIsAddOn) {
        isSelected = selectedAddOn.selected && selectedAddOn.id === plan.id;
      } else {
        isSelected = selectedPlan.id !== '' && plan.id === selectedPlan.id;
      }
      button.classList.toggle('is-selected', isSelected);
      var card = button.closest('.service-card');
      if (card) card.classList.toggle('is-selected', isSelected);
      if (planIsAddOn) {
        button.textContent = isSelected ? 'Add-On Selected' : 'Add Add-On';
        button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      }
    });
  }

  function syncPlanUI() {
    if (selectedPlanValue) selectedPlanValue.textContent = getSelectionSummary();
    if (selectedPlanIdInput) selectedPlanIdInput.value = selectedPlan.id;
    if (selectedPlanTierInput) selectedPlanTierInput.value = selectedPlan.tier;
    if (selectedPlanNameInput) selectedPlanNameInput.value = selectedPlan.name;
    if (selectedPlanPriceInput) selectedPlanPriceInput.value = selectedPlan.price;
    if (selectedAddOnIdInput) selectedAddOnIdInput.value = selectedAddOn.selected ? selectedAddOn.id : '';
    if (selectedAddOnTierInput) selectedAddOnTierInput.value = selectedAddOn.selected ? selectedAddOn.tier : '';
    if (selectedAddOnNameInput) selectedAddOnNameInput.value = selectedAddOn.selected ? selectedAddOn.name : '';
    if (selectedAddOnPriceInput) selectedAddOnPriceInput.value = selectedAddOn.selected ? selectedAddOn.price : '';
    if (selectedAddOnSelectedInput) selectedAddOnSelectedInput.value = selectedAddOn.selected ? 'yes' : 'no';
    setSelectedButtonState();
  }

  function getFieldValue(input) {
    if (!input) return '';
    return input.value.trim();
  }

  function buildMailtoHref() {
    var recipientAddress = getRecipientAddress();
    var senderName = getFieldValue(nameInput);
    var senderEmail = getFieldValue(emailInput);
    var senderMessage = getFieldValue(messageInput);
    var subjectPlan = selectedPlan.name || 'Recovery Support';
    var subject = 'Question about ' + subjectPlan;
    var bodyLines = [
      'Hi Steve,',
      '',
      'I was interested in getting more info on this plan:',
      '- Plan: ' + getSelectedPlanDescription(),
      '- Add-On: ' + getSelectedAddOnDescription(),
      '',
      'My details:',
      '- Name: ' + (senderName || '[Your name]'),
      '- Email: ' + (senderEmail || '[Your email]'),
      '',
      'Message:',
      senderMessage || '[Add a message here]',
      '',
      'Thank you,',
      senderName || '[Your name]'
    ];
    return 'mailto:' + recipientAddress + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyLines.join('\n'));
  }

  function updateDirectEmailLink() {
    directEmailLink.setAttribute('href', buildMailtoHref());
  }

  function applySelectedPlan(plan) {
    selectedPlan = {
      id: safeTrim(plan.id),
      tier: safeTrim(plan.tier),
      name: safeTrim(plan.name),
      price: safeTrim(plan.price)
    };
    syncPlanUI();
    updateDirectEmailLink();
  }

  function toggleAddOn(plan) {
    var normalizedAddOn = {
      id: safeTrim(plan.id),
      tier: safeTrim(plan.tier),
      name: safeTrim(plan.name),
      price: safeTrim(plan.price)
    };
    var alreadySelected = selectedAddOn.selected && selectedAddOn.id === normalizedAddOn.id;
    if (alreadySelected) {
      selectedAddOn = { id: '', tier: '', name: '', price: '', selected: false };
    } else {
      selectedAddOn = {
        id: normalizedAddOn.id,
        tier: normalizedAddOn.tier,
        name: normalizedAddOn.name,
        price: normalizedAddOn.price,
        selected: true
      };
    }
    syncPlanUI();
    updateDirectEmailLink();
  }

  function focusContactForm() {
    if (!contactSection) return;
    var nav = document.querySelector('.navbar');
    var offset = nav ? nav.offsetHeight + 20 : 20;
    var top = contactSection.getBoundingClientRect().top + window.scrollY - offset;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
    if (nameInput) {
      window.setTimeout(function () {
        nameInput.focus();
      }, reduceMotion ? 0 : 250);
    }
  }

  function selectPlanFromButton(button) {
    var plan = getPlanFromButton(button);
    if (isAddOnPlan(plan)) {
      toggleAddOn(plan);
    } else {
      applySelectedPlan(plan);
    }
    focusContactForm();
  }

  planButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      selectPlanFromButton(button);
    });
    var card = button.closest('.service-card');
    if (!card) return;
    card.addEventListener('click', function (event) {
      if (event.target.closest('.plan-select-btn')) return;
      selectPlanFromButton(button);
    });
  });

  [nameInput, emailInput, messageInput].forEach(function (input) {
    if (!input) return;
    input.addEventListener('input', updateDirectEmailLink);
    input.addEventListener('change', updateDirectEmailLink);
  });

  var defaultPlan = null;
  planButtons.forEach(function (button) {
    var plan = getPlanFromButton(button);
    if (plan.id === DEFAULT_PLAN_ID && !isAddOnPlan(plan)) {
      defaultPlan = plan;
    }
  });
  if (defaultPlan) {
    applySelectedPlan(defaultPlan);
  } else {
    syncPlanUI();
    updateDirectEmailLink();
  }

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (isSubmitting) return;
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    var senderMessage = getFieldValue(messageInput);
    var planInfo = 'Plan: ' + getSelectedPlanDescription() + '\n' +
                   'Add-On: ' + getSelectedAddOnDescription() + '\n\n';
    
    if (messageHiddenInput) {
      messageHiddenInput.value = planInfo + 'Message:\n' + senderMessage;
    }

    isSubmitting = true;
    contactForm.classList.add('is-submitting');
    if (submitButton) submitButton.disabled = true;

    function finalizeSuccess() {
      contactForm.classList.remove('is-submitting');
      contactForm.classList.add('is-submitted');
      [nameInput, emailInput, messageInput].forEach(function (input) {
        if (input) input.disabled = true;
      });
      if (formStatus) formStatus.hidden = false;
      isSubmitting = false;
    }

    if (submitTargetFrame) {
      var onFrameLoad = function () {
        submitTargetFrame.removeEventListener('load', onFrameLoad);
        finalizeSuccess();
      };
      submitTargetFrame.addEventListener('load', onFrameLoad);
      contactForm.submit();
      return;
    }

    var formData = new FormData(contactForm);
    fetch(contactForm.action, { method: 'POST', mode: 'no-cors', body: formData })
      .then(function () {
        finalizeSuccess();
      })
      .catch(function () {
        contactForm.classList.remove('is-submitting');
        if (submitButton) submitButton.disabled = false;
        isSubmitting = false;
      });
  });
})();

// Modal functionality
(function () {
  document.querySelectorAll('[data-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var modalId = this.getAttribute('data-modal');
      var overlay = document.getElementById(modalId);
      if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Focus the close button
        var closeBtn = overlay.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
      }
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    // Close on backdrop click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal(overlay);
    });
    // Close button
    overlay.querySelectorAll('.modal-close').forEach(function (btn) {
      btn.addEventListener('click', function () { closeModal(overlay); });
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var active = document.querySelector('.modal-overlay.active');
      if (active) closeModal(active);
    }
  });

  function closeModal(overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    // Return focus to the trigger
    var modalId = overlay.id;
    var trigger = document.querySelector('[data-modal="' + modalId + '"]');
    if (trigger) trigger.focus();
  }
})();
