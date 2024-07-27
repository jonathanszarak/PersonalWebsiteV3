document.addEventListener('DOMContentLoaded', () => {
    const addItemButton = document.getElementById('add-item');
    const popupForm = document.getElementById('popup-form');
    const closePopupButton = document.getElementById('close-popup');
    const addItemBtn = document.getElementById('add-item-btn');
    const planContainer = document.getElementById('plan-container');
    
    const formTitle = document.getElementById('item-title');
    const formDescription = document.getElementById('item-description');
    const formPriority = document.getElementById('item-priority');
    
    const loadItems = () => {
        const items = JSON.parse(localStorage.getItem('planItems')) || [];
        planContainer.innerHTML = ''; // Clear current items
        items.forEach(item => {
            addItemToContainer(item);
        });
    };
    
    const saveItems = () => {
        const items = Array.from(planContainer.children).map(item => {
            return {
                title: item.querySelector('.item-title').textContent,
                description: item.querySelector('.item-description').textContent,
                priority: item.querySelector('.item-priority').textContent
            };
        });
        localStorage.setItem('planItems', JSON.stringify(items));
    };
    
    const addItemToContainer = (item) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'plan-item';
        itemDiv.innerHTML = `
            <div class="item-content">
                <div class="item-title">${item.title}</div>
                <div class="item-description">${item.description}</div>
                <div class="item-priority">Priority: ${item.priority}</div>
            </div>
            <button class="delete-btn">Delete</button>
            <button class="arrow-btn arrow-left"><i class="fas fa-arrow-up"></i></button>
            <button class="arrow-btn arrow-right"><i class="fas fa-arrow-down"></i></button>
        `;
        planContainer.appendChild(itemDiv);
        saveItems();
        
        itemDiv.querySelector('.delete-btn').addEventListener('click', () => {
            itemDiv.remove();
            saveItems();
        });
        
        itemDiv.querySelector('.arrow-left').addEventListener('click', () => {
            if (itemDiv.previousElementSibling) {
                planContainer.insertBefore(itemDiv, itemDiv.previousElementSibling);
                saveItems();
            }
        });
        
        itemDiv.querySelector('.arrow-right').addEventListener('click', () => {
            if (itemDiv.nextElementSibling) {
                planContainer.insertBefore(itemDiv, itemDiv.nextElementSibling.nextElementSibling);
                saveItems();
            }
        });
    };
    
    addItemButton.addEventListener('click', () => {
        popupForm.style.display = 'flex';
    });
    
    closePopupButton.addEventListener('click', () => {
        popupForm.style.display = 'none';
    });
    
    addItemBtn.addEventListener('click', () => {
        const title = formTitle.value;
        const description = formDescription.value;
        const priority = formPriority.value;
        if (title && description && priority) {
            addItemToContainer({ title, description, priority });
            popupForm.style.display = 'none';
            formTitle.value = '';
            formDescription.value = '';
            formPriority.value = '1';
        }
    });
    
    // Load items on page load
    loadItems();
});
