/**
 * Обработчик отправки форм - Бюро Атмосфера
 * По макету: после успешной отправки показывается экран "Ваша заявка принята. Спасибо."
 */

document.addEventListener('DOMContentLoaded', function() {

  // Маска телефона
  function applyPhoneMask(input) {
    input.addEventListener('input', function(e) {
      var value = e.target.value.replace(/\D/g, '');
      if (value.length === 0) { e.target.value = ''; return; }
      if (value[0] === '7' || value[0] === '8') {
        var formatted = '+7';
        if (value.length > 1) formatted += ' (' + value.substring(1, 4);
        if (value.length > 4) formatted += ') ' + value.substring(4, 7);
        if (value.length > 7) formatted += '-' + value.substring(7, 9);
        if (value.length > 9) formatted += '-' + value.substring(9, 11);
        e.target.value = formatted;
      } else {
        e.target.value = '+' + value;
      }
    });
  }

  var phoneInputs = document.querySelectorAll('input[name="telephonenumber"]');
  for (var i = 0; i < phoneInputs.length; i++) {
    applyPhoneMask(phoneInputs[i]);
  }

  // Валидация
  function validateForm(form) {
    var nameInput = form.querySelector('input[name="name"]');
    var phoneInput = form.querySelector('input[name="telephonenumber"]');
    var errors = [];

    if (!nameInput || !nameInput.value.trim() || nameInput.value.trim().length < 2) {
      errors.push('Введите ваше имя (минимум 2 символа)');
      if (nameInput) nameInput.style.borderColor = '#ff5252';
    } else {
      if (nameInput) nameInput.style.borderColor = '';
    }

    if (!phoneInput || !phoneInput.value.trim()) {
      errors.push('Введите номер телефона');
      if (phoneInput) phoneInput.style.borderColor = '#ff5252';
    } else {
      var cleanPhone = phoneInput.value.replace(/[\s\-\(\)\+]/g, '');
      if (cleanPhone.length < 10) {
        errors.push('Введите корректный номер телефона');
        phoneInput.style.borderColor = '#ff5252';
      } else {
        phoneInput.style.borderColor = '';
      }
    }

    return errors;
  }

  // По макету Image 4: после отправки модальная форма заменяется на экран "Ваша заявка принята"
  function showModalSuccess() {
    var modalBody = document.querySelector('#exampleModal .modal-body');
    if (modalBody) {
      modalBody.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:200px;padding:40px 20px;"><p style="color:#fff;font-size:20px;font-weight:400;text-align:center;">Ваша заявка принята</p></div>';
    }
  }

  // Отправка формы
  function handleFormSubmit(form, successMsgId, errorMsgId, isModal) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var successMsg = document.getElementById(successMsgId);
      var errorMsg = document.getElementById(errorMsgId);

      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';

      var errors = validateForm(form);
      if (errors.length > 0) {
        if (errorMsg) {
          errorMsg.textContent = errors.join('. ');
          errorMsg.style.display = 'block';
        }
        return;
      }

      var nameInput = form.querySelector('input[name="name"]');
      var phoneInput = form.querySelector('input[name="telephonenumber"]');
      var submitBtn = form.querySelector('button[type="submit"]');

      var formData = {
        name: nameInput.value.trim(),
        telephonenumber: phoneInput.value.trim()
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
      }

      fetch('submit-form.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(function(response) { return response.json(); })
      .then(function(result) {
        if (result.success) {
          if (isModal) {
            showModalSuccess();
          } else {
            if (successMsg) {
              successMsg.textContent = result.message || 'Спасибо! Мы свяжемся с вами.';
              successMsg.style.display = 'block';
            }
          }
          form.reset();
        } else {
          if (errorMsg) {
            errorMsg.textContent = result.message || 'Ошибка. Попробуйте ещё раз.';
            errorMsg.style.display = 'block';
          }
        }
      })
      .catch(function() {
        try {
          var saved = JSON.parse(localStorage.getItem('atmosphere_registrations') || '[]');
          saved.push({ name: formData.name, telephonenumber: formData.telephonenumber, date: new Date().toISOString() });
          localStorage.setItem('atmosphere_registrations', JSON.stringify(saved));
          if (isModal) {
            showModalSuccess();
          } else if (successMsg) {
            successMsg.textContent = 'Спасибо! Заявка сохранена.';
            successMsg.style.display = 'block';
          }
          form.reset();
        } catch(err) {
          if (errorMsg) {
            errorMsg.textContent = 'Ошибка. Позвоните нам.';
            errorMsg.style.display = 'block';
          }
        }
      })
      .finally(function() {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Заказать звонок';
        }
      });
    });
  }

  // Инициализация
  var footerForm = document.getElementById('footerRegForm');
  if (footerForm) handleFormSubmit(footerForm, 'footerSuccessMsg', 'footerErrorMsg', false);

  var modalForm = document.getElementById('modalRegForm');
  if (modalForm) handleFormSubmit(modalForm, 'modalSuccessMsg', 'modalErrorMsg', true);

  var contentForm = document.getElementById('contentRegForm');
  if (contentForm) handleFormSubmit(contentForm, 'contentSuccessMsg', 'contentErrorMsg', false);
});
