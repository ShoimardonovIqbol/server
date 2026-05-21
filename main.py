import os
import subprocess
import sys
import threading
import time

def run_django():
    print("\n[БЭКЕНД] Сервери Django (Daphne) рӯшан шуда истодааст...")
    # Номи папкаи бэкенди худро тафтиш кунед. Агар номаш 'backend' ё чизи дигар бошад, иваз кунед:
    django_dir = os.path.join(os.path.dirname(__file__), 'app') 
    
    # Агар папка бо номи 'app' набошад, папкаи ҷории асосиро истифода мебарад
    if not os.path.exists(django_dir):
        django_dir = os.path.dirname(__file__)
        
    os.chdir(django_dir)
    subprocess.run([sys.executable, "manage.py", "runserver", "8000"])

def run_react():
    # На камтар аз 2 сония сабр мекунем, то аввал Django рӯшан шавад
    time.sleep(2)
    print("\n[ФРОНТЕНД] Сервери React (Vite) рӯшан шуда истодааст...")
    react_dir = os.path.join(os.path.dirname(__file__), 'frontend')
    os.chdir(react_dir)
    
    # Танзими фармон барои Windows (npm.cmd) ва Linux/Mac (npm)
    npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
    subprocess.run([npm_cmd, "run", "dev"])

if __name__ == "__main__":
    print("=== ОҒОЗИ СИСТЕМАИ ЧАТИ CYBER PREMIUM ===")
    
    # Рӯшан кардани Django дар ҷараёни алоҳида (Thread)
    django_thread = threading.Thread(target=run_django)
    django_thread.daemon = True
    django_thread.start()

    # Рӯшан кардани React дар ҷараёни асосӣ
    run_react()
