export const ConflictStrategy = {
  SERVER_WINS: 'server_wins',
  CLIENT_WINS: 'client_wins',
  LAST_WRITE_WINS: 'last_write_wins',
  MANUAL: 'manual',
};

export class ConflictResolver {
  static resolve(
    localData,
    serverData,
    strategy = ConflictStrategy.SERVER_WINS
  ) {
    switch (strategy) {
      case ConflictStrategy.SERVER_WINS:
        return this.serverWins(localData, serverData);

      case ConflictStrategy.CLIENT_WINS:
        return this.clientWins(localData, serverData);

      case ConflictStrategy.LAST_WRITE_WINS:
        return this.lastWriteWins(localData, serverData);

      case ConflictStrategy.MANUAL:
        return this.manual(localData, serverData);

      default:
        return this.serverWins(localData, serverData);
    }
  }

  static serverWins(localData, serverData) {
    return {
      resolved: serverData,
      strategy: ConflictStrategy.SERVER_WINS,
      discarded: localData,
    };
  }

  static clientWins(localData, serverData) {
    return {
      resolved: localData,
      strategy: ConflictStrategy.CLIENT_WINS,
      discarded: serverData,
    };
  }

  static lastWriteWins(localData, serverData) {
    const localTimestamp = localData.updatedAt || localData.timestamp || 0;
    const serverTimestamp = serverData.updatedAt || serverData.timestamp || 0;

    if (localTimestamp > serverTimestamp) {
      return this.clientWins(localData, serverData);
    } else {
      return this.serverWins(localData, serverData);
    }
  }

  static manual(localData, serverData) {
    return {
      resolved: null,
      strategy: ConflictStrategy.MANUAL,
      localData,
      serverData,
      requiresUserAction: true,
    };
  }

  static merge(localData, serverData, fields) {
    const merged = { ...serverData };

    fields.forEach((field) => {
      if (localData[field] !== undefined) {
        merged[field] = localData[field];
      }
    });

    return {
      resolved: merged,
      strategy: 'merge',
      mergedFields: fields,
    };
  }
}
