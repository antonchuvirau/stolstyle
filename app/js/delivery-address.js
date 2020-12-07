'use strict';

(function() {
    class DeliveryAddress {
        _deliveryAddressData = `/wp-content/themes/stolstyle/data/evropochta.json`;
        _deliveryAddressContainer = `#pick-up-point`;

        constructor() {
            this.renderDeliveryAddress();
        }

        renderDeliveryAddress() {
            let deliveryAddressList = ``;
            const deliveryAddressData = this.getDeliveryAddressData();
            const deliveryAddressFragment = document.createDocumentFragment();
            
            deliveryAddressData.then(resp => resp.json()).then(result => {
                result.data.forEach(deliveryAddressSectionData => {
                    const deliveryAddressSection = this.createDeliveryAddressSection(deliveryAddressSectionData);
                    deliveryAddressFragment.appendChild(deliveryAddressSection);
                });
                // Добавляем данные в разметку
                document.querySelector(this._deliveryAddressContainer).appendChild(deliveryAddressFragment);
            });
        }

        createDeliveryAddressSection(deliveryAddressSectionData) {
            const deliveryAddressSectionFragment = document.createDocumentFragment();
            const deliveryAddressSectionOptgroupElement = document.createElement(`optgroup`);
            
            deliveryAddressSectionOptgroupElement.setAttribute(`label`, deliveryAddressSectionData.title);
            deliveryAddressSectionData.list.forEach(deliveryAddressSectionListElementData => {
                const deliveryAddressSectionListElement = this.createDeliveryAddressOption(deliveryAddressSectionListElementData);
                deliveryAddressSectionOptgroupElement.appendChild(deliveryAddressSectionListElement);
            });

            deliveryAddressSectionFragment.appendChild(deliveryAddressSectionOptgroupElement);
            return deliveryAddressSectionFragment;
        }

        createDeliveryAddressOption(deliveryAddressSectionListElementData) {
            const deliveryAddressSectionOptionElement = document.createElement(`option`);

            deliveryAddressSectionOptionElement.setAttribute(`value`, deliveryAddressSectionListElementData);
            deliveryAddressSectionOptionElement.textContent = deliveryAddressSectionListElementData;
            return deliveryAddressSectionOptionElement;
        }

        getDeliveryAddressData() {
            return fetch(this._deliveryAddressData);
        }
    }

    new DeliveryAddress();
})();